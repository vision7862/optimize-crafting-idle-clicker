import memoize from 'fast-memoize';
import { CLICK_BOOST_MULTIPLIER, PROMOTION_BONUS_CLICK_OUTPUT } from './config/BoostMultipliers';
import { getProductByName } from './helpers/WorkshopHelpers';
import { getMerchantCapacity, getWorkshopIncomeMultiplier } from './helpers/getWorkshopIncomeMultiplier';
import { Product, ProductDetails, ProductStatus } from './types/Product';
import { Workshop, WorkshopStatus } from './types/Workshop';

export function getUpgradedWorkshopIfBetter(target: number, productName: string, workshop: Workshop): Workshop | null {
  const product: Product = getProductByName(productName, workshop.productsInfo);
  const clickBoost = workshop.workshopStatus.clickBoostActive
    ? CLICK_BOOST_MULTIPLIER * PROMOTION_BONUS_CLICK_OUTPUT
    : 1;
  const incomePerCycle = getCurrentIncome(workshop, clickBoost);
  const cyclesToTarget = target / incomePerCycle;
  if (cyclesToTarget < 1) {
    return null;
  }

  const upgradeProductInfo = getCostToUpgradeProduct(product, workshop);
  const cyclesToRaiseUpgradeMoney = upgradeProductInfo.costOfUpgrade / incomePerCycle;
  const additionalIncomePerCycle = clickBoost * getIncomeForOneLevelOfItem(product.details, workshop.workshopStatus);
  const upgradedCyclesToTarget = target / (incomePerCycle + additionalIncomePerCycle) + cyclesToRaiseUpgradeMoney;
  if (upgradedCyclesToTarget < cyclesToTarget) {
    return upgradeProductInfo.workshop;
  } else return null;
}

export const getCurrentIncome = memoize((workshop: Workshop, clickBoost: number): number => {
  let totalIncome = 0;
  // const topProduct: ProductDetails = getTopProduct(workshop);
  for (const product of workshop.productsInfo) {
    const numProductsMade = product.status.level * product.details.outputCount;
    const maxProductsSold = Math.min(numProductsMade, product.status.merchants * getMerchantCapacity(workshop));
    const numProductsConsumed = getInputItemsNeeded(product.details.name, workshop);
    const numProductsSold = Math.max(maxProductsSold - numProductsConsumed, 0);
    totalIncome +=
      // applyClickBoost(product.details, topProduct, clickBoost) *
      // TODO: GH-2: only count items that merchants are selling, not items consumed
      numProductsSold * product.details.revenue * getWorkshopIncomeMultiplier(workshop.workshopStatus);
  }
  return totalIncome;
});

function applyClickBoost(product: ProductDetails, topProduct: ProductDetails, clickBoost: number): number {
  if ([topProduct.name, topProduct.input1?.name, topProduct.input2?.name].includes(product.name)) {
    return clickBoost;
  } else return 1;
}

function getIncomeForOneLevelOfItem(product: ProductDetails, workshopStatus: WorkshopStatus): number {
  return product.outputCount * product.revenue * getWorkshopIncomeMultiplier(workshopStatus);
}

function getTopProduct(workshop: Workshop): ProductDetails {
  for (const product of [...workshop.productsInfo].reverse()) {
    if (product.status.level > 0) {
      return product.details;
    }
  }

  throw new Error('There are no products in the workshop');
}

function getCostToUpgradeProduct(product: Product, workshop: Workshop): UpgradeInfo {
  let costToUpgradeProduct = 0;
  let modifiedWorkshop = workshop;

  const parentUpgradeInfo: UpgradeInfo = upgradeSingleProduct(product, workshop, true);
  costToUpgradeProduct += parentUpgradeInfo.costOfUpgrade;
  modifiedWorkshop = parentUpgradeInfo.workshop;

  const upgradeInputsInfo = upgradeInputsToProduct(product.details, modifiedWorkshop);
  costToUpgradeProduct += upgradeInputsInfo.costOfUpgrade;
  modifiedWorkshop = upgradeInputsInfo.workshop;

  return {
    workshop: modifiedWorkshop,
    costOfUpgrade: costToUpgradeProduct,
  };
}

function upgradeInputsToProduct(parentProduct: ProductDetails, workshop: Workshop): UpgradeInfo {
  let costToUpgradeProduct = 0;
  let modifiedWorkshop = workshop;
  if (parentProduct.input1 != null) {
    const inputItemsNeeded = getInputItemsNeeded(parentProduct.input1.name, workshop);
    const inputUpgradeInfo = upgradeInput(inputItemsNeeded, parentProduct.input1.name, modifiedWorkshop);
    costToUpgradeProduct += inputUpgradeInfo.costOfUpgrade;
    modifiedWorkshop = inputUpgradeInfo.workshop;
  }
  if (parentProduct.input2 != null) {
    const inputItemsNeeded = getInputItemsNeeded(parentProduct.input2.name, workshop);
    const inputUpgradeInfo = upgradeInput(inputItemsNeeded, parentProduct.input2.name, modifiedWorkshop);
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
  for (const product of workshop.productsInfo) {
    if (product.details.input1 !== null && product.details.input1.name === inputProductName) {
      itemsNeeded += product.details.input1.count * product.status.level;
    }
    if (product.details.input2 !== null && product.details.input2.name === inputProductName) {
      itemsNeeded += product.details.input2.count * product.status.level;
    }
  }

  return itemsNeeded;
}

function upgradeInput(inputItemsNeeded: number, inputProductName: string, workshop: Workshop): UpgradeInfo {
  let costToUpgradeInput = 0;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const inputProduct = getProductByName(inputProductName, workshop.productsInfo);
  let inputLevel = inputProduct.status.level;
  if (inputLevel === 0) {
    // console.log('building product that was skipped: ' + inputProductName);
  }
  let inputItems = inputProduct.status.level * inputProduct.details.outputCount;
  let modifiedWorkshop = workshop;

  while (inputItems < inputItemsNeeded) {
    const inputUpgradeInfo = upgradeSingleProduct(
      getProductByName(inputProductName, modifiedWorkshop.productsInfo),
      modifiedWorkshop,
      false,
    );
    costToUpgradeInput += inputUpgradeInfo.costOfUpgrade;
    inputItems = ++inputLevel * inputProduct.details.outputCount;
    modifiedWorkshop = inputUpgradeInfo.workshop;
  }

  const upgradeInputsInfo = upgradeInputsToProduct(inputProduct.details, modifiedWorkshop);
  costToUpgradeInput += upgradeInputsInfo.costOfUpgrade;
  modifiedWorkshop = upgradeInputsInfo.workshop;

  return {
    workshop: modifiedWorkshop,
    costOfUpgrade: costToUpgradeInput,
  };
}

type UpgradeInfo = Readonly<{
  workshop: Workshop;
  costOfUpgrade: number;
}>;

function upgradeSingleProduct(product: Product, workshop: Workshop, shouldUpdateMerchants: boolean): UpgradeInfo {
  const newStatus: ProductStatus = {
    ...product.status,
    level: product.status.level + 1,
    merchants: shouldUpdateMerchants
      ? Math.ceil(
          ((product.status.level + 1) *
            product.details.outputCount *
            (workshop.workshopStatus.clickBoostActive ? CLICK_BOOST_MULTIPLIER * PROMOTION_BONUS_CLICK_OUTPUT : 1)) /
            getMerchantCapacity(workshop),
        )
      : product.status.merchants,
  };
  return {
    costOfUpgrade: product.details.buildCost * product.details.upgradeCostMultiplier ** product.status.level,
    workshop: {
      ...workshop,
      productsInfo: getProductsInfoWithNewStatusForProduct(product, newStatus, workshop),
    },
  };
}

export function getProductsInfoWithNewStatusForProduct(
  product: Product,
  newStatus: ProductStatus,
  workshop: Workshop,
): Product[] {
  const newProduct: Product = {
    ...product,
    status: newStatus,
  };
  const indexOfProduct: number = workshop.productsInfo.findIndex(
    (testProduct: Product) => testProduct.details.name === product.details.name,
  );
  const copiedArray = new Array<Product>(...workshop.productsInfo);
  copiedArray.splice(indexOfProduct, 1, newProduct);
  return copiedArray;
}
