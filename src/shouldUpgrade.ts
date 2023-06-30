import { getProductByName, isEvent } from './helpers/WorkshopHelpers';
import { getWorkshopIncomeMultiplier } from './helpers/getWorkshopIncomeMultiplier';
import { Product, ProductDetails, ProductStatus } from './types/Product';
import { Workshop, WorkshopStatus } from './types/Workshop';

const CLICK_BOOST_MULTIPLIER = 3;
const scienceIsTight = true;

export function getUpgradedWorkshopIfBetter(
  target: number,
  productName: string,
  workshop: Workshop,
  skipBuildIfUnderXCycles: number = 60,
): WorkshopUpgradeInfo | null {
  const product: Product = getProductByName(productName, workshop.productsInfo);
  const clickBoost = workshop.workshopStatus.clickBoostActive ? CLICK_BOOST_MULTIPLIER : 1;
  const incomePerCycle = getCurrentIncome(workshop, clickBoost);
  const cyclesToTarget = target / incomePerCycle;
  if (
    product.status.level === 0 &&
    // product.details.input1 !== null &&
    (scienceIsTight ? cyclesToTarget < skipBuildIfUnderXCycles : cyclesToTarget < 5)
  ) {
    return null;
  }

  const upgradeProductInfo = getCostToUpgradeProduct(product, workshop);
  const cyclesToRaiseUpgradeMoney = upgradeProductInfo.costOfUpgrade / incomePerCycle;
  const additionalIncomePerCycle = clickBoost * getIncomeForOneLevelOfItem(product.details, workshop.workshopStatus);
  const upgradedCyclesToTarget = target / (incomePerCycle + additionalIncomePerCycle) + cyclesToRaiseUpgradeMoney;
  if (upgradedCyclesToTarget < cyclesToTarget) {
    // console.log(`upgrading ${productName} from level ${product.status.level} in ${upgradedCyclesToTarget} cycles`);
    return {
      workshop: upgradeProductInfo.workshop,
      cyclesToTarget: upgradedCyclesToTarget,
    };
  } else return null;
}

export type WorkshopUpgradeInfo = Readonly<{
  workshop: Workshop;
  cyclesToTarget: number;
}>;

export function getCurrentIncome(workshop: Workshop, clickBoost: number): number {
  let totalIncome = 0;
  // const topProduct: ProductDetails = getTopProduct(workshop);
  for (const product of workshop.productsInfo) {
    totalIncome +=
      // applyClickBoost(product.details, topProduct, clickBoost) *
      product.status.level * getIncomeForOneLevelOfItem(product.details, workshop.workshopStatus);
  }
  return totalIncome;
}

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

  const parentUpgradeInfo: UpgradeInfo = upgradeSingleProduct(product, workshop);
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

const MAIN_WORKSHOP_MERCHANT_CAPACITY = 11;
function upgradeSingleProduct(product: Product, workshop: Workshop): UpgradeInfo {
  const newStatus: ProductStatus = {
    ...product.status,
    level: product.status.level + 1,
    merchants: Math.ceil(
      ((product.status.level + 1) *
        product.details.outputCount *
        (workshop.workshopStatus.clickBoostActive ? CLICK_BOOST_MULTIPLIER : 1)) /
        (isEvent(workshop.workshopStatus) ? 10 : MAIN_WORKSHOP_MERCHANT_CAPACITY),
    ),
  };
  const newProduct: Product = {
    ...product,
    status: newStatus,
  };
  const indexOfProduct: number = workshop.productsInfo.findIndex(
    (testProduct: Product) => testProduct.details.name === product.details.name,
  );
  const copiedArray = new Array<Product>(...workshop.productsInfo);
  copiedArray.splice(indexOfProduct, 1, newProduct);
  return {
    costOfUpgrade: product.details.buildCost * product.details.upgradeCostMultiplier ** product.status.level,
    workshop: {
      ...workshop,
      productsInfo: copiedArray,
    },
  };
}
