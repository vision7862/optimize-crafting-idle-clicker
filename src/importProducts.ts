import * as fs from 'fs';
import * as path from 'path';

// level must be between 1 and 10
export function importProductsAtLevel(eventName: string, level: number): Map<string, Product> {
  const filepath = path.join(__dirname, './products/' + eventName + '.txt');
  const file = fs.readFileSync(filepath, 'utf8');
  const productMap = new Map<string, Product>();

  for (const line of file.split(/[\r\n]+/)) {
    const details = line.split(/\t+/);
    if (details.length !== 7) {
      throw new Error('import poorly formatted ' + line);
    }
    const product: Product = {
      name: details[0],
      researchCost: +details[1].replace(' ', '').replace(',', ''),
      buildCost: +details[2].replace(' ', '').replace(',', ''),
      revenue: +details[3].replace(' ', '').replace(',', '') / 2 ** (10 - level),
      outputCount: +details[4].split('x')[1],
      input1: getInputProduct(details[5], productMap),
      input2: getInputProduct(details[6], productMap),
    };
    productMap.set(product.name, product);
  }
  return productMap;
}

export function importProducts(eventName: string): Map<string, Product> {
  return importProductsAtLevel(eventName, 10);
}

function getInputProduct(inputDescription: string, productMap: Map<string, Product>): InputProduct | null {
  if (inputDescription !== '-') {
    const inputProduct: Product | undefined = productMap.get(inputDescription.split(' x')[0]);
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
