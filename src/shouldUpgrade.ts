import { ProductStatus, Workshop } from "./types/Workshop";

const clickBonusMultiplier = 3;
const merchantBonusMultiplier = 3;
const ALWAYS_MERCHANT_MULTILIER = 4.25;

export function shouldUpgrade(
    target: number,
    clickBonus: boolean,
    merchantBonus: boolean,
    product: Product,
    workshop: Workshop
): boolean {
    const currLevel = workshop.statuses.get(product.name).level;
    const currNumItems = currLevel * product.outputCount * (clickBonus ? clickBonusMultiplier : 1);
    const incomePerCycle = currNumItems * product.revenue * ALWAYS_MERCHANT_MULTILIER * (merchantBonus ? merchantBonusMultiplier : 1);
    const cyclesToTarget = target/incomePerCycle;

    const newItemsPerCycle = currNumItems + product.outputCount * (clickBonus ? clickBonusMultiplier : 1);
    const newIncomePerCycle = newItemsPerCycle * product.revenue * ALWAYS_MERCHANT_MULTILIER * (merchantBonus ? merchantBonusMultiplier : 1);
    const upgradeProductInfo = getCostToUpgradeProduct(product, workshop);
    const cyclesToRaiseUpgradeMoney = upgradeProductInfo.costOfUpgrade/incomePerCycle;
    const upgradedCyclesToTarget = target/newIncomePerCycle + cyclesToRaiseUpgradeMoney;
    return upgradedCyclesToTarget < cyclesToTarget;
}

function getCostToUpgradeProduct(product: Product, workshop: Workshop): UpgradeInfo {
    let costToUpgradeProduct = 0;
    let modifiedWorkshop = workshop;

    const parentUpgradeInfo: UpgradeInfo = upgradeSingleProduct(product, workshop);
    costToUpgradeProduct += parentUpgradeInfo.costOfUpgrade;
    modifiedWorkshop = parentUpgradeInfo.workshop;

    const upgradeInputsInfo = upgradeInputsToProduct(product, modifiedWorkshop);
    costToUpgradeProduct += upgradeInputsInfo.costOfUpgrade;
    modifiedWorkshop = upgradeInputsInfo.workshop;

    return {
        workshop: modifiedWorkshop,
        costOfUpgrade: costToUpgradeProduct,
    };
}

function upgradeInputsToProduct(parentProduct: Product, workshop: Workshop): UpgradeInfo {
    let costToUpgradeProduct = 0;
    let modifiedWorkshop = workshop;
    if (parentProduct.input1) {
        const inputItemsNeeded = parentProduct.input1.count * (modifiedWorkshop.statuses.get(parentProduct.name).level);
        const inputUpgradeInfo = upgradeInput(inputItemsNeeded, parentProduct.input1.product, modifiedWorkshop);
        costToUpgradeProduct += inputUpgradeInfo.costOfUpgrade;
        modifiedWorkshop = inputUpgradeInfo.workshop;
    }
    if (parentProduct.input2) {
        const inputItemsNeeded = parentProduct.input2.count * (modifiedWorkshop.statuses.get(parentProduct.name).level);
        const inputUpgradeInfo = upgradeInput(inputItemsNeeded, parentProduct.input2.product, modifiedWorkshop);
        costToUpgradeProduct += inputUpgradeInfo.costOfUpgrade;
        modifiedWorkshop = inputUpgradeInfo.workshop;
    }
    return {
        workshop: modifiedWorkshop,
        costOfUpgrade: costToUpgradeProduct,
    };
}

function upgradeInput(inputItemsNeeded: number, inputProduct: Product, workshop: Workshop): UpgradeInfo {
    let costToUpgradeInput = 0;
    let inputLevel = workshop.statuses.get(inputProduct.name).level;
    let inputItems = inputLevel * inputProduct.outputCount;
    let modifiedWorkshop = workshop;

    while (inputItems < inputItemsNeeded) {
        const inputUpgradeInfo = upgradeSingleProduct(inputProduct, modifiedWorkshop);
        costToUpgradeInput += inputUpgradeInfo.costOfUpgrade;
        inputItems = inputLevel++ * inputProduct.outputCount;
        modifiedWorkshop = inputUpgradeInfo.workshop;
    }
    
    const upgradeInputsInfo = upgradeInputsToProduct(inputProduct, modifiedWorkshop);
    costToUpgradeInput += upgradeInputsInfo.costOfUpgrade;
    modifiedWorkshop = upgradeInputsInfo.workshop;

    return {
        workshop: modifiedWorkshop,
        costOfUpgrade: costToUpgradeInput,
    };
}

type UpgradeInfo = {
    workshop: Workshop;
    costOfUpgrade: number;
}

function upgradeSingleProduct(product: Product, workshop: Workshop): UpgradeInfo {
    const oldStatus = workshop.statuses.get(product.name);
    const newStatus: ProductStatus = {
        ...oldStatus,
        level: oldStatus.level + 1,
    };

    return {
        costOfUpgrade: product.buildCost*(1.07 ** oldStatus.level),
        workshop: {
            ...workshop,
            statuses: workshop.statuses.set(product.name, newStatus),
        }
    };
}