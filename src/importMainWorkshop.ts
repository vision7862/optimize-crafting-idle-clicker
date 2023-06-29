import * as fs from 'fs';
import * as path from 'path';
import { InputProduct, ProductDetails } from './types/Product';

export function importMainWorkshop(): ProductDetails[] {
  const blueprintMap = getBlueprintMap();

  const mainWorkshopProducts = getFile('MainWorkshopFromWiki');
  const productMap = new Map<string, ProductDetails>();

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
      input1: getInputProduct(details[5], productMap),
      input2: getInputProduct(details[6], productMap),
    };
    const blueprintInfo = blueprintMap.get(product.name);
    if (blueprintInfo != null) {
      product = {
        ...product,
        revenue: product.revenue * (blueprintInfo / 10),
      };
    }
    productMap.set(product.name, product);
  }
  return Array.from(productMap.values());
}

function getBlueprintMap(): Map<string, number> {
  const blueprintProducts = getFile('MWSBlueprintMultipliers');
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

function getFile(fileName: string): string {
  const extraStepUpForDist = __dirname.includes('dist') ? '../' : '';
  const blueprintPath = path.join(__dirname, extraStepUpForDist + `../products/${fileName}.txt`);
  const blueprintProducts = fs.readFileSync(blueprintPath, 'utf8');
  return blueprintProducts;
}

function getInputProduct(inputDescription: string, productMap: Map<string, ProductDetails>): InputProduct | null {
  if (inputDescription !== '-' && inputDescription !== '') {
    const inputProduct: ProductDetails | undefined = productMap.get(inputDescription.split('x ')[1]);
    if (inputProduct === undefined) {
      throw new Error('Product requires input that is missing ' + inputDescription);
    }
    return {
      product: inputProduct,
      count: +inputDescription.split('x ')[0],
    };
  }
  return null;
}

export function getUpgradeCostMultiplier(color: string): number {
  switch (color) {
    case 'Green':
      return 7;
    case 'Yellow':
      return 8;
    case 'Blue':
      return 9;
    case 'Red':
      return 10;
    case 'Violet':
      return 11;
    default: {
      console.error('color does not exist ' + color);
      return 9;
    }
  }
}
