import { getProductLevel } from './WorkshopHelpers';
import { getUpgradedWorkshopIfBetter } from './shouldUpgrade';
import { type Workshop } from './types/Workshop';

export function maxLevelShouldBe(
  target: number,
  product: Product,
  workshop: Workshop,
): number {
  let currLevel = getProductLevel(product, workshop);
  let shouldUpgradeNext = true;
  let modifiedWorkshop = workshop;
  do {
    currLevel++;
    if (currLevel > 100) {
      break;
    }
    const upgradedWorkshop: Workshop | null = getUpgradedWorkshopIfBetter(target, true, true, product, modifiedWorkshop);
    shouldUpgradeNext = upgradedWorkshop !== null;
    if (upgradedWorkshop != null) {
      modifiedWorkshop = upgradedWorkshop;
    }
  } while (shouldUpgradeNext);
  return currLevel - 1;
}

export function optimizeLevelsBelowProduct(
  target: number,
  product: Product,
  workshop: Workshop,
): Workshop {
  let currLevel = getProductLevel(product, workshop);
  let shouldUpgradeNext = true;
  let modifiedWorkshop = workshop;
  do {
    currLevel++;
    if (currLevel > 100) {
      break;
    }
    const upgradedWorkshop: Workshop | null = getUpgradedWorkshopIfBetter(target, true, true, product, modifiedWorkshop);
    shouldUpgradeNext = upgradedWorkshop !== null;
    if (upgradedWorkshop != null) {
      modifiedWorkshop = upgradedWorkshop;
    }
  } while (shouldUpgradeNext);
  return modifiedWorkshop;
}
