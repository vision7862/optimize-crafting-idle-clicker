import * as fs from 'fs';
import * as path from 'path';

export function importMainWorkshopAtLevel(level: number): Map<string, Product> {
  const blueprintMap = getBlueprintMap();

  const wsPath = path.join(__dirname, './products/MainWorkshopFromWiki.txt');
  const mainWorkshopProducts = fs.readFileSync(wsPath, 'utf8');
  const productMap = new Map<string, Product>();

  for (const line of mainWorkshopProducts.split(/[\r\n]+/)) {
    if (line.includes('//')) {
      continue;
    }
    const details = line.split(/\t+/);
    if (details.length !== 7) {
      throw new Error('import poorly formatted ' + line);
    }
    const product: Product = {
      outputCount: +details[0].split('x ')[0],
      name: details[0].split('x ')[1],
      researchCost: +details[1].replace(/[$, ]/g, ''),
      buildCost: +details[2].replace(/[$, ]/g, ''),
      revenue: +details[3].replace(/[$, ]/g, '') * 2 ** level,
      upgradeCostMultiplier: getUpgradeCostMultiplier(details[4]),
      input1: getInputProductWiki(details[5], productMap),
      input2: getInputProductWiki(details[6], productMap),
    };
    const blueprintInfo = blueprintMap.get(product.name);
    if (blueprintInfo != null) {
      product.revenue *= blueprintInfo / 10;
    }
    productMap.set(product.name, product);
  }
  return productMap;
}

function getBlueprintMap(): Map<string, number> {
  const blueprintPath = path.join(__dirname, './products/MWSBlueprintMultipliers.txt');
  const blueprintProducts = fs.readFileSync(blueprintPath, 'utf8');
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

function getInputProductWiki(inputDescription: string, productMap: Map<string, Product>): InputProduct | null {
  if (inputDescription !== '-' && inputDescription !== '') {
    const inputProduct: Product | undefined = productMap.get(inputDescription.split('x ')[1]);
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
    case 'Green': return 7;
    case 'Yellow': return 8;
    case 'Blue': return 9;
    case 'Red': return 10;
    case 'Violet': return 11;
    default: throw new Error('color does not exist ' + color);
  }
}
