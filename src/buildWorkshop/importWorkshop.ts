import memoize from 'fast-memoize';
import { MainWorkshopProducts } from '../../products/MainWorkshop';
import { TrainedToShip } from '../../products/TrainedToShip';
import { BLUEPRINT_LIBRARY } from '../upgradeBlueprints/config/BlueprintLibrary';
import { convertBlueprintLibraryToScores } from '../upgradeBlueprints/helpers/blueprintScoreHelpers';
import { getOreOutputMultiplier } from './helpers/otherMultiplierHelpers';
import { ImportedProduct } from './types/ImportedProduct';
import { InputProduct, ProductDetails } from './types/Product';

const typeUpgradeCostMultiplier = new Map<string, number>([
  ['Ore', 1.07],
  ['Ingot', 1.08],
  ['SemiProduct', 1.09],
  ['EarlyProduct', 1.1],
  ['LateProduct', 1.11],
]);

const events = new Map<string, ImportedProduct[]>([['trained to ship', TrainedToShip]]);

export const importWorkshop = memoize(
  (onlyReturnBuildable: boolean, eventName?: string): Map<string, ProductDetails> => {
    const blueprintMap = convertBlueprintLibraryToScores(BLUEPRINT_LIBRARY);
    const oreMultiplier = getOreOutputMultiplier(false);

    const products = new Map<string, ProductDetails>();
    const isEvent = eventName !== undefined;
    const importedProducts: ImportedProduct[] | undefined = isEvent
      ? events.get(eventName?.toLowerCase() ?? '')
      : MainWorkshopProducts;
    if (importedProducts === undefined) {
      throw new Error(`event ${eventName ?? ''} does not exist.`);
    }
    importedProducts.forEach((product: ImportedProduct) => {
      const blueprintScore = blueprintMap.get(product.ProductType);
      const canBuildProductToGetBlueprint = product.Optional !== true;
      const haveBlueprint = blueprintScore !== undefined;
      if (canBuildProductToGetBlueprint || haveBlueprint || !onlyReturnBuildable || isEvent) {
        try {
          products.set(product.ProductType, {
            name: product.ProductType,
            outputCount:
              product.ProductAmount * (product.Tags?.includes('Ore') === true && !isEvent ? oreMultiplier : 1),
            researchCost: product.DiscoveryPrice,
            buildCost: product.ConstructionPrice,
            revenue: product.ProductPrice * (isEvent ? 1 : (blueprintScore ?? 10) / 10),
            upgradeCostMultiplier: typeUpgradeCostMultiplier.get(product.Type) ?? 1.09,
            input1: getInputProduct(
              product.LeftResourceType,
              product.LeftResourceAmount,
              products,
              onlyReturnBuildable,
            ),
            input2: getInputProduct(
              product.RightResourceType,
              product.RightResourceAmount,
              products,
              onlyReturnBuildable,
            ),
          });
        } catch (e) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          // console.info(`Cannot import ${details[0].split('x ')[1]} because ${e.message}`);
        }
      }
    });

    return products;
  },
);

export function getInputProduct(
  name: string | undefined,
  count: number | undefined,
  products: Map<string, ProductDetails>,
  onlyReturnBuildable: boolean,
): InputProduct | null {
  if (name === undefined || count === undefined) {
    return null;
  }

  if (products.get(name) !== undefined || !onlyReturnBuildable) {
    return { name, count };
  } else {
    throw new ReferenceError(`product ${name} does not exist`);
  }
}
