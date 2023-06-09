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
    const upgradedWorkshop: Workshop | null = getUpgradedWorkshopIfBetter(target, false, true, product, modifiedWorkshop);
    shouldUpgradeNext = upgradedWorkshop !== null;
    if (upgradedWorkshop != null) {
      modifiedWorkshop = upgradedWorkshop;
    }
  } while (shouldUpgradeNext);
  return modifiedWorkshop;
}

export function optimizeAllLevelsToTarget(
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
      const upgradedWorkshop: Workshop | null = optimizeLevelsBelowProduct(currentTarget, thisProduct, modifiedWorkshop);
      if (upgradedWorkshop != null) {
        modifiedWorkshop = upgradedWorkshop;
      }
      if (nextProduct === undefined || target < nextProduct.buildCost) {
        break;
      }
    }
  }

  return modifiedWorkshop;
}

export function optimizeAllLevelsToTargetPossiblyWithSkips(
  target: number,
  workshop: Workshop,
): Workshop {
  let modifiedWorkshop = workshop;
  const productsInOrder = Array.from(workshop.products.keys());

  // figure out which product is going to be the top
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let topProduct: Product = workshop.products.get(productsInOrder[productsInOrder.length - 1])!;
  for (const product of workshop.products.values()) {
    if (product.buildCost < target) {
      topProduct = product;
      break;
    }
  }

  const requiredProducts: string[] = getRequiredProductsUnderProduct(topProduct, workshop);

  for (let productIndex = 0; productIndex < productsInOrder.length; productIndex++) {
    const thisProduct: Product | undefined = workshop.products.get(productsInOrder[productIndex]);
    const nextProduct: Product | undefined = workshop.products.get(productsInOrder[productIndex + 1]);
    if (thisProduct !== undefined) {
      const currentTarget = nextProduct !== undefined ? Math.min(target, nextProduct.buildCost) : target;
      const upgradedWorkshop: Workshop | null = optimizeLevelsBelowProduct(currentTarget, thisProduct, modifiedWorkshop);
      if (upgradedWorkshop != null) {
        modifiedWorkshop = upgradedWorkshop;
      }
      if (nextProduct === undefined || target < nextProduct.buildCost) {
        break;
      }
    }
  }

  return modifiedWorkshop;
}

function getRequiredProductsUnderProduct(product: Product, workshop: Workshop): string[] {
  const requiredProducts: string[] = [];
  if (product.input1 !== null) {
    requiredProducts.push(product.input1.product.name);
    requiredProducts.push(...getRequiredProductsUnderProduct(product.input1.product, workshop));
  }
  if (product.input2 !== null) {
    requiredProducts.push(product.input2.product.name);
    requiredProducts.push(...getRequiredProductsUnderProduct(product.input2.product, workshop));
  }
  return requiredProducts;
}
