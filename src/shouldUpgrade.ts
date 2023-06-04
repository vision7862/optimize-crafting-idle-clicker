const clickBonusMultiplier = 3;
const merchantBonusMultiplier = 3;

export function shouldUpgrade(
    target: number,
    currLevel: number,
    itemsPerLevel: number,
    clickBonus: boolean,
    incomePerItem: number,
    merchantBonus: boolean,
    upgradeCost: number
): boolean {
    const currNumItems = currLevel * itemsPerLevel * (clickBonus ? clickBonusMultiplier : 1);
    const incomePerCycle = currNumItems * incomePerItem * (merchantBonus ? merchantBonusMultiplier : 1);
    const cyclesToTarget = target/incomePerCycle;

    const newItemsPerCycle = currNumItems + itemsPerLevel * (clickBonus ? clickBonusMultiplier : 1);
    const newIncomePerCycle = newItemsPerCycle * incomePerItem * (merchantBonus ? merchantBonusMultiplier : 1);
    const cyclesToRaiseUpgradeMoney = upgradeCost/incomePerCycle;
    const upgradedCyclesToTarget = target/newIncomePerCycle + cyclesToRaiseUpgradeMoney;
    return upgradedCyclesToTarget < cyclesToTarget;
}
