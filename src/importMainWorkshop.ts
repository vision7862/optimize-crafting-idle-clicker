import memoize from 'fast-memoize';
import * as fs from 'fs';
import * as path from 'path';
import { BLUEPRINT_LIBRARY } from './config/BlueprintLibrary';
import { convertBlueprintLibraryToScores } from './helpers/blueprintScoreHelpers';
import { InputProduct, ProductDetails } from './types/Product';

export const importMainWorkshop = memoize((): Map<string, ProductDetails> => {
  const blueprintMap = convertBlueprintLibraryToScores(BLUEPRINT_LIBRARY);

  const mainWorkshopProducts = getFile('MainWorkshop');
  const products = new Map<string, ProductDetails>();

  for (const line of mainWorkshopProducts.split(/[\r\n]+/)) {
    if (line.includes('//')) {
      continue;
    }
    const details = line.split(/ {2,}/gm);
    if (details.length !== 7 && details.length !== 8) {
      throw new Error('import poorly formatted ' + line);
    }
    try {
      let product: ProductDetails = {
        outputCount: +details[0].split('x ')[0],
        name: details[0].split('x ')[1],
        researchCost: +details[1].replace(/[$, ]/g, ''),
        buildCost: +details[2].replace(/[$, ]/g, ''),
        revenue: +details[3].replace(/[$, ]/g, ''),
        upgradeCostMultiplier: getUpgradeCostMultiplier(details[4]),
        input1: getInputProduct(details[5], products),
        input2: getInputProduct(details[6], products),
      };
      const blueprintScore = blueprintMap.get(product.name);
      if (blueprintScore !== undefined) {
        product = {
          ...product,
          revenue: product.revenue * (blueprintScore / 10),
        };
        products.set(product.name, product);
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // console.info(`Cannot import ${details[0].split('x ')[1]} because ${e.message}`);
    }
  }

  return products;
});

export function getFile(fileName: string): string {
  const extraStepUpForDist = __dirname.includes('dist') ? '../' : '';
  const blueprintPath = path.join(__dirname, extraStepUpForDist + `../products/${fileName}.txt`);
  const blueprintProducts = fs.readFileSync(blueprintPath, 'utf8');
  return blueprintProducts;
}

function getInputProduct(inputDescription: string, products: Map<string, ProductDetails>): InputProduct | null {
  if (inputDescription !== '-' && inputDescription !== '') {
    const name = inputDescription.split('x ')[1];
    if (products.get(name) !== undefined) {
      return {
        name,
        count: +inputDescription.split('x ')[0],
      };
    } else {
      throw new ReferenceError(`product ${name} does not exist`);
    }
  }
  return null;
}

export function getUpgradeCostMultiplier(color: string): number {
  switch (color) {
    case 'Green':
      return 1.07;
    case 'Yellow':
      return 1.08;
    case 'Blue':
      return 1.09;
    case 'Red':
      return 1.1;
    case 'Violet':
      return 1.11;
    default: {
      if (color === undefined) {
        console.debug('color not imported');
      } else {
        console.error('color does not exist ' + color);
      }
      return 1.09;
    }
  }
}
