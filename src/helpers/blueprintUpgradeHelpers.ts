import { BLUEPRINT_UPGRADE_COSTS } from '../constants/BlueprintUpgradeCosts';
import { importMainWorkshop } from '../importMainWorkshop';
import { BlueprintUpgradeInfo } from '../optimizeUpgradingBlueprints';
import { Blueprint } from '../types/Blueprint';
import { ProductDetails } from '../types/Product';

export function getCostToUpgradeBlueprint(blueprint: Blueprint, levels: number): number {
  const baseCost = BLUEPRINT_UPGRADE_COSTS.get(blueprint.productName);
  if (baseCost === undefined) {
    throw new Error(`${blueprint.productName} does not have an upgrade cost`);
  }
  const products: ProductDetails[] = importMainWorkshop();
  const product: ProductDetails = products.filter((product: ProductDetails) => {
    return product.name === blueprint.productName;
  })[0];
  const actualBaseCost = Math.log10(product.buildCost) + 9;
  let upgradeCost: number = 0;
  for (let i = 0; i < levels; i++) {
    upgradeCost += Math.round(actualBaseCost * 1.08 ** (blueprint.upgradeLevel + i));
  }
  return upgradeCost;
}

// Assume 50 + 10 strategy
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
