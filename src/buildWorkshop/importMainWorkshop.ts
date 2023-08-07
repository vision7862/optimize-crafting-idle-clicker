import memoize from 'fast-memoize';
import { MainWorkshopProducts } from '../../products/MainWorkshop';
import { BLUEPRINT_LIBRARY } from '../upgradeBlueprints/config/BlueprintLibrary';
import { SetMultiplierType } from '../upgradeBlueprints/constants/BlueprintSets';
import {
  convertBlueprintLibraryToScores,
  getSpecifiedMultiplierFromLibrary,
} from '../upgradeBlueprints/helpers/blueprintScoreHelpers';
import { DAILY_DYNASTY_FRIEND_BONUS_ORE } from './config/BoostMultipliers';
import { InputProduct, ProductDetails } from './types/Product';

export type ImportedProduct = Readonly<{
  ProductType: string;
  ProductAmount: number;
  ConstructionPrice: number;
  ProductPrice: number;
  DiscoveryPrice: number;
  Type: string;
  Tags?: string[];
  LeftResourceType?: string;
  LeftResourceAmount?: number;
  RightResourceType?: string;
  RightResourceAmount?: number;
  Optional?: boolean;
}>;

const typeUpgradeCostMultiplier = new Map<string, number>([
  ['Ore', 1.07],
  ['Ingot', 1.08],
  ['SemiProduct', 1.09],
  ['EarlyProduct', 1.1],
  ['LateProduct', 1.11],
]);

export const importMainWorkshop = memoize((onlyReturnBuildable: boolean): Map<string, ProductDetails> => {
  const blueprintMap = convertBlueprintLibraryToScores(BLUEPRINT_LIBRARY);
  const oreMultiplier = getSpecifiedMultiplierFromLibrary(SetMultiplierType.Ore) * DAILY_DYNASTY_FRIEND_BONUS_ORE;

  const products = new Map<string, ProductDetails>();
  MainWorkshopProducts.forEach((product: ImportedProduct) => {
    const blueprintScore = blueprintMap.get(product.ProductType);
    const canBuildProductToGetBlueprint = product.Optional !== true;
    const haveBlueprint = blueprintScore !== undefined;
    if (canBuildProductToGetBlueprint || haveBlueprint || !onlyReturnBuildable) {
      try {
        products.set(product.ProductType, {
          name: product.ProductType,
          outputCount: product.ProductAmount * (product.Tags?.includes('Ore') === true ? oreMultiplier : 1),
          researchCost: product.DiscoveryPrice,
          buildCost: product.ConstructionPrice,
          revenue: product.ProductPrice * ((blueprintScore ?? 10) / 10),
          upgradeCostMultiplier: typeUpgradeCostMultiplier.get(product.Type) ?? 1.09,
          input1: getInputProduct(product.LeftResourceType, product.LeftResourceAmount, products, onlyReturnBuildable),
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
});

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
