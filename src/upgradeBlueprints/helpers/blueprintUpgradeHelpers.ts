import { importWorkshop } from '../../buildWorkshop/importWorkshop';
import { ProductDetails } from '../../buildWorkshop/types/Product';
import { BPS_TO_NOT_MERGE, STRATEGIES } from '../config/Strategies';
import { BLUEPRINT_SETS, BlueprintSet } from '../constants/BlueprintSets';
import { BlueprintUpgradeInfo } from '../optimizeUpgradingBlueprints';
import { Blueprint, ProductName } from '../types/Blueprint';
import { MergingStrategy, SetMergingStrategy } from '../types/MergingStrategy';
import { getBottomOfStageBP, getScoreAtTopOfStage } from './blueprintObjectHelpers';
import {
  convertBlueprintLibraryToScores,
  getDistanceToNextRank,
  getOnlyTopBlueprints,
  getSetBlueprintScore,
} from './blueprintScoreHelpers';

export function getCostToUpgradeBlueprint(blueprint: Blueprint, levels: number): number {
  const products: Map<string, ProductDetails> = importWorkshop(false);
  const product: ProductDetails | undefined = products.get(blueprint.productName);
  if (product === undefined) {
    console.error(`Did not find ${blueprint.productName} in products`);
    return Number.MAX_VALUE;
  }

  const actualBaseCost = Math.log10(product.buildCost) + 9;
  let upgradeCost: number = 0;
  for (let i = 0; i < levels; i++) {
    upgradeCost += Math.round(actualBaseCost * 1.08 ** (blueprint.upgradeLevel + i));
  }
  return upgradeCost;
}

export function upgradeBlueprint(blueprint: Blueprint, levels: number): BlueprintUpgradeInfo | null {
  const topUpgradeLevel = getBpStrategy(blueprint.productName).xPlusTen + (blueprint.evolutionStage - 1) * 10;
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

// Assume that there are sufficient base BPs to merge all the way up
export function mergeBlueprint(blueprintToMerge: Blueprint): BlueprintUpgradeInfo | null {
  if (BPS_TO_NOT_MERGE.includes(blueprintToMerge.productName)) {
    return null;
  }
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

  let costOfUpgrade = 0;
  const strategyForThisBP = getBpStrategy(blueprintToMerge.productName).xPlusTen;
  const baseNumLevelsToUpgrade = strategyForThisBP - 1;
  // get cost of getting a matching bp, assuming only the top one has any levels in it
  for (let stage = 1; stage <= blueprintToMerge.evolutionStage; stage++) {
    costOfUpgrade += getCostToGetExponentialNumOfBPAtStage(
      stage,
      strategyForThisBP,
      blueprintToMerge,
      baseNumLevelsToUpgrade,
    );
  }

  // make new blueprint with evolution increased, score * 2, and reset level to 1
  let blueprintReadyToMerge = blueprintToMerge;
  const topUpgradeLevel = strategyForThisBP + (blueprintToMerge.evolutionStage - 1) * 10;
  if (blueprintToMerge.upgradeLevel < topUpgradeLevel) {
    const upgradeBlueprintToMergeToTopOfStage = upgradeBlueprint(
      blueprintToMerge,
      topUpgradeLevel - blueprintToMerge.upgradeLevel,
    );
    if (upgradeBlueprintToMergeToTopOfStage === null) {
      throw new Error(`something has gone wrong merging ${blueprintToMerge.productName}`);
    }
    costOfUpgrade += upgradeBlueprintToMergeToTopOfStage?.costOfUpgrade ?? 0;
    blueprintReadyToMerge = upgradeBlueprintToMergeToTopOfStage.blueprint;
  }
  const topOfOrigStage = getScoreAtTopOfStage(blueprintToMerge.evolutionStage, strategyForThisBP);
  const newScore = topOfOrigStage + blueprintReadyToMerge.score;
  const mergedBlueprint: Blueprint = {
    ...blueprintToMerge,
    evolutionStage: blueprintToMerge.evolutionStage + 1,
    score: newScore,
    scoreChangePerLevel: newScore / 10,
    upgradeLevel: 1,
  };

  return {
    blueprint: mergedBlueprint,
    costOfUpgrade,
    scoreChange: topOfOrigStage,
  };
}

export function getBpStrategy(
  productName: ProductName,
  blueprintSets: BlueprintSet[] = BLUEPRINT_SETS,
  strategies: SetMergingStrategy[] = STRATEGIES,
): MergingStrategy {
  let highestStrategy: MergingStrategy = {
    topStage: 1,
    xPlusTen: 51,
  };
  const setThisBpIsIn: string[] = blueprintSets
    .filter((set: BlueprintSet) => set.blueprints.includes(productName))
    .map((set) => set.setName);
  strategies
    .filter((strategy) => setThisBpIsIn.includes(strategy.setName))
    .forEach((strategy) => {
      if (strategy.mainBps.includes(productName) && strategy.mainStrategy.topStage > highestStrategy.topStage) {
        highestStrategy = strategy.mainStrategy;
      } else if (strategy.otherBpsStrategy.topStage > highestStrategy.topStage) {
        highestStrategy = strategy.otherBpsStrategy;
      }
    });
  return highestStrategy;
}

function getCostToGetExponentialNumOfBPAtStage(
  stage: number,
  strategyForThisBP: number,
  blueprintToMerge: Blueprint,
  baseNumLevelsToUpgrade: number,
): number {
  return (
    getCostToUpgradeBlueprint(
      { ...getBottomOfStageBP(stage, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 10 * (stage - 1),
    ) *
    2 ** (blueprintToMerge.evolutionStage - stage)
  );
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
    upgradedBlueprints: upgradedBlueprints.sort((a, b) => a.score - b.score),
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
