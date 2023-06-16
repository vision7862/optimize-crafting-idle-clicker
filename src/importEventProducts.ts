import * as fs from 'fs';
import * as path from 'path';
import { getUpgradeCostMultiplier } from './importMainWorkshop';
import { type InputProduct, type ProductDetails } from './types/Product';

// level must be between 1 and 10
export function importProductsAtLevel(eventName: string, level: number): Map<string, ProductDetails> {
  const filepath = path.join(__dirname, './products/' + eventName.replace(/\s/g, '') + '.txt');
  const file = fs.readFileSync(filepath, 'utf8');
  const productMap = new Map<string, ProductDetails>();

  for (const line of file.split(/[\r\n]+/)) {
    const details = line.split(/\t+/);
    if (details.length < 7) {
      throw new Error('import poorly formatted ' + line);
    }
    const product: ProductDetails = {
      name: details[0],
      researchCost: +details[1].replace(' ', '').replace(',', ''),
      buildCost: +details[2].replace(' ', '').replace(',', ''),
      revenue: +details[3].replace(' ', '').replace(',', '') / 2 ** (10 - level),
      outputCount: +details[4].split('x')[1],
      input1: getInputProduct(details[5], productMap),
      input2: getInputProduct(details[6], productMap),
      upgradeCostMultiplier: getUpgradeCostMultiplier(details[7]),
    };
    productMap.set(product.name, product);
  }
  return productMap;
}

export function importProducts(eventName: string): Map<string, ProductDetails> {
  return importProductsAtLevel(eventName, 10);
}

function getInputProduct(inputDescription: string, productMap: Map<string, ProductDetails>): InputProduct | null {
  if (inputDescription !== '-') {
    const inputProduct: ProductDetails | undefined = productMap.get(inputDescription.split(' x')[0]);
    if (inputProduct === undefined) {
      throw new Error('Product requires input that is missing ' + inputDescription);
    }
    return {
      product: inputProduct,
      count: +inputDescription.split(' x')[1],
    };
  }
  return null;
}
