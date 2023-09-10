import { LPP } from './config/BoostMultipliers';
import { isEvent } from './helpers/WorkshopHelpers';
import { getClickOutputMultiplier } from './helpers/otherMultiplierHelpers';
import { toTime } from './helpers/printResults';
import { computeBuildTimeForWorkshop, computeTargetFromFame } from './helpers/targetHelpers';
import { importWorkshop } from './importWorkshop';
import { WorkshopUpgradeInfo, buildWorkshopToTarget } from './productLooper';
import { Product, ProductDetails } from './types/Product';
import {
  DEFAULT_WORKSHOP_STATUS_EVENT,
  DEFAULT_WORKSHOP_STATUS_MAIN,
  Workshop,
  WorkshopStatus,
} from './types/Workshop';

export function bottomUpToLastItem(partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  return buildWorkshopToTarget(workshop.productsInfo[workshop.productsInfo.length - 1].details.buildCost, workshop);
}

export function quickestNewLevel(partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
  const fameRequiredToLevelUp =
    (isEvent(workshopStatus) ? Math.min(10, workshopStatus.level) : workshopStatus.level) + 3;
  let bestTime = Number.MAX_VALUE;
  let bestFame = fameRequiredToLevelUp;
  let bestWorkshopUpgrade;
  for (let fame = isEvent(workshopStatus) ? 1 : 12; fame < Math.min(fameRequiredToLevelUp, 30); fame++) {
    console.log(`testing multiple resets at ${fame} fame each...`);
    const target = computeTargetFromFame(fame, workshopStatus.level, isEvent(workshopStatus));
    const targetInfo = bottomUpToMoney(target, workshopStatus);
    const idleBuildTime = computeBuildTimeForWorkshop(targetInfo.workshop, target);
    if (idleBuildTime > 20 * 45) {
      console.log(`${fame} fame takes too long`);
      break;
    }
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

export function fastestFamePerSecond(partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
  const fameRequiredToLevelUp = workshopStatus.level + 3;
  let bestTime = Number.MAX_VALUE;
  let bestFame = fameRequiredToLevelUp;
  let bestWorkshopUpgrade;
  for (let fame = 12; fame < Math.min(fameRequiredToLevelUp, 30); fame++) {
    console.log(`testing multiple resets at ${fame} fame each...`);
    const target = computeTargetFromFame(fame, workshopStatus.level, isEvent(workshopStatus));
    const targetInfo = bottomUpToMoney(target, workshopStatus);
    const buildTime = computeBuildTimeForWorkshop(targetInfo.workshop, target);
    const resetTime = buildTime + 10 * Math.ceil(fameRequiredToLevelUp / fame);
    console.log(`${fame} fame takes ${toTime(resetTime)}`);
    if (resetTime > 60 * 45) {
      console.log(`${fame} fame takes too long`);
      break;
    }
    const timePerFame = resetTime / fame;
    if (timePerFame < bestTime) {
      bestTime = timePerFame;
      bestFame = fame;
      bestWorkshopUpgrade = targetInfo;
    }
  }
  console.log('best fame: ' + bestFame.toString());
  console.log(`repeats ${Math.ceil(fameRequiredToLevelUp / bestFame)} times`);
  return bestWorkshopUpgrade;
}

export function clickTopAndInputs(target: number, partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  const copiedProducts = new Array<Product>(...workshop.productsInfo);

  const topProduct = workshop.productsInfo[workshop.productsInfo.length - 1];
  const newTopProduct: Product = {
    ...topProduct,
    ...multiplyProductCounts(topProduct, workshop.workshopStatus),
  };
  copiedProducts.splice(workshop.productsInfo.length - 1, 1, newTopProduct);

  const input1 = newTopProduct.details.input1;
  if (input1 !== null) {
    const indexOfInput1: number = workshop.productsInfo.findIndex(
      (testProduct: Product) => testProduct.details.name === input1.name,
    );
    const newInput1: Product = {
      ...workshop.productsInfo[indexOfInput1],
      ...multiplyProductCounts(workshop.productsInfo[indexOfInput1], workshop.workshopStatus),
    };
    copiedProducts.splice(indexOfInput1, 1, newInput1);
  }

  const input2 = newTopProduct.details.input2;
  if (input2 !== null) {
    const indexOfInput2: number = workshop.productsInfo.findIndex(
      (testProduct: Product) => testProduct.details.name === input2.name,
    );
    const newInput2: Product = {
      ...workshop.productsInfo[indexOfInput2],
      ...multiplyProductCounts(workshop.productsInfo[indexOfInput2], workshop.workshopStatus),
    };
    copiedProducts.splice(indexOfInput2, 1, newInput2);
  }

  return buildWorkshopToTarget(target, { ...workshop, productsInfo: copiedProducts });
}

const CYCLES_PER_NORMAL_CYCLE = 4.55; // 6.5;
function multiplyProductCounts(product: Product, workshopStatus: WorkshopStatus): Product {
  return {
    ...product,
    details: {
      ...product.details,
      outputCount:
        product.details.outputCount *
        CYCLES_PER_NORMAL_CYCLE *
        getClickOutputMultiplier({ ...workshopStatus, clickBoostActive: true }),
      input1:
        product.details.input1 !== null
          ? {
              ...product.details.input1,
              count: product.details.input1.count * CYCLES_PER_NORMAL_CYCLE,
            }
          : null,
      input2:
        product.details.input2 !== null
          ? {
              ...product.details.input2,
              count: product.details.input2.count * CYCLES_PER_NORMAL_CYCLE,
            }
          : null,
    },
  };
}

export function lorePerSecond(
  partialWorkshopStatus: Partial<WorkshopStatus>,
  barHasToken: boolean,
): WorkshopUpgradeInfo {
  const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
  const fameRequiredToLevelUp = workshopStatus.level + 3;
  let bestLorePerTime = 0;
  let bestFame = 1;
  let bestWorkshopUpgrade;
  let bestLikelyLore: number = 0;
  for (let fame = 25; fame < 50; fame++) {
    console.log(`testing multiple resets at ${fame} fame each...`);
    const target = computeTargetFromFame(fame, workshopStatus.level, isEvent(workshopStatus));
    const targetInfo = bottomUpToMoney(target, workshopStatus);
    const buildTime = computeBuildTimeForWorkshop(targetInfo.workshop, target);
    console.log(`${fame} fame takes ${toTime(buildTime)}`);
    if (buildTime > 60 * 5) {
      console.log(`${fame} fame takes too long`);
      break;
    }
    let lorePerTime: number;
    let likelyLore: number;
    const x1Lore = Math.round(fame ** (1 + workshopStatus.level / 100) * LPP);
    if (!barHasToken) {
      const chanceOf1x = Math.max(92 - fame * 8, 0);
      const chanceOf2x = fame < 12 ? Math.min(8 + fame * 8, 100) : 100;
      const averageLore = x1Lore * chanceOf1x + x1Lore * 2 * chanceOf2x;
      likelyLore = averageLore / 100;
      lorePerTime = averageLore / buildTime;
      // 0: 92/8
      // 1: 84/16
      // 2: 76/24
      // 3: 68/32
      // 4: 60/40
      // 5: 52/48
      // 6: 44/56
      // 7: 36/64
      // 8: 28/72
      // 9: 20/80
      // 10: 12/88
      // 11: 4/96
      // 12: 0/100
      // 13: 0/100
      // 14: 0/92/8
      // 15: 0/84/12/4
    } else {
      // 0: 92/8
      // 1: 84/16
      // 2: 76/24
      // 3: 68/32
      // 4: 60/32/8
      // 5: 52/32/16
      // 6: 44/32/24
      let chanceOf1x = Math.max(92 - fame * 8, 0);
      const chanceOf2x = Math.min(8 + fame * 8, 32);
      if (chanceOf2x >= 32) {
        chanceOf1x = 68;
      }
      const averageLore = x1Lore * chanceOf1x + x1Lore * 2 * chanceOf2x;
      likelyLore = averageLore / 100;
      lorePerTime = averageLore / buildTime;
    }
    if (lorePerTime > bestLorePerTime) {
      bestLorePerTime = lorePerTime;
      bestFame = fame;
      bestWorkshopUpgrade = targetInfo;
      bestLikelyLore = likelyLore;
    }
  }
  console.log('best fame: ' + bestFame.toString());
  console.log(`likely lore: ${bestLikelyLore}`);
  console.log(`repeats ${Math.ceil(fameRequiredToLevelUp / bestFame)} times`);
  return bestWorkshopUpgrade;
}

export function bestGemChance(partialWorkshopStatus: Partial<WorkshopStatus>): {
  upgradeInfo: WorkshopUpgradeInfo;
  fame: number;
} {
  console.info('computing time to reach 14 fame...');
  const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
  const targetInfo14 = bottomUpToMoney(
    computeTargetFromFame(14, workshopStatus.level, isEvent(workshopStatus)),
    workshopStatus,
  );
  const timePerGemChance14 = targetInfo14.buildTime / 8;

  console.info('computing time to reach 15 fame...');
  const targetInfo15 = bottomUpToMoney(
    computeTargetFromFame(15, workshopStatus.level, isEvent(workshopStatus)),
    workshopStatus,
  );
  const timePerGemChance15 = targetInfo15.buildTime / 12;

  console.log(`best gem chance per time at ${timePerGemChance14 < timePerGemChance15 ? 14 : 15}`);
  return timePerGemChance14 < timePerGemChance15
    ? { upgradeInfo: targetInfo14, fame: 14 }
    : { upgradeInfo: targetInfo15, fame: 15 };
}

export function bottomUpToMoney(target: number, partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  return buildWorkshopToTarget(target, workshop);
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
  const productMap = isEvent(workshopStatus) ? importWorkshop(true, workshopStatus.eventName) : importWorkshop(true);
  return Array.from(productMap.values());
}

function setUpProductsInfo(productDetails: ProductDetails[]): Product[] {
  const productsInfo = new Array<Product>();
  let isFirstItem = true;
  for (const details of productDetails) {
    productsInfo.push({
      status: {
        level: isFirstItem ? 1 : 0,
        merchants: isFirstItem ? 1 : 0,
      },
      details,
    });
    isFirstItem = false;
  }
  return productsInfo;
}
