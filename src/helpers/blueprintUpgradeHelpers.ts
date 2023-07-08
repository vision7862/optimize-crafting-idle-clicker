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
