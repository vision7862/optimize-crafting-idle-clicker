import { importProducts, importProductsAtLevel } from './importProducts';
import { optimizeAllLevelsToTarget, optimizeLevelsBelowProduct } from './maxLevelShouldBe';
import { type ProductStatus, type Workshop } from './types/Workshop';

export function optimizeBuildingLastItem(eventName: string): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProducts(eventName);
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
  const products: Map<string, Product> = importProducts(eventName);
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
  const products: Map<string, Product> = importProducts(eventName);
  const workshop: Workshop = setUpWorkshop(products);
  const productsInOrder = Array.from(products.keys());
  const upgradedWorkshop = optimizeAllLevelsToTarget(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products.get(productsInOrder[productsInOrder.length - 1])!.buildCost,
    workshop,
  );
  return upgradedWorkshop.statuses;
}

export function oneByOneToTargetAtEventLevel(eventName: string, target: number, level: number): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProductsAtLevel(eventName, level);
  const workshop: Workshop = setUpWorkshop(products);
  const upgradedWorkshop = optimizeAllLevelsToTarget(target, workshop);
  return upgradedWorkshop.statuses;
}

export function oneByOneToTarget(eventName: string, target: number): Map<string, ProductStatus> {
  return oneByOneToTargetAtEventLevel(eventName, target, 10);
}

export function optimizeToTargetFromStatus(eventName: string, statuses: Map<string, ProductStatus>, target: number): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProductsAtLevel(eventName, 10);
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

export function computeTargetFromFame(fame: number, level: number): number {
  return 10 ** (fame + level - 1);
}
