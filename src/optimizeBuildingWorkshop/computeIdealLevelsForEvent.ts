import { isEvent } from './helpers/WorkshopHelpers';
import { computeTargetFromFame } from './helpers/targetHelpers';
import { importProductsAtLevel } from '../importEventProducts';
import { importMainWorkshop } from '../importMainWorkshop';
import { Product, ProductDetails } from '../types/Product';
import {
  DEFAULT_WORKSHOP_STATUS_EVENT,
  DEFAULT_WORKSHOP_STATUS_MAIN,
  Workshop,
  WorkshopStatus,
} from '../types/Workshop';
import { bottomUpBuilder, topDownLeveler } from './productLooper';
import { WorkshopUpgradeInfo } from './shouldUpgrade';

export function topDownToLastItem(partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  return topDownLeveler(
    workshop.productsInfo[workshop.productsInfo.length - 1].details.buildCost,
    workshop.productsInfo[workshop.productsInfo.length - 2].details.name,
    workshop,
  );
}

export function productDownUpToMoney(
  partialWorkshopStatus: Partial<WorkshopStatus>,
  target: number,
  productName: string,
): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  return topDownLeveler(target, productName, workshop);
}

// for when you have a full workshop and want to build the single next thing without optimizing the whole path up
// currently looks at the exact previous item
export function topDownToTargetProduct(
  partialWorkshopStatus: Partial<WorkshopStatus>,
  productName: string,
): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  let productBeforeTarget: string = workshop.productsInfo[0].details.name;
  for (const product of workshop.productsInfo) {
    if (product.details.name === productName) {
      return topDownLeveler(product.details.buildCost, productBeforeTarget, workshop);
    } else {
      productBeforeTarget = product.details.name;
    }
  }

  throw new Error('cannot find product ' + productName + ' in workshop ' + JSON.stringify(workshop.productsInfo));
}

export function bottomUpToLastItem(partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  return bottomUpBuilder(workshop.productsInfo[workshop.productsInfo.length - 1].details.buildCost, workshop);
}

export function quickestNewLevel(partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
  const fameRequiredToLevelUp = workshopStatus.level + 3;
  let bestTime = Number.MAX_VALUE;
  let bestFame = fameRequiredToLevelUp;
  let bestWorkshopUpgrade;
  for (let fame = 2; fame < Math.min(fameRequiredToLevelUp, 17); fame++) {
    console.log(`testing multiple resets at ${fame} fame each...`);
    const target = computeTargetFromFame(fame, workshopStatus.level);
    const targetInfo = bottomUpToMoney(target, workshopStatus);
    const idleBuildTime = targetInfo.cyclesToTarget;
    // const researchTime = computeResearchTimeForWorkshop(targetInfo.workshop);
    const finalTime = (idleBuildTime + 10) * Math.ceil(fameRequiredToLevelUp / fame);
    if (finalTime < bestTime) {
      bestTime = finalTime;
      bestFame = fame;
      bestWorkshopUpgrade = targetInfo;
    }
  }
  console.log('best fame: ' + bestFame.toString());
  console.log(`repeats ${Math.ceil(fameRequiredToLevelUp / bestFame)} times`);
  return bestWorkshopUpgrade;
}

export function bestGemChance(partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
  const targetInfo14 = bottomUpToMoney(computeTargetFromFame(14, workshopStatus.level), workshopStatus);
  const timePerGemChance14 = targetInfo14.cyclesToTarget / 8;

  const targetInfo15 = bottomUpToMoney(computeTargetFromFame(15, workshopStatus.level), workshopStatus);
  const timePerGemChance15 = targetInfo15.cyclesToTarget / 12;

  console.log(`best gem chance per time at ${timePerGemChance14 < timePerGemChance15 ? 14 : 15}`);
  return timePerGemChance14 < timePerGemChance15 ? targetInfo14 : targetInfo15;
}

export function bottomUpToMoney(target: number, partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  return bottomUpBuilder(target, workshop);
}

function setUpWorkshop(partialWorkshopStatus: Partial<WorkshopStatus>): Workshop {
  const workshopStatus: WorkshopStatus = getWorkshopStatus(partialWorkshopStatus);
  const products: ProductDetails[] = getProductDetails(workshopStatus);
  const productsInfo = setUpProductsInfo(products);

  return {
    productsInfo,
    workshopStatus,
  };
}

function getWorkshopStatus(partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopStatus {
  return isEvent(partialWorkshopStatus)
    ? { ...DEFAULT_WORKSHOP_STATUS_EVENT, ...partialWorkshopStatus }
    : { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
}

function getProductDetails(workshopStatus: WorkshopStatus): ProductDetails[] {
  return isEvent(workshopStatus)
    ? importProductsAtLevel(workshopStatus.eventName, workshopStatus.level)
    : importMainWorkshop();
}

function setUpProductsInfo(productDetails: ProductDetails[]): Product[] {
  const productsInfo = new Array<Product>();
  let isFirstItem = true;
  for (const details of productDetails) {
    productsInfo.push({
      status: {
        level: isFirstItem ? 1 : 0,
        merchants: 0,
      },
      details,
    });
    isFirstItem = false;
  }
  return productsInfo;
}
