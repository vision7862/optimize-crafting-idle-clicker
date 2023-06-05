import { shouldUpgrade } from "./shouldUpgrade";
import { Workshop } from "./types/Workshop";

export function maxLevelShouldBe(
    target: number,
    product: Product,
    workshop: Workshop,
): number {
    var currLevel = workshop.statuses.get(product.name).level;
    do {
        currLevel++;
        if (currLevel > 100) {
            break;
        }
    } while (shouldUpgrade(target, true, true, product, workshop))
    return currLevel-1;
}