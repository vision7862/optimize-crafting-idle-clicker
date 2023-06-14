import { getUpgradedWorkshopIfBetter } from './shouldUpgrade';
import { type Workshop } from './types/Workshop';

export function optimizeProductAndBelow(
  target: number,
  product: Product,
  workshop: Workshop,
): Workshop {
  let shouldUpgradeNext = true;
  let modifiedWorkshop = workshop;
  while (shouldUpgradeNext) {
    const upgradedWorkshop: Workshop | null = getUpgradedWorkshopIfBetter(target, true, true, product, modifiedWorkshop);
    shouldUpgradeNext = upgradedWorkshop !== null;
    if (upgradedWorkshop != null) {
      modifiedWorkshop = upgradedWorkshop;
    }
  }
  return modifiedWorkshop;
}

export function optimizeEachProductToTarget(
  target: number,
  workshop: Workshop,
): Workshop {
  let modifiedWorkshop = workshop;
  const productsInOrder = Array.from(workshop.products.keys());
  for (let productIndex = 0; productIndex < productsInOrder.length; productIndex++) {
    const thisProduct: Product | undefined = workshop.products.get(productsInOrder[productIndex]);
    const nextProduct: Product | undefined = workshop.products.get(productsInOrder[productIndex + 1]);
    if (thisProduct !== undefined) {
      const currentTarget = nextProduct !== undefined ? Math.min(target, nextProduct.buildCost) : target;
      modifiedWorkshop = optimizeProductAndBelow(currentTarget, thisProduct, modifiedWorkshop);
      if (nextProduct === undefined || target < nextProduct.buildCost) {
        break;
      }
    }
  }

  return modifiedWorkshop;
}
