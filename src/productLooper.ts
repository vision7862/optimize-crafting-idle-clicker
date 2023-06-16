import { getUpgradedWorkshopAndTimeIfBetter, type WorkshopUpgradeInfo } from './shouldUpgrade';
import { type Workshop } from './types/Workshop';

export function optimizeProductAndBelow(
  target: number,
  product: ProductDetails,
  workshop: Workshop,
): Workshop {
  return optimizeProductAndBelowWithTime(target, product, workshop).workshop;
}

export function optimizeProductAndBelowWithTime(target: number, product: ProductDetails, workshop: Workshop): WorkshopUpgradeInfo {
  let shouldUpgradeNext = true;
  let modifiedWorkshopInfo: WorkshopUpgradeInfo = {
    workshop,
    cyclesToTarget: 0,
  };
  while (shouldUpgradeNext) {
    const upgradedWorkshopInfo: WorkshopUpgradeInfo | null = getUpgradedWorkshopAndTimeIfBetter(target, false, true, product, modifiedWorkshopInfo.workshop);
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
  const productsInOrder = Array.from(workshop.products.keys());
  for (let productIndex = 0; productIndex < productsInOrder.length; productIndex++) {
    const thisProduct: ProductDetails | undefined = workshop.products.get(productsInOrder[productIndex]);
    const nextProduct: ProductDetails | undefined = workshop.products.get(productsInOrder[productIndex + 1]);
    if (thisProduct !== undefined) {
      const currentTarget = nextProduct !== undefined ? Math.min(target, nextProduct.buildCost) : target;
      const modifiedWorkshopInfo = optimizeProductAndBelowWithTime(currentTarget, thisProduct, modifiedWorkshop);
      modifiedWorkshop = modifiedWorkshopInfo.workshop;
      cyclesToTarget += modifiedWorkshopInfo.cyclesToTarget;
      if (nextProduct === undefined || target < nextProduct.buildCost) {
        break;
      }
    }
  }

  return {
    workshop: modifiedWorkshop,
    cyclesToTarget,
  };
}
