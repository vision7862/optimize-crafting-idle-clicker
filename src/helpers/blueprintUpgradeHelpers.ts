import { BlueprintSet } from '../constants/BlueprintSets';
import { importMainWorkshop } from '../importMainWorkshop';
import { BlueprintUpgradeInfo } from '../optimizeUpgradingBlueprints';
import { Blueprint } from '../types/Blueprint';
import { ProductDetails } from '../types/Product';
import { convertBlueprintLibraryToScores, getDistanceToNextRank } from './blueprintScoreHelpers';

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
  const newBlueprint: Blueprint = {
    ...blueprint,
    upgradeLevel: blueprint.upgradeLevel + levels,
    score:
      blueprint.score +
      (blueprint.evolutionStage >= 2 ? 12 : 1) *
        (blueprint.evolutionStage >= 3 ? 14 : 1) *
        (blueprint.evolutionStage >= 4 ? 16 : 1) *
        levels,
  };
  return { blueprint: newBlueprint, costOfUpgrade };
}

export function getMinimumCostToUpgradeSetToNextRank(set: BlueprintSet, blueprints: Blueprint[]): number {
  const blueprintBangForBuck = new Map<string, number>();
  blueprints
    .filter((blueprint: Blueprint) => set.blueprints.includes(blueprint.productName))
    .forEach((blueprint: Blueprint) => {
      const blueprintUpgradeInfo = upgradeBlueprint(blueprint, 10);
      const upgradedBlueprint: Blueprint = blueprintUpgradeInfo.blueprint;
      const scoreChange = upgradedBlueprint.score - blueprint.score;
      const bangForBuck = scoreChange / blueprintUpgradeInfo.costOfUpgrade;
      blueprintBangForBuck.set(blueprint.productName, bangForBuck);
    });

  const sorted = new Map([...blueprintBangForBuck.entries()].sort((a, b) => b[1] - a[1]));
  const distanceToNextRank = getDistanceToNextRank(set, convertBlueprintLibraryToScores(blueprints));
  const totalCost = 0;
  return 0;
}
