import { shouldUpgrade } from "./shouldUpgrade";

export function maxLevelShouldBe(
    target: number,
    itemsPerLevel: number,
    incomePerItem: number,
    costOfFirstUpgrade: number,
): number {
    var currLevel = 1;
    var currUpgradeCost = costOfFirstUpgrade;
    while (shouldUpgrade(target,currLevel,itemsPerLevel,true,incomePerItem,true,currUpgradeCost)) {
        currLevel++;
        currUpgradeCost*=1.08;
    }
    return currLevel;
}