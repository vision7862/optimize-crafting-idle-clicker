import * as fs from 'fs';
import * as path from 'path';
import { InputProduct, ProductDetails } from './types/Product';

export function importMainWorkshop(): ProductDetails[] {
  const blueprintMap = getBlueprintMap();

  const mainWorkshopProducts = getFile('MainWorkshop');
  const products = new Array<ProductDetails>();

  for (const line of mainWorkshopProducts.split(/[\r\n]+/)) {
    if (line.includes('//')) {
      continue;
    }
    const details = line.split(/ {2,}/gm);
    if (details.length !== 7 && details.length !== 8) {
      throw new Error('import poorly formatted ' + line);
    }
    let product: ProductDetails = {
      outputCount: +details[0].split('x ')[0],
      name: details[0].split('x ')[1],
      researchCost: +details[1].replace(/[$, ]/g, ''),
      buildCost: +details[2].replace(/[$, ]/g, ''),
      revenue: +details[3].replace(/[$, ]/g, ''),
      upgradeCostMultiplier: getUpgradeCostMultiplier(details[4]),
      input1: getInputProduct(details[5]),
      input2: getInputProduct(details[6]),
    };
    const blueprintScore = blueprintMap.get(product.name);
    if (blueprintScore != null) {
      product = {
        ...product,
        revenue: product.revenue * (blueprintScore / 10),
      };
    }
    products.push(product);
  }
  return products;
}

function getBlueprintMap(): Map<string, number> {
  const blueprintProducts = getFile('../mainWorkshopSettings/BlueprintScores');
  const blueprintMap = new Map<string, number>();

  for (const line of blueprintProducts.split(/[\r\n]+/)) {
    if (line.includes('//')) {
      continue;
    }
    const details = line.split(/\t+/);
    if (details.length !== 2) {
      throw new Error('import poorly formatted ' + line);
    }
    blueprintMap.set(details[0], +details[1]);
  }
  return blueprintMap;
}

export function getFile(fileName: string): string {
  const extraStepUpForDist = __dirname.includes('dist') ? '../' : '';
  const blueprintPath = path.join(__dirname, extraStepUpForDist + `../config/products/${fileName}.txt`);
  const blueprintProducts = fs.readFileSync(blueprintPath, 'utf8');
  return blueprintProducts;
}

function getInputProduct(inputDescription: string): InputProduct | null {
  if (inputDescription !== '-' && inputDescription !== '') {
    return {
      name: inputDescription.split('x ')[1],
      count: +inputDescription.split('x ')[0],
    };
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
