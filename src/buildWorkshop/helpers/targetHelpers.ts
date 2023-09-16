import memoize from 'fast-memoize';
import { PROMOTION_BONUS_SPEED } from '../config/BoostMultipliers';
import { CURRENT_EVENT_PASS } from '../constants/EventPass';
import { zeroAllLevels } from '../productLooper';
import { getCurrentIncome, getProductsInfoWithNewStatusForProduct } from '../shouldUpgrade';
import { Product, ProductStatus } from '../types/Product';
import { Workshop, WorkshopStatus } from '../types/Workshop';
import { computeResearchTimeForWorkshop } from './ResearchHelpers';
import { isEvent } from './WorkshopHelpers';

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

export function computeBuildTimeForWorkshop(
  workshop: Workshop,
  target: number,
  abandonIfOver: number = 10000,
  shouldPrintDebugInfo: boolean = false,
): number {
  let inProgressProducts: Product[] = zeroAllLevels(workshop.productsInfo);
  const secondsPerCycle = getSecondsPerCycle(workshop.workshopStatus);
  let money = 0;
  let cycleNum: number;
  for (cycleNum = 1; cycleNum < abandonIfOver; cycleNum++) {
    const cheapestProduct: CycleUpgradeResult = getCheapestProductToUpgrade(
      cycleNum,
      secondsPerCycle,
      workshop,
      inProgressProducts,
    );

    if (cheapestProduct.productToUpgrade === undefined) {
      if (cheapestProduct.status === CycleStatus.AllProductsBuilt) {
        const additionalCyclesWaiting = Math.ceil((target - money) / getCurrentIncome(workshop, 1));
        if (shouldPrintDebugInfo) {
          if (additionalCyclesWaiting > 0) {
            console.info(`waiting after building for ${additionalCyclesWaiting} cycle(s) to get to target`);
          } else {
            console.info(`no waiting after building to get to target`);
          }
        }
        cycleNum += additionalCyclesWaiting;
        return cycleNum * secondsPerCycle;
      } else if (cheapestProduct.status === CycleStatus.WaitingForResearch) {
        if (shouldPrintDebugInfo) console.info(`waiting for research`);
        continue;
      }
    } else {
      // get current income, check money, have a tick of income
      const currentIncome = getCurrentIncome({ ...workshop, productsInfo: inProgressProducts }, 1);
      money += currentIncome;
      // if there is enough money:
      const productToUpgrade = inProgressProducts[cheapestProduct.productToUpgrade.productIndex];
      let currentLevel = productToUpgrade.status.level;
      let costToUpgrade = cheapestProduct.productToUpgrade.costToUpgrade;
      if (money < costToUpgrade) {
        const cyclesToRaiseMoney = Math.ceil((costToUpgrade - money) / currentIncome);
        // skip forward (nextCost - money)/income cycles to when we can build it
        if (shouldPrintDebugInfo) {
          console.info(
            `waiting ${cyclesToRaiseMoney} cycle(s) to raise money to buy next (${productToUpgrade.details.name})`,
          );
        }
        cycleNum += cyclesToRaiseMoney;
        money += cyclesToRaiseMoney * currentIncome;
      }

      //    build as much as possible of cheapest product, income has not changed yet
      const details = productToUpgrade.details;
      const targetLevel = workshop.productsInfo[cheapestProduct.productToUpgrade.productIndex].status.level;
      if (currentLevel === 0 && details.input1 !== null) {
        cycleNum++; // conservatively add one cycle for inputs to produce enough materials
      }
      while (currentLevel < targetLevel && money >= costToUpgrade) {
        money -= costToUpgrade;
        currentLevel++;
        costToUpgrade = Math.round(details.buildCost * details.upgradeCostMultiplier ** currentLevel);
      }
      if (shouldPrintDebugInfo) {
        if (money < costToUpgrade) {
          console.info(`${details.name} leveled to ${currentLevel}, insufficient money`);
        } else {
          console.info(`${details.name} leveled to ${currentLevel}, done leveling`);
        }
      }

      inProgressProducts = getProductsInfoWithNewStatusForProduct(
        productToUpgrade,
        { ...productToUpgrade.status, level: currentLevel },
        {
          ...workshop,
          productsInfo: inProgressProducts,
        },
      );

      // levels have been bought, products have been built. income has changed, toBeBuilt has changed. recalculate from making TBB
      // if all products have been built to the required level, break
      if (shouldPrintDebugInfo) console.info(`tick ${cycleNum}`);
    }
  }
  if (cycleNum >= abandonIfOver) {
    return Number.MAX_VALUE;
  }
  throw new Error('simulating workshop build did not finish as expected');
}

enum CycleStatus {
  BuildingProducts,
  WaitingForResearch,
  AllProductsBuilt,
}

type CycleUpgradeResult = Readonly<{
  status: CycleStatus;
  productToUpgrade?: Readonly<{
    productIndex: number;
    costToUpgrade: number;
  }>;
}>;

function getCheapestProductToUpgrade(
  cycleNum: number,
  secondsPerCycle: number,
  workshop: Workshop,
  inProgressProducts: Product[],
): CycleUpgradeResult {
  const secondsSoFar = cycleNum * secondsPerCycle;
  const toBeBuilt: Array<{ productIndex: number; costToUpgrade: number }> = [];
  let allProductsResearched = true;
  for (let i = 0; i < workshop.productsInfo.length; i++) {
    const targetLevel = workshop.productsInfo[i].status.level;
    if (targetLevel === 0) {
      continue;
    }
    const secondsNeededToResearch = computeResearchTimeForWorkshop({
      ...workshop,
      productsInfo: getProductsCroppedAndWithProductLevelChanged(workshop, i, 1),
    });
    const currentLevel = inProgressProducts[i].status.level;
    if (currentLevel < targetLevel) {
      if (secondsNeededToResearch < secondsSoFar) {
        // add object to toBeBuilt list, with price the price of the single next upgrade
        const productDetails = inProgressProducts[i].details;
        toBeBuilt.push({
          productIndex: i,
          costToUpgrade: Math.round(productDetails.buildCost * productDetails.upgradeCostMultiplier ** currentLevel),
        });
      } else {
        allProductsResearched = false;
      }
    }
  }
  // sort list to get cheapest cost
  toBeBuilt.sort((a, b) => a.costToUpgrade - b.costToUpgrade);
  if (toBeBuilt.length > 0) {
    return { status: CycleStatus.BuildingProducts, productToUpgrade: toBeBuilt[0] };
  }
  if (!allProductsResearched) {
    return { status: CycleStatus.WaitingForResearch };
  }
  return { status: CycleStatus.AllProductsBuilt };
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

export function getSecondsPerCycle(workshopStatus: WorkshopStatus): number {
  const speedWithoutPromo = 10 / (workshopStatus.speedBoostActive ? 2 : 1);
  return isEvent(workshopStatus)
    ? speedWithoutPromo / CURRENT_EVENT_PASS.speedMultiplier
    : speedWithoutPromo / PROMOTION_BONUS_SPEED;
}
