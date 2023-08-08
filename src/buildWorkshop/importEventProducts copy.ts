import memoize from 'fast-memoize';
import { TrainedToShip } from '../../products/TrainedToShip';
import { ImportedProduct } from './types/ImportedProduct';
import { InputProduct, ProductDetails } from './types/Product';

const typeUpgradeCostMultiplier = new Map<string, number>([
  ['Ore', 1.07],
  ['Ingot', 1.08],
  ['SemiProduct', 1.09],
  ['EarlyProduct', 1.1],
  ['LateProduct', 1.11],
]);

const events = new Map<string, ImportedProduct[]>([['Trained To Ship', TrainedToShip]]);

export const importEventWorkshop = memoize((eventName: string): Map<string, ProductDetails> => {
  const products = new Map<string, ProductDetails>();
  const importedProducts: ImportedProduct[] | undefined = events.get(eventName);
  if (importedProducts === undefined) {
    throw new Error(`event ${eventName} does not exist.`);
  }
  importedProducts.forEach((product: ImportedProduct) => {
    try {
      products.set(product.ProductType, {
        name: product.ProductType,
        outputCount: product.ProductAmount,
        researchCost: product.DiscoveryPrice,
        buildCost: product.ConstructionPrice,
        revenue: product.ProductPrice,
        upgradeCostMultiplier: typeUpgradeCostMultiplier.get(product.Type) ?? 1.09,
        input1: getInputProduct(product.LeftResourceType, product.LeftResourceAmount, products),
        input2: getInputProduct(product.RightResourceType, product.RightResourceAmount, products),
      });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // console.info(`Cannot import ${details[0].split('x ')[1]} because ${e.message}`);
    }
  });

  return products;
});

export function getInputProduct(
  name: string | undefined,
  count: number | undefined,
  products: Map<string, ProductDetails>,
): InputProduct | null {
  if (name === undefined || count === undefined) {
    return null;
  }

  if (products.get(name) !== undefined) {
    return { name, count };
  } else {
    throw new ReferenceError(`product ${name} does not exist`);
  }
}
