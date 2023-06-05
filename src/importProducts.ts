import * as fs from 'fs';
import * as path from 'path';

export function importProducts (eventName: string): Map<string, Product> {
  const filepath = path.join(__dirname, './products/' + eventName + '.txt');
  const file = fs.readFileSync(filepath, 'utf8');
  const productMap = new Map<string, Product>();

  for (const line of file.split(/[\r\n]+/)) {
    const details = line.split('\t');
    const product: Product = {
      name: details[0],
      researchCost: +details[1].replace(' ', '').replace(',', ''),
      buildCost: +details[2].replace(' ', '').replace(',', ''),
      revenue: +details[3].replace(' ', '').replace(',', ''),
      outputCount: +details[4].split('x')[1],
      input1: details[5] !== '-' ? {
        product: productMap.get(details[5].split(' x')[0])!,
        count: +details[5].split(' x')[1],
      } : null,
      input2: details[6] !== '-' ? {
        product: productMap.get(details[6].split(' x')[0])!,
        count: +details[6].split(' x')[1],
      } : null,
    };
    productMap.set(product.name, product);
  }
  return productMap;
}
