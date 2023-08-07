import * as fs from 'fs';
import * as path from 'path';
import { InputProduct, ProductDetails } from './types/Product';

export function importProductsAtLevel(eventName: string, level: number): Map<string, ProductDetails> {
  const levelForMultiplier = Math.min(10, level);
  const file = getFile(eventName.replace(/\s/g, ''));
  const products = new Map<string, ProductDetails>();

  for (const line of file.split(/[\r\n]+/)) {
    const details = line.split(/\t+/);
    if (details.length < 7) {
      throw new Error('import poorly formatted ' + line);
    }
    const product: ProductDetails = {
      name: details[0],
      researchCost: +details[1].replace(/[$, ]/g, ''),
      buildCost: +details[2].replace(/[$, ]/g, ''),
      revenue: +details[3].replace(/[$, ]/g, '') / 2 ** (10 - levelForMultiplier),
      outputCount: +details[4].split('x')[1],
      input1: getInputProduct(details[5], products, true),
      input2: getInputProduct(details[6], products, true),
      upgradeCostMultiplier: getUpgradeCostMultiplier(details[7]),
    };
    products.set(product.name, product);
  }
  return products;
}

export function importProducts(eventName: string): Map<string, ProductDetails> {
  return importProductsAtLevel(eventName, 10);
}

export function getFile(fileName: string): string {
  const extraStepUpForDist = __dirname.includes('dist') ? '../' : '';
  const blueprintPath = path.join(__dirname, extraStepUpForDist + `../../products/${fileName}.txt`);
  const blueprintProducts = fs.readFileSync(blueprintPath, 'utf8');
  return blueprintProducts;
}

export function getInputProduct(
  inputDescription: string,
  products: Map<string, ProductDetails>,
  onlyReturnBuildable: boolean,
): InputProduct | null {
  if (inputDescription !== '-' && inputDescription !== '') {
    const name = inputDescription.split(' x')[0];
    const inputProduct = {
      name,
      count: +inputDescription.split(' x')[1],
    };
    if (products.get(name) !== undefined) {
      return inputProduct;
    } else {
      if (onlyReturnBuildable) {
        throw new ReferenceError(`product ${name} does not exist`);
      } else return inputProduct;
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
