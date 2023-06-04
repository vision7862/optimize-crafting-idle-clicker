import { shouldUpgrade } from "./shouldUpgrade";

export function maxLevelShouldBe(
    target: number,
    product: Product,
): number {
    var currLevel = 0;
    do {
        currLevel++;
        if (currLevel > 100) {
            break;
        }
    } while (shouldUpgrade(target, currLevel, true, true, product))
    return currLevel-1;
}