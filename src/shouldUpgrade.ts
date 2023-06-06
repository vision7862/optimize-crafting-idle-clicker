import { getProductLevel } from './WorkshopHelpers';
import { type ProductStatus, type Workshop } from './types/Workshop';

const clickBonusMultiplier = 3;
const merchantBonusMultiplier = 3;
const ALWAYS_MERCHANT_MULTILIER = 4.25;

export function getUpgradedWorkshopIfBetter(
  target: number,
  clickBonus: boolean,
  merchantBonus: boolean,
  product: Product,
  workshop: Workshop,
): Workshop | null {
  const incomePerCycle = getCurrentIncome(workshop, merchantBonus);
  const cyclesToTarget = target / incomePerCycle;

  const upgradeProductInfo = getCostToUpgradeProduct(product, workshop);
  const cyclesToRaiseUpgradeMoney = upgradeProductInfo.costOfUpgrade / incomePerCycle;
  const additionalItemsFromUpgrade = product.outputCount * (clickBonus ? clickBonusMultiplier : 1);
  const additionalIncomePerCycle = additionalItemsFromUpgrade * product.revenue * ALWAYS_MERCHANT_MULTILIER * (merchantBonus ? merchantBonusMultiplier : 1);
  const upgradedCyclesToTarget = target / (incomePerCycle + additionalIncomePerCycle) + cyclesToRaiseUpgradeMoney;

  return upgradedCyclesToTarget < cyclesToTarget ? upgradeProductInfo.workshop : null;
}

function getCurrentIncome(workshop: Workshop, merchantBonus: boolean): number {
  let totalIncome = 0;
  for (const product of workshop.products.values()) {
    totalIncome += product.outputCount *
                   product.revenue *
                   getProductLevel(product, workshop) *
                   ALWAYS_MERCHANT_MULTILIER *
                   (merchantBonus ? merchantBonusMultiplier : 1);
  }
  return totalIncome;
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
  if (parentProduct.input1 != null) {
    const inputItemsNeeded = getInputItemsNeeded(parentProduct.input1.product.name, workshop);
    const inputUpgradeInfo = upgradeInput(inputItemsNeeded, parentProduct.input1.product, modifiedWorkshop);
    costToUpgradeProduct += inputUpgradeInfo.costOfUpgrade;
    modifiedWorkshop = inputUpgradeInfo.workshop;
  }
  if (parentProduct.input2 != null) {
    const inputItemsNeeded = getInputItemsNeeded(parentProduct.input2.product.name, workshop);
    const inputUpgradeInfo = upgradeInput(inputItemsNeeded, parentProduct.input2.product, modifiedWorkshop);
    costToUpgradeProduct += inputUpgradeInfo.costOfUpgrade;
    modifiedWorkshop = inputUpgradeInfo.workshop;
  }
  return {
    workshop: modifiedWorkshop,
    costOfUpgrade: costToUpgradeProduct,
  };
}

function getInputItemsNeeded(inputProductName: string, workshop: Workshop): number {
  let itemsNeeded = 0;
  for (const product of workshop.products.values()) {
    if (product.input1 !== null && product.input1.product.name === inputProductName) {
      itemsNeeded += product.input1.count * getProductLevel(product, workshop);
    }
    if (product.input2 !== null && product.input2.product.name === inputProductName) {
      itemsNeeded += product.input2.count * getProductLevel(product, workshop);
    }
  }

  return itemsNeeded;
}

function upgradeInput(inputItemsNeeded: number, inputProduct: Product, workshop: Workshop): UpgradeInfo {
  let costToUpgradeInput = 0;
  let inputLevel = getProductLevel(inputProduct, workshop);
  let inputItems = inputLevel * inputProduct.outputCount;
  let modifiedWorkshop = workshop;

  while (inputItems < inputItemsNeeded) {
    const inputUpgradeInfo = upgradeSingleProduct(inputProduct, modifiedWorkshop);
    costToUpgradeInput += inputUpgradeInfo.costOfUpgrade;
    inputItems = ++inputLevel * inputProduct.outputCount;
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

interface UpgradeInfo {
  workshop: Workshop
  costOfUpgrade: number
};

function upgradeSingleProduct(product: Product, workshop: Workshop): UpgradeInfo {
  const oldStatus: ProductStatus | undefined = workshop.statuses.get(product.name);
  if (oldStatus === undefined) {
    throw new Error('product ' + product.name + ' does not have a status.');
  }
  const newStatus: ProductStatus = {
    ...oldStatus,
    level: oldStatus.level + 1,
  };

  return {
    costOfUpgrade: product.buildCost * (1.07 ** oldStatus.level),
    workshop: {
      ...workshop,
      statuses: new Map(workshop.statuses).set(product.name, newStatus),
    },
  };
}
