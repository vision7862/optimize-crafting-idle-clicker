import { getFile, getUpgradeCostMultiplier } from './importMainWorkshop';
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
      input1: getInputProduct(details[5]),
      input2: getInputProduct(details[6]),
      upgradeCostMultiplier: getUpgradeCostMultiplier(details[7]),
    };
    products.set(product.name, product);
  }
  return products;
}

export function importProducts(eventName: string): Map<string, ProductDetails> {
  return importProductsAtLevel(eventName, 10);
}

function getInputProduct(inputDescription: string): InputProduct | null {
  return inputDescription !== '-'
    ? {
        name: inputDescription.split(' x')[0],
        count: +inputDescription.split(' x')[1],
      }
    : null;
}
