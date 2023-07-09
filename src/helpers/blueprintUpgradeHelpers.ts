import { BlueprintSet } from '../constants/BlueprintSets';
import { importMainWorkshop } from '../importMainWorkshop';
import { BlueprintUpgradeInfo } from '../optimizeUpgradingBlueprints';
import { Blueprint } from '../types/Blueprint';
import { ProductDetails } from '../types/Product';
import { convertBlueprintLibraryToScores, getDistanceToNextRank, getOnlyTopBlueprints } from './blueprintScoreHelpers';

export function getCostToUpgradeBlueprint(blueprint: Blueprint, levels: number): number {
  const products: ProductDetails[] = importMainWorkshop();
  const product: ProductDetails = products.filter((product: ProductDetails) => {
    return product.name === blueprint.productName;
  })[0];
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

// Assume 51 + 10 strategy
export function upgradeBlueprint(blueprint: Blueprint, levels: number): BlueprintUpgradeInfo {
  const costOfUpgrade = getCostToUpgradeBlueprint(blueprint, levels);
  const scoreChange =
    (blueprint.evolutionStage >= 2 ? 12 : 1) *
    (blueprint.evolutionStage >= 3 ? 14 : 1) *
    (blueprint.evolutionStage >= 4 ? 16 : 1) *
    levels;
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

export function mergeBlueprint(blueprintToUpgrade: Blueprint, allBlueprints: Blueprint[]): BlueprintUpgradeInfo {
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

  // assume we have a bp of the stage
  const assumedBaseBlueprintOfStage: Blueprint = {
    ...blueprintToUpgrade,
    upgradeLevel: 1,
    score:
      blueprintToUpgrade.evolutionStage === 1
        ? 10
        : blueprintToUpgrade.evolutionStage === 2
        ? 10 * 12
        : blueprintToUpgrade.evolutionStage === 3
        ? 10 * 12 * 14
        : blueprintToUpgrade.evolutionStage === 4
        ? 10 * 12 * 14 * 16
        : 0,
  };

  //  upgrade it to top of its tier
  const topUpgradeLevel = 51 + (blueprintToUpgrade.evolutionStage - 1) * 10;
  const numLevelsToUpgrade = topUpgradeLevel - assumedBaseBlueprintOfStage.upgradeLevel;
  const upgradedSecondBlueprint = upgradeBlueprint(assumedBaseBlueprintOfStage, numLevelsToUpgrade);

  //  merge if necessary which recursively goes back to this

  // make new blueprint with evolution increased, score * 2, and reset level to 1
  const mergedBlueprint: Blueprint = {
    ...blueprintToUpgrade,
    evolutionStage: blueprintToUpgrade.evolutionStage + 1,
    score: blueprintToUpgrade.score * 2,
    upgradeLevel: 1,
  };

  // remove both old blueprints and add in the new one (unneeded? dont return all? need to return all?)

  return {
    blueprint: mergedBlueprint,
    costOfUpgrade: upgradedSecondBlueprint.costOfUpgrade,
    scoreChange: blueprintToUpgrade.score,
  };
}

export function upgradeSetToNextRank(set: BlueprintSet, blueprints: Blueprint[]): SetUpgradeInfo {
  let totalScoreIncreased = 0;
  let totalCost = 0;
  const blueprintsWithUpgradedReplacements = Array.from(blueprints);
  const upgradedBlueprints: Blueprint[] = [];
  const distanceToNextRank = getDistanceToNextRank(set, convertBlueprintLibraryToScores(blueprints)).distance;
  while (totalScoreIncreased < distanceToNextRank) {
    const relevantSetBlueprints = getOnlyTopBlueprints(blueprintsWithUpgradedReplacements).filter(
      (blueprint: Blueprint) => set.blueprints.includes(blueprint.productName),
    );
    const bestUpgrade = upgradeMostImpactfulBlueprintInSet(relevantSetBlueprints);
    if (bestUpgrade !== null) {
      totalScoreIncreased += bestUpgrade.scoreChange;
      totalCost += bestUpgrade.costOfUpgrade;
      replaceBlueprintInPlace(blueprintsWithUpgradedReplacements, bestUpgrade.blueprint);
      replaceBlueprintInPlace(upgradedBlueprints, bestUpgrade.blueprint);
    }
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
    const roi = upgradeInfo.scoreChange / upgradeInfo.costOfUpgrade;
    if (roi > bestROI) {
      bestROI = roi;
      bestUpgrade = upgradeInfo;
    }
  });
  return bestUpgrade;
}
