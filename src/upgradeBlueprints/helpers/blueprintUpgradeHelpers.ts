import { importMainWorkshop } from '../../buildWorkshop/importMainWorkshop';
import { ProductDetails } from '../../buildWorkshop/types/Product';
import {
  BPS_TO_NOT_MERGE,
  BUILD_COST_OF_BPS_WITHOUT_DETAILS,
  NON_51_PLUS_10_STRATEGY,
} from '../config/BlueprintLibrary';
import { BlueprintSet } from '../constants/BlueprintSets';
import { BlueprintUpgradeInfo } from '../optimizeUpgradingBlueprints';
import { Blueprint } from '../types/Blueprint';
import { BASE_BP, getBottomOfStageBP, getScoreAtTopOfStage } from './blueprintObjectHelpers';
import {
  convertBlueprintLibraryToScores,
  getDistanceToNextRank,
  getOnlyTopBlueprints,
  getSetBlueprintScore,
} from './blueprintScoreHelpers';

export function getCostToUpgradeBlueprint(blueprint: Blueprint, levels: number): number {
  const products: Map<string, ProductDetails> = importMainWorkshop(false);
  const product: ProductDetails | undefined = products.get(blueprint.productName);
  const filledInBuildCost = BUILD_COST_OF_BPS_WITHOUT_DETAILS.get(blueprint.productName);
  if (product === undefined && filledInBuildCost === undefined) {
    console.error(`Did not find ${blueprint.productName} in products`);
    return Number.MAX_VALUE;
  }

  const actualBaseCost =
    product != null
      ? Math.log10(product.buildCost) + 9
      : filledInBuildCost !== undefined
      ? filledInBuildCost / 1.08
      : Number.MAX_VALUE;
  let upgradeCost: number = 0;
  for (let i = 0; i < levels; i++) {
    upgradeCost += Math.round(actualBaseCost * 1.08 ** (blueprint.upgradeLevel + i));
  }
  return upgradeCost;
}

export function upgradeBlueprint(blueprint: Blueprint, levels: number): BlueprintUpgradeInfo | null {
  const topUpgradeLevel =
    (NON_51_PLUS_10_STRATEGY.get(blueprint.productName) ?? 51) + (blueprint.evolutionStage - 1) * 10;
  if (blueprint.upgradeLevel >= topUpgradeLevel) {
    return !BPS_TO_NOT_MERGE.includes(blueprint.productName) ? mergeBlueprint(blueprint) : null;
  }

  const costOfUpgrade = getCostToUpgradeBlueprint(blueprint, levels);
  const scoreChange = blueprint.scoreChangePerLevel * levels;
  const newBlueprint: Blueprint = {
    ...blueprint,
    upgradeLevel: blueprint.upgradeLevel + levels,
    score: blueprint.score + scoreChange,
  };
  return { blueprint: newBlueprint, costOfUpgrade, scoreChange };
}

export type SetUpgradeInfo = Readonly<{
  upgradedBlueprints: Blueprint[];
  cost: number;
  allBlueprintsWithUpgradedReplacements: Blueprint[];
}>;

// Assume 51 + 10 strategy and that there are sufficient base BPs to merge all the way up
export function mergeBlueprint(blueprintToMerge: Blueprint): BlueprintUpgradeInfo {
  // assume that the blueprint passed in is at top level
  // remove this blueprint from all blueprints
  // const blueprintsWithoutTarget = Array.from(allBlueprints);
  // const targetBlueprintIndex = blueprintsWithoutTarget.findIndex(
  //   (blueprint) =>
  //     blueprint.productName === blueprintToUpgrade.productName &&
  //     blueprint.evolutionStage === blueprintToUpgrade.evolutionStage &&
  //     blueprint.upgradeLevel === blueprintToUpgrade.upgradeLevel,
  // );
  // blueprintsWithoutTarget.splice(targetBlueprintIndex, 1);
  // get cost to get a blueprint up to match this one
  //  find next-closest bp
  // const blueprintsMatchingStage = blueprintsWithoutTarget.filter((blueprint: Blueprint) => {
  //   return (
  //     blueprint.productName === blueprintToUpgrade.productName &&
  //     blueprint.evolutionStage === blueprintToUpgrade.evolutionStage
  //   );
  // });

  // if (blueprintsMatchingStage.length > 0) {
  //   blueprintsMatchingStage.sort((a, b) => a.upgradeLevel - b.upgradeLevel);
  //   const blueprintToUpgradeToMatch = blueprintsMatchingStage[0];
  // const topUpgradeLevel = 51 + (blueprintToUpgrade.evolutionStage - 1) * 10;
  // const numLevelsToUpgrade = topUpgradeLevel - blueprintToUpgradeToMatch.upgradeLevel;
  //   const BlueprintUpgradeInfo = upgradeBlueprint(blueprintToUpgradeToMatch, numLevelsToUpgrade);
  // }

  // get cost of getting a matching bp, assuming only the top one has any levels in it
  let costOfUpgrade = 0;
  const strategyForThisBP = NON_51_PLUS_10_STRATEGY.get(blueprintToMerge.productName) ?? 51;
  const topUpgradeLevel = strategyForThisBP + (blueprintToMerge.evolutionStage - 1) * 10;
  if (blueprintToMerge.upgradeLevel < topUpgradeLevel) {
    const upgradeBpToMerge = upgradeBlueprint(blueprintToMerge, topUpgradeLevel - blueprintToMerge.upgradeLevel);
    costOfUpgrade += upgradeBpToMerge?.costOfUpgrade ?? 0;
  }
  const baseNumLevelsToUpgrade = strategyForThisBP - 1;
  if (blueprintToMerge.evolutionStage === 1) {
    const topStage1 = upgradeBlueprint(
      { ...BASE_BP, productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade,
    );
    // we have one at the top of 1, need to get one to the top of 1 from the bottom of 1
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage1!.costOfUpgrade;
  }
  if (blueprintToMerge.evolutionStage === 2) {
    // we have one at the top of 2, need to get 2 to the top of 1 from the bottom of 1
    const topStage1 = upgradeBlueprint(
      { ...BASE_BP, productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage1!.costOfUpgrade * 2;
    // then merge, then level to top of 2
    const topStage2 = upgradeBlueprint(
      { ...getBottomOfStageBP(2, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 10,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage2!.costOfUpgrade;
  }
  if (blueprintToMerge.evolutionStage === 3) {
    // we have one at the top of 3. need to get 4 from bottom 1 to top 1
    const topStage1 = upgradeBlueprint(
      { ...BASE_BP, productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage1!.costOfUpgrade * 4;
    // need to get 2 to the top of 2 from the bottom of 2
    const topStage2 = upgradeBlueprint(
      { ...getBottomOfStageBP(2, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 10,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage2!.costOfUpgrade * 2;
    // merge and level to top of 3
    const topStage3 = upgradeBlueprint(
      { ...getBottomOfStageBP(3, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 20,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage3!.costOfUpgrade;
  }
  if (blueprintToMerge.evolutionStage === 4) {
    // we have one at the top of 4. need to get 8 from bottom 1 to top 1
    const topStage1 = upgradeBlueprint(
      { ...BASE_BP, productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage1!.costOfUpgrade * 8;
    // need to get 4 to the top of 2 from the bottom of 2
    const topStage2 = upgradeBlueprint(
      { ...getBottomOfStageBP(2, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 10,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage2!.costOfUpgrade * 4;
    // need to get 2 to the top of 3 from the bottom of 3
    const topStage3 = upgradeBlueprint(
      { ...getBottomOfStageBP(3, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 20,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage3!.costOfUpgrade * 2;
    // merge and level to top of 4
    const topStage4 = upgradeBlueprint(
      { ...getBottomOfStageBP(4, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 30,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage4!.costOfUpgrade;
  }
  if (blueprintToMerge.evolutionStage === 5) {
    // we have one at the top of 5. need to get 16 from bottom 1 to top 1
    const topStage1 = upgradeBlueprint(
      { ...BASE_BP, productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage1!.costOfUpgrade * 16;
    // need to get 8 to the top of 2 from the bottom of 2
    const topStage2 = upgradeBlueprint(
      { ...getBottomOfStageBP(2, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 10,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage2!.costOfUpgrade * 8;
    // need to get 4 to the top of 3 from the bottom of 3
    const topStage3 = upgradeBlueprint(
      { ...getBottomOfStageBP(3, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 20,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage3!.costOfUpgrade * 4;
    // need to get 2 to the top of 4 from the bottom of 4
    const topStage4 = upgradeBlueprint(
      { ...getBottomOfStageBP(4, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 30,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage4!.costOfUpgrade * 2;
    // merge and level to top of 4
    const topStage5 = upgradeBlueprint(
      { ...getBottomOfStageBP(5, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 40,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    costOfUpgrade += topStage5!.costOfUpgrade;
  }
  // if (blueprintToUpgrade.evolutionStage > 3) {
  //   // we have one at the top of 3. need to get 4 from bottom 1 to top 1
  //   const topStage1 = upgradeBlueprint({ ...BOTTOM_STAGE_1, productName: blueprintToUpgrade.productName }, 50);
  //   costOfUpgrade += topStage1.costOfUpgrade * 2 ** (blueprintToUpgrade.evolutionStage - 1);
  //   // need to get 2 to the top of 2 from the bottom of 2
  //   const topStage2 = upgradeBlueprint({ ...BOTTOM_STAGE_2, productName: blueprintToUpgrade.productName }, 60);
  //   costOfUpgrade += topStage2.costOfUpgrade * 2 ** (blueprintToUpgrade.evolutionStage - 2);
  //   // merge and level to top of 3
  //   const topStage3 = upgradeBlueprint(topStage2.blueprint, 70);
  //   costOfUpgrade += topStage3.costOfUpgrade;
  // }

  // assume we have a bp of the stage
  // const assumedBaseBlueprintOfStage: Blueprint = {
  //   ...blueprintToUpgrade,
  //   upgradeLevel: 1,
  //   score:
  //     blueprintToUpgrade.evolutionStage === 1
  //       ? 10
  //       : blueprintToUpgrade.evolutionStage === 2
  //       ? 10 * 12
  //       : blueprintToUpgrade.evolutionStage === 3
  //       ? 10 * 12 * 14
  //       : blueprintToUpgrade.evolutionStage === 4
  //       ? 10 * 12 * 14 * 16
  //       : 0,
  // };

  // if the next highest bp is of one stage down. ex toUpgrade is top_stage_2, all others are bottom_stage_1
  // get 2 bottom_stage_1 to top_stage_1
  // then merge to make a bottom_stage_2
  // then upgrade That to top_stage_2
  // then merge those to bottom_stage_3

  //  upgrade it to top of its tier
  // const topUpgradeLevel = 51 + (blueprintToUpgrade.evolutionStage - 1) * 10;
  // const numLevelsToUpgrade = topUpgradeLevel - assumedBaseBlueprintOfStage.upgradeLevel;
  // const upgradedSecondBlueprint = upgradeBlueprint(assumedBaseBlueprintOfStage, numLevelsToUpgrade);

  //  merge if necessary which recursively goes back to this

  // make new blueprint with evolution increased, score * 2, and reset level to 1
  const topOfOrigStage = getScoreAtTopOfStage(blueprintToMerge.evolutionStage, strategyForThisBP);
  const newScore = topOfOrigStage + blueprintToMerge.score;
  const mergedBlueprint: Blueprint = {
    ...blueprintToMerge,
    evolutionStage: blueprintToMerge.evolutionStage + 1,
    score: newScore,
    scoreChangePerLevel: newScore / 10,
    upgradeLevel: 1,
  };

  // remove both old blueprints and add in the new one (unneeded? dont return all? need to return all?)

  return {
    blueprint: mergedBlueprint,
    costOfUpgrade,
    scoreChange: blueprintToMerge.score,
  };
}

export function upgradeSetToNextRank(set: BlueprintSet, blueprints: Blueprint[]): SetUpgradeInfo | null {
  let totalScoreIncreased = 0;
  let totalCost = 0;
  const blueprintsWithUpgradedReplacements = Array.from(blueprints);
  const upgradedBlueprints: Blueprint[] = [];
  const blueprintScores = convertBlueprintLibraryToScores(blueprints);
  const startingSetScore = getSetBlueprintScore(set.blueprints, blueprintScores);
  const distanceToNextRank = getDistanceToNextRank(set, startingSetScore).distance;
  if (distanceToNextRank === Number.MAX_VALUE) {
    return null;
  }
  while (totalScoreIncreased < distanceToNextRank) {
    const relevantSetBlueprints = getOnlyTopBlueprints(blueprintsWithUpgradedReplacements).filter(
      (blueprint: Blueprint) => set.blueprints.includes(blueprint.productName),
    );
    if (relevantSetBlueprints.length === 0) {
      return null;
    }
    const bestUpgrade = upgradeMostImpactfulBlueprintInSet(relevantSetBlueprints);
    if (bestUpgrade === null) {
      return null;
    }
    totalCost += bestUpgrade.costOfUpgrade;
    replaceBlueprintInPlace(blueprintsWithUpgradedReplacements, bestUpgrade.blueprint);
    replaceBlueprintInPlace(upgradedBlueprints, bestUpgrade.blueprint);
    const newSetScore = getSetBlueprintScore(
      set.blueprints,
      convertBlueprintLibraryToScores(blueprintsWithUpgradedReplacements),
    );
    totalScoreIncreased = newSetScore - startingSetScore;
  }

  return {
    allBlueprintsWithUpgradedReplacements: blueprintsWithUpgradedReplacements,
    cost: totalCost,
    upgradedBlueprints,
  };
}

function replaceBlueprintInPlace(blueprints: Blueprint[], newBlueprint: Blueprint): void {
  const existingBlueprintUpgradedIndex = blueprints.findIndex(
    (existingBlueprint) => existingBlueprint.productName === newBlueprint.productName,
  );
  blueprints.splice(existingBlueprintUpgradedIndex, existingBlueprintUpgradedIndex >= 0 ? 1 : 0, newBlueprint);
}

function upgradeMostImpactfulBlueprintInSet(relevantSetBlueprints: Blueprint[]): BlueprintUpgradeInfo | null {
  let bestROI = 0;
  let bestUpgrade: BlueprintUpgradeInfo | null = null;
  relevantSetBlueprints.forEach((blueprint: Blueprint) => {
    const upgradeInfo = upgradeBlueprint(blueprint, 10);
    if (upgradeInfo !== null) {
      const roi = upgradeInfo.scoreChange / upgradeInfo.costOfUpgrade;
      if (roi > bestROI) {
        bestROI = roi;
        bestUpgrade = upgradeInfo;
      }
    }
  });
  return bestUpgrade;
}
