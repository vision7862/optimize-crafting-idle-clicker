import { importProducts } from './importProducts';
import { maxLevelShouldBe, optimizeLevelsBelowProduct } from './maxLevelShouldBe';
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

function setUpWorkshop(products: Map<string, Product>): Workshop {
  const statuses = new Map<string, ProductStatus>();
  const status: ProductStatus = {
    level: 1,
    merchants: 0,
  };

  for (const productName of products.keys()) {
    statuses.set(productName, status);
  }

  return {
    products,
    statuses,
  };
}
