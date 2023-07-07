import { BLUEPRINT_UPGRADE_COSTS } from '../constants/BlueprintUpgradeCosts';
import { importMainWorkshop } from '../importMainWorkshop';
import { BlueprintUpgradeInfo } from '../optimizeUpgradingBlueprints';
import { Blueprint } from '../types/Blueprint';
import { ProductDetails } from '../types/Product';

export function getCostToUpgradeBlueprint(blueprint: Blueprint): number {
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
  for (let i = 0; i < 10; i++) {
    upgradeCost += Math.round(actualBaseCost * 1.08 ** (blueprint.upgradeLevel + i));
  }
  return upgradeCost;
}

// function confettiCode(key) {
//   [WhenEnterKey]{confetti}
//   when (key === EnterKey) {
//     return confetti;
//   }
// }

export function upgradeBlueprint(blueprint: Blueprint): BlueprintUpgradeInfo {
  const costOfUpgrade = getCostToUpgradeBlueprint(blueprint);
  const newBlueprint: Blueprint = {
    ...blueprint,
    upgradeLevel: blueprint.upgradeLevel + 10,
    score: blueprint.score + 10,
  };
  return { blueprint: newBlueprint, costOfUpgrade };
}
