import * as fs from 'fs'
import * as path from 'path';

export function importProducts(eventName: string): Product[] {
    const filepath = path.join(__dirname, './products/' + eventName + '.txt');
    const file = fs.readFileSync(filepath,'utf8');
    const productMap = new Map<string, Product>();

    for (const line of file.split(/[\r\n]+/)){
        const details = line.split("\t");
        const product: Product = {
            name: details[0],
            researchCost: +details[1].replace(" ","").replace(",",""),
            buildCost: +details[2].replace(" ","").replace(",",""),
            revenue: +details[3].replace(" ","").replace(",",""),
            outputCount: +details[4].split("x")[1],
            input1Product: details[5]!='-'? productMap.get(details[5].split(" x")[0]) : null,
            input1Count: details[5]!='-'? +details[5].split(" x")[1] : 0,
            input2Product: details[6]!='-'? productMap.get(details[6].split(" x")[0]) : null,
            input2Count: details[6]!='-'? +details[6].split(" x")[1] : 0,
        }
        productMap.set(product.name, product);
    }
    return Array.from(productMap.values());
}