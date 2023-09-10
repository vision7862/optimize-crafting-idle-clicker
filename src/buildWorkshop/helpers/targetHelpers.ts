import memoize from 'fast-memoize';
import { PROMOTION_BONUS_SPEED } from '../config/BoostMultipliers';
import { getCurrentIncome } from '../shouldUpgrade';
import { Product, ProductStatus } from '../types/Product';
import { Workshop } from '../types/Workshop';
import { computeResearchTimeForWorkshop } from './ResearchHelpers';
import { toTime } from './printResults';

export function computeTargetFromFame(fame: number, level: number, isEvent: boolean): number {
  return 10 ** (fame + (isEvent ? Math.min(level, 10) : level) - 1);
}

export function filterOutSkipped(statuses: Map<string, ProductStatus>): Map<string, ProductStatus> {
  const filteredStatuses = new Map<string, ProductStatus>(statuses);
  for (const [productName, status] of filteredStatuses.entries()) {
    if (status.level === 0) {
      filteredStatuses.delete(productName);
    }
  }
  return filteredStatuses;
}

export function filterOutSkippedFullWorkshop(workshop: Workshop): Workshop {
  return {
    productsInfo: workshop.productsInfo.filter((product: Product) => product.status.level > 0),
    workshopStatus: workshop.workshopStatus,
  };
}

export function computeBuildTimeForWorkshop(workshop: Workshop, target: number, abandonIfOver: number = 10000): number {
  // assume there are no half-cycles. it takes a full cycle to build something, and everything ticks together.
  let money = 10;
  // build wood
  money -= 10;
  let cycleNum = 1;

  for (let i = 0; i < workshop.productsInfo.length; i++) {
    const targetLevel = workshop.productsInfo[i].status.level;
    if (targetLevel === 0) {
      continue;
    }
    let inProgressLevel = i === 0 ? 1 : 0; // start wood at level 1
    let inProgressWorkshop = {
      ...workshop,
      productsInfo: getProductsCroppedAndWithProductLevelChanged(workshop, i, inProgressLevel),
    };

    cycleNum = waitForProductToBeResearched(cycleNum, workshop, i);

    // until fully leveled, cycles ticking as necessary
    const productDetails = inProgressWorkshop.productsInfo[i].details;
    while (inProgressLevel < targetLevel && cycleNum < Math.min(abandonIfOver, 10000)) {
      let costToUpgrade = Math.round(
        productDetails.buildCost * productDetails.upgradeCostMultiplier ** inProgressLevel,
      );
      inProgressWorkshop = {
        ...workshop,
        productsInfo: getProductsCroppedAndWithProductLevelChanged(workshop, i, inProgressLevel),
      };
      money += getCurrentIncome(inProgressWorkshop, 1);
      // one cycle: start with money, get as far as you can up to where we want to be
      while (money >= costToUpgrade && inProgressLevel < targetLevel) {
        money -= costToUpgrade;
        inProgressLevel++;
        costToUpgrade = Math.round(productDetails.buildCost * productDetails.upgradeCostMultiplier ** inProgressLevel);
      }
      cycleNum++;
    }
  }
  cycleNum += Math.ceil((target - money) / getCurrentIncome(workshop, 1));
  return cycleNum * getSecondsPerCycle(workshop.workshopStatus.speedBoostActive);
}

const getProductsCroppedAndWithProductLevelChanged = memoize(
  (workshop: Workshop, i: number, level: number): Product[] => {
    const croppedProducts = workshop.productsInfo.slice(0, i + 1);
    const newProduct: Product = {
      ...workshop.productsInfo[i],
      status: {
        ...workshop.productsInfo[i].status,
        level,
      },
    };
    const productsWithProductDownleveled = new Array<Product>(...croppedProducts);
    productsWithProductDownleveled.splice(i, 1, newProduct);
    return productsWithProductDownleveled;
  },
);

function waitForProductToBeResearched(cycleNum: number, workshop: Workshop, i: number): number {
  const secondsPerCycle = getSecondsPerCycle(workshop.workshopStatus.speedBoostActive);
  const secondsSoFar = cycleNum * secondsPerCycle;
  const secondsNeededToResearch = computeResearchTimeForWorkshop({
    ...workshop,
    productsInfo: getProductsCroppedAndWithProductLevelChanged(workshop, i, 1),
  });
  if (secondsSoFar < secondsNeededToResearch) {
    const cyclesWaitingOnResearch = Math.ceil((secondsNeededToResearch - secondsSoFar) / secondsPerCycle);
    cycleNum += cyclesWaitingOnResearch;
    console.log(
      `waiting for ${workshop.productsInfo[i].details.name} to be researched, takes ${toTime(
        secondsNeededToResearch - secondsSoFar,
      )}`,
    );
  }
  return cycleNum;
}

export function getSecondsPerCycle(workshopStatus: WorkshopStatus): number {
  const speedWithoutPromo = 10 / (workshopStatus.speedBoostActive ? 2 : 1);
  return isEvent(workshopStatus) ? speedWithoutPromo : speedWithoutPromo / PROMOTION_BONUS_SPEED;
}
