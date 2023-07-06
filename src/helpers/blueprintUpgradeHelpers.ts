import { BLUEPRINT_UPGRADE_COSTS } from '../constants/BlueprintUpgradeCosts';

export function getCostToUpgradeBlueprint(productName: string): number {
  const cost = BLUEPRINT_UPGRADE_COSTS.get(productName);
  if (cost === undefined) {
    throw new Error(`${productName} does not have an upgrade cost`);
  }
  return cost;
}
