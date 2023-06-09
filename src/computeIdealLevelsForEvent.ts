import { importProducts, importProductsAtLevel } from './importProducts';
import { maxLevelShouldBe, optimizeAllLevelsToTarget, optimizeLevelsBelowProduct } from './maxLevelShouldBe';
import { type ProductStatus, type Workshop } from './types/Workshop';

export function computeIdealLevelsForEvent(eventName: string): number {
  const products: Map<string, Product> = importProducts(eventName.replace(/\s/g, ''));
  const workshop: Workshop = setUpWorkshop(products);
  const productsInOrder = Array.from(products.keys());
  const maxLvlProd1 = maxLevelShouldBe(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products.get(productsInOrder[1])!.buildCost,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products.get(productsInOrder[0])!,
    workshop,
  );
  return maxLvlProd1;
}

export function optimizeBuildingLastItem(eventName: string): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProducts(eventName.replace(/\s/g, ''));
  const workshop: Workshop = setUpWorkshop(products);
  const productsInOrder = Array.from(products.keys());
  const upgradedWorkshop = optimizeLevelsBelowProduct(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products.get(productsInOrder[productsInOrder.length - 1])!.buildCost,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products.get(productsInOrder[productsInOrder.length - 2])!,
    workshop,
  );
  return upgradedWorkshop.statuses;
}

export function optimizeBuildingFromTargetProduct(eventName: string, target: number, productName: string): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProducts(eventName.replace(/\s/g, ''));
  const workshop: Workshop = setUpWorkshop(products);
  // const productsInOrder = Array.from(products.keys());
  const upgradedWorkshop = optimizeLevelsBelowProduct(
    target,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    workshop.products.get(productName)!,
    workshop,
  );
  return upgradedWorkshop.statuses;
}

export function oneByOneToLastItem(eventName: string): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProducts(eventName.replace(/\s/g, ''));
  const workshop: Workshop = setUpWorkshop(products);
  const productsInOrder = Array.from(products.keys());
  const upgradedWorkshop = optimizeAllLevelsToTarget(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products.get(productsInOrder[productsInOrder.length - 1])!.buildCost,
    workshop,
  );
  return upgradedWorkshop.statuses;
}

export function oneByOneToTarget(eventName: string, target: number): Map<string, ProductStatus> {
  return oneByOneToTargetAtEventLevel(eventName, target, 10);
}

export function oneByOneToTargetAtEventLevel(eventName: string, target: number, level: number): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProductsAtLevel(eventName.replace(/\s/g, ''), level);
  const workshop: Workshop = setUpWorkshop(products);
  const upgradedWorkshop = optimizeAllLevelsToTarget(target, workshop);
  return upgradedWorkshop.statuses;
}

export function optimizeToTargetFromStatus(eventName: string, statuses: Map<string, ProductStatus>, target: number): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProductsAtLevel(eventName.replace(/\s/g, ''), 10);
  const workshop: Workshop = setUpWorkshop(products);
  workshop.statuses = statuses;
  const upgradedWorkshop = optimizeAllLevelsToTarget(target, workshop);
  return upgradedWorkshop.statuses;
}

function setUpWorkshop(products: Map<string, Product>): Workshop {
  const statuses = new Map<string, ProductStatus>();
  const status: ProductStatus = {
    level: 0,
    merchants: 0,
  };

  let isFirstItem = true;
  for (const productName of products.keys()) {
    if (isFirstItem) {
      statuses.set(productName, {
        level: 1,
        merchants: 0,
      });
      isFirstItem = false;
    } else {
      statuses.set(productName, status);
    }
  }

  return {
    products,
    statuses,
  };
}
