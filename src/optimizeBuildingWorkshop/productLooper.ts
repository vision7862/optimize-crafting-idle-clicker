import { Product, ProductStatus } from '../types/Product';
import { Workshop } from '../types/Workshop';
import { computeBuildTimeForWorkshop, filterOutSkippedFullWorkshop } from './helpers/targetHelpers';
import {
  getProductsInfoWithNewStatusForProduct,
  getUpgradedWorkshopIfBetter,
  WorkshopUpgradeInfo,
} from './shouldUpgrade';

export function topDownLeveler(
  target: number,
  productName: string,
  workshop: Workshop,
  skipBuildIfUnderXCycles: number = 60,
): WorkshopUpgradeInfo {
  let shouldUpgradeNext = true;
  let modifiedWorkshopInfo: WorkshopUpgradeInfo = {
    workshop,
    cyclesToTarget: 0,
  };
  while (shouldUpgradeNext) {
    const upgradedWorkshopInfo: WorkshopUpgradeInfo | null = getUpgradedWorkshopIfBetter(
      target,
      productName,
      modifiedWorkshopInfo.workshop,
      skipBuildIfUnderXCycles,
    );
    shouldUpgradeNext = upgradedWorkshopInfo !== null;
    if (upgradedWorkshopInfo != null) {
      modifiedWorkshopInfo = upgradedWorkshopInfo;
    }
  }
  return modifiedWorkshopInfo;
}

export function bottomUpBuilder(target: number, workshop: Workshop): WorkshopUpgradeInfo {
  let firstPassOptimizedWorkshop = getFirstPassOptimizedWorkshop(workshop, target);
  let firstPassBuildTime = computeBuildTimeForWorkshop(firstPassOptimizedWorkshop, target);

  return trimWorkshop(target, workshop, firstPassOptimizedWorkshop, firstPassBuildTime);
}

function getFirstPassOptimizedWorkshop(workshop: Workshop, target: number): Workshop {
  let modifiedWorkshop: Workshop = workshop;
  for (let productIndex = 0; productIndex < workshop.productsInfo.length; productIndex++) {
    const thisProduct: Product | undefined = workshop.productsInfo[productIndex];
    const nextProduct: Product | undefined = workshop.productsInfo[productIndex + 1];
    if (thisProduct !== undefined) {
      const currentTarget = nextProduct !== undefined ? Math.min(target, nextProduct.details.buildCost) : target;
      const modifiedWorkshopInfo = topDownLeveler(currentTarget, thisProduct.details.name, modifiedWorkshop, 1);
      modifiedWorkshop = modifiedWorkshopInfo.workshop;
      if (nextProduct === undefined || target < nextProduct.details.buildCost) {
        break;
      }
    }
  }
  return modifiedWorkshop;
}

function trimWorkshop(
  target: number,
  workshop: Workshop,
  bestWorkshop: Workshop,
  bestBuildTime: number,
): WorkshopUpgradeInfo {
  for (let productIndex = workshop.productsInfo.length - 1; productIndex > 0; productIndex--) {
    let product = bestWorkshop.productsInfo[productIndex];
    if (product.status.level > 0 && isProductLeaf(product.details.name, bestWorkshop)) {
      const workshopWithProductZeroed = getWorkshopWithProductLevelAsZero(product, bestWorkshop);
      const buildTime = computeBuildTimeForWorkshop(workshopWithProductZeroed, target);
      if (buildTime <= bestBuildTime) {
        bestBuildTime = buildTime;
        bestWorkshop = workshopWithProductZeroed;
      }
    }
  }
  return {
    workshop: bestWorkshop,
    cyclesToTarget: bestBuildTime,
  };
}
function isProductLeaf(productName: string, workshop: Workshop): boolean {
  const onlyBuiltProducts = filterOutSkippedFullWorkshop(workshop).productsInfo;
  for (const product of onlyBuiltProducts) {
    if (product.details.input1?.name === productName || product.details.input2?.name === productName) {
      return false;
    }
  }
  return true;
}

function getWorkshopWithProductLevelAsZero(product: Product, workshop: Workshop): Workshop {
  const newStatus: ProductStatus = {
    ...product.status,
    level: 0,
  };
  return {
    ...workshop,
    productsInfo: getProductsInfoWithNewStatusForProduct(product, newStatus, workshop),
  };
}
