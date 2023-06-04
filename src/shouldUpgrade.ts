const clickBonusMultiplier = 3;
const merchantBonusMultiplier = 3;
const ALWAYS_MERCHANT_MULTILIER = 4.25;

export function shouldUpgrade(
    target: number,
    currLevel: number,
    clickBonus: boolean,
    merchantBonus: boolean,
    product: Product,
): boolean {
    const currNumItems = currLevel * product.outputCount * (clickBonus ? clickBonusMultiplier : 1);
    const incomePerCycle = currNumItems * product.revenue * ALWAYS_MERCHANT_MULTILIER * (merchantBonus ? merchantBonusMultiplier : 1);
    const cyclesToTarget = target/incomePerCycle;

    const newItemsPerCycle = currNumItems + product.outputCount * (clickBonus ? clickBonusMultiplier : 1);
    const newIncomePerCycle = newItemsPerCycle * product.revenue * ALWAYS_MERCHANT_MULTILIER * (merchantBonus ? merchantBonusMultiplier : 1);
    const upgradeCost = product.buildCost*(1.07 ** currLevel);
    const cyclesToRaiseUpgradeMoney = upgradeCost/incomePerCycle;
    const upgradedCyclesToTarget = target/newIncomePerCycle + cyclesToRaiseUpgradeMoney;
    return upgradedCyclesToTarget < cyclesToTarget;
}
