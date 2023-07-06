import memoize from 'fast-memoize';
import { Product, ProductStatus } from '../../types/Product';
import { Workshop } from '../../types/Workshop';
import { getCurrentIncome } from '../shouldUpgrade';
import { computeResearchTimeForWorkshop } from './ResearchHelpers';

export function computeTargetFromFame(fame: number, level: number): number {
  return 10 ** (fame + level - 1);
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

export function computeBuildTimeForWorkshop(workshop: Workshop, target: number): number {
  // assume there are no half-cycles. it takes a full cycle to build something, and everything ticks together.
  let money = 10;
  // build wood
  money -= 10;
  let cycleNum = 1;

  for (let i = 0; i < workshop.productsInfo.length; i++) {
    let inProgressLevel = i === 0 ? 1 : 0; // start wood at level 1
    let inProgressWorkshop = {
      ...workshop,
      productsInfo: getProductsCroppedAndWithProductLevelChanged(workshop, i, inProgressLevel),
    };

    // make sure the product has been researched, wait for it if necessary
    let secondsSoFar = cycleNum * (workshop.workshopStatus.speedBoostActive ? 5 : 10);
    const secondsNeededToResearch = computeResearchTimeForWorkshop(inProgressWorkshop);
    while (secondsNeededToResearch > secondsSoFar) {
      cycleNum++;
      secondsSoFar = cycleNum * (workshop.workshopStatus.speedBoostActive ? 5 : 10);
    }

    // until fully leveled, cycles ticking as necessary
    const productDetails = inProgressWorkshop.productsInfo[i].details;
    const targetLevel = workshop.productsInfo[i].status.level;
    while (inProgressLevel < targetLevel) {
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
  return cycleNum * (workshop.workshopStatus.speedBoostActive ? 5 : 10);
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