import { getUpgradedWorkshopAndTimeIfBetter, type WorkshopUpgradeInfo } from './shouldUpgrade';
import { type Product, type Workshop } from './types/Workshop';

export function optimizeProductAndBelow(
  target: number,
  productName: string,
  workshop: Workshop,
): Workshop {
  return optimizeProductAndBelowWithTime(target, productName, workshop).workshop;
}

export function optimizeProductAndBelowWithTime(target: number, productName: string, workshop: Workshop): WorkshopUpgradeInfo {
  let shouldUpgradeNext = true;
  let modifiedWorkshopInfo: WorkshopUpgradeInfo = {
    workshop,
    cyclesToTarget: 0,
  };
  while (shouldUpgradeNext) {
    const upgradedWorkshopInfo: WorkshopUpgradeInfo | null = getUpgradedWorkshopAndTimeIfBetter(target, false, true, productName, modifiedWorkshopInfo.workshop);
    shouldUpgradeNext = upgradedWorkshopInfo !== null;
    if (upgradedWorkshopInfo != null) {
      modifiedWorkshopInfo = upgradedWorkshopInfo;
    }
  }
  return modifiedWorkshopInfo;
}

export function optimizeEachProductToTarget(
  target: number,
  workshop: Workshop,
): Workshop {
  return optimizeEachProductToTargetWithTime(target, workshop).workshop;
}
export function optimizeEachProductToTargetWithTime(target: number, workshop: Workshop): WorkshopUpgradeInfo {
  let modifiedWorkshop: Workshop = workshop;
  let cyclesToTarget = 0;
  for (let productIndex = 0; productIndex < workshop.productsInfo.length; productIndex++) {
    const thisProduct: Product | undefined = workshop.productsInfo[productIndex];
    const nextProduct: Product | undefined = workshop.productsInfo[productIndex + 1];
    if (thisProduct !== undefined) {
      const currentTarget = nextProduct !== undefined ? Math.min(target, nextProduct.details.buildCost) : target;
      const modifiedWorkshopInfo = optimizeProductAndBelowWithTime(currentTarget, thisProduct.details.name, modifiedWorkshop);
      modifiedWorkshop = modifiedWorkshopInfo.workshop;
      cyclesToTarget += modifiedWorkshopInfo.cyclesToTarget;
      if (nextProduct === undefined || target < nextProduct.details.buildCost) {
        break;
      }
    }
  }

  return {
    workshop: modifiedWorkshop,
    cyclesToTarget,
  };
}
