import { getProductLevel } from './WorkshopHelpers';
import { getMainWorkshopIncomeMultiplier } from './targetHelpers';
import { type ProductStatus, type Workshop } from './types/Workshop';

const clickBonusMultiplier = 3;
const merchantBonusMultiplier = 3;
const ALWAYS_MERCHANT_MULTILIER = 6;
const scienceIsTight = true;

export function getUpgradedWorkshopIfBetter(
  target: number,
  clickBonus: boolean,
  merchantBonus: boolean,
  product: Product,
  workshop: Workshop,
): Workshop | null {
  const workshopUpgradeInfo = getUpgradedWorkshopAndTimeIfBetter(target, clickBonus, merchantBonus, product, workshop);
  return workshopUpgradeInfo !== null ? workshopUpgradeInfo.workshop : null;
}

export function getUpgradedWorkshopAndTimeIfBetter(
  target: number,
  clickBonus: boolean,
  merchantBonus: boolean,
  product: Product,
  workshop: Workshop,
): WorkshopUpgradeInfo | null {
  const incomePerCycle = getCurrentIncome(workshop, clickBonus, merchantBonus);
  const cyclesToTarget = target / incomePerCycle;
  if (getProductLevel(product, workshop) === 0 && scienceIsTight ? cyclesToTarget < 20 : cyclesToTarget < 5) {
    return null;
  }

  const upgradeProductInfo = getCostToUpgradeProduct(product, workshop);
  const cyclesToRaiseUpgradeMoney = upgradeProductInfo.costOfUpgrade / incomePerCycle;
  const additionalItemsFromUpgrade = product.outputCount * (clickBonus ? clickBonusMultiplier : 1);
  const additionalIncomePerCycle = additionalItemsFromUpgrade * product.revenue *
                                   (workshop.event ? 1 : ALWAYS_MERCHANT_MULTILIER) *
                                   (workshop.event ? 1 : getMainWorkshopIncomeMultiplier(workshop.level)) *
                                   (workshop.event && merchantBonus ? merchantBonusMultiplier : 1);
  const upgradedCyclesToTarget = target / (incomePerCycle + additionalIncomePerCycle) + cyclesToRaiseUpgradeMoney;
  if (upgradedCyclesToTarget < cyclesToTarget) {
    return {
      workshop: upgradeProductInfo.workshop,
      cyclesToTarget: upgradedCyclesToTarget,
    };
  } else return null;
}

export interface WorkshopUpgradeInfo {
  workshop: Workshop
  cyclesToTarget: number
}

function getCurrentIncome(workshop: Workshop, clickBonus: boolean, merchantBonus: boolean): number {
  let totalIncome = 0;
  const topProduct: Product = getTopProduct(workshop);
  for (const product of workshop.products.values()) {
    totalIncome += product.outputCount * applyClickBonus(product, topProduct, clickBonus) *
                   product.revenue *
                   getProductLevel(product, workshop) *
                   ALWAYS_MERCHANT_MULTILIER *
                   (merchantBonus ? merchantBonusMultiplier : 1);
  }
  return totalIncome;
}

function applyClickBonus(product: Product, topProduct: Product, clickBonus: boolean): number {
  if (clickBonus && [topProduct.name, topProduct.input1?.product.name, topProduct.input2?.product.name].includes(product.name)) {
    return clickBonusMultiplier;
  } else return 1;
}

function getTopProduct(workshop: Workshop): Product {
  const productsInOrder = Array.from(workshop.products.keys());
  for (let productIndex = productsInOrder.length - 1; productIndex >= 0; productIndex--) {
    const thisProduct: Product | undefined = workshop.products.get(productsInOrder[productIndex]);
    if (thisProduct !== undefined) {
      const productStatus: ProductStatus | undefined = workshop.statuses.get(thisProduct.name);
      if (productStatus !== undefined && productStatus.level > 0) {
        return thisProduct;
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return workshop.products.get(productsInOrder[0])!;
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
}

function upgradeSingleProduct(product: Product, workshop: Workshop): UpgradeInfo {
  const oldStatus: ProductStatus | undefined = workshop.statuses.get(product.name);
  if (oldStatus === undefined) {
    throw new Error('product ' + product.name + ' does not have a status.');
  }
  const newStatus: ProductStatus = {
    ...oldStatus,
    level: oldStatus.level + 1,
    merchants: Math.ceil(((oldStatus.level + 1) * product.outputCount) / 10),
  };

  const upgradeCostMultiplier: number = product.upgradeCostMultiplier !== undefined ? (1 + (product.upgradeCostMultiplier / 100)) : 1.07;

  return {
    costOfUpgrade: product.buildCost * (upgradeCostMultiplier ** oldStatus.level),
    workshop: {
      ...workshop,
      statuses: new Map(workshop.statuses).set(product.name, newStatus),
    },
  };
}
