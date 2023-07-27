import { computeBuildTimeForWorkshop, filterOutSkippedFullWorkshop } from './helpers/targetHelpers';
import { getProductsInfoWithNewStatusForProduct, getUpgradedWorkshopIfBetter } from './shouldUpgrade';
import { Product, ProductStatus } from './types/Product';
import { Workshop } from './types/Workshop';

export function topDownLeveler(
  target: number,
  productName: string,
  workshop: Workshop,
  skipBuildIfUnderXCycles: number = 60,
): Workshop {
  let shouldUpgradeNext = true;
  let modifiedWorkshop: Workshop = workshop;
  while (shouldUpgradeNext) {
    const upgradedWorkshop: Workshop | null = getUpgradedWorkshopIfBetter(
      target,
      productName,
      modifiedWorkshop,
      skipBuildIfUnderXCycles,
    );
    shouldUpgradeNext = upgradedWorkshop !== null;
    if (upgradedWorkshop != null) {
      modifiedWorkshop = upgradedWorkshop;
    }
  }
  return modifiedWorkshop;
}

export type WorkshopUpgradeInfo = Readonly<{
  workshop: Workshop;
  buildTime: number;
}>;

export function bottomUpBuilder(target: number, workshop: Workshop): WorkshopUpgradeInfo {
  const firstPassOptimizedWorkshop = getFirstPassOptimizedWorkshop(workshop, target);
  console.info('computing time to build optimized workshop...');
  const firstPassBuildTime = computeBuildTimeForWorkshop(firstPassOptimizedWorkshop, target);

  console.info('trimming unneeded products...');
  const trimmedWorkshop = trimWorkshop(target, firstPassOptimizedWorkshop, firstPassBuildTime);

  for (
    let finalProductBuilt = trimmedWorkshop.workshop.productsInfo.length - 1;
    finalProductBuilt >= 0;
    finalProductBuilt--
  ) {
    const finalProduct: Product | undefined = trimmedWorkshop.workshop.productsInfo[finalProductBuilt];
    if (finalProduct.status.level > 0) {
      const modifiedWorkshopInfo = topDownLeveler(target, finalProduct.details.name, trimmedWorkshop.workshop, 1);
      return modifiedWorkshopInfo;
    }
  }

  return trimmedWorkshop;
}

function getFirstPassOptimizedWorkshop(workshop: Workshop, target: number): Workshop {
  let modifiedWorkshop: Workshop = workshop;
  for (let productIndex = 0; productIndex < workshop.productsInfo.length; productIndex++) {
    const thisProduct: Product | undefined = workshop.productsInfo[productIndex];
    const nextProduct: Product | undefined = workshop.productsInfo[productIndex + 1];
    if (thisProduct !== undefined) {
      const currentTarget = nextProduct !== undefined ? Math.min(target, nextProduct.details.buildCost) : target;
      modifiedWorkshop = topDownLeveler(currentTarget, thisProduct.details.name, modifiedWorkshop, 1);
      if (nextProduct === undefined || target < nextProduct.details.buildCost) {
        break;
      }
    }
  }
  return modifiedWorkshop;
}

function trimWorkshop(target: number, untrimmedWorkshop: Workshop, bestBuildTime: number): WorkshopUpgradeInfo {
  let bestWorkshop: Workshop = untrimmedWorkshop;
  for (let productIndex = bestWorkshop.productsInfo.length - 1; productIndex > 0; productIndex--) {
    const product = bestWorkshop.productsInfo[productIndex];
    if (product.status.level > 0 && isProductLeaf(product.details.name, bestWorkshop)) {
      const workshopWithProductZeroed = getWorkshopWithProductLevelAsZero(product, bestWorkshop);
      const buildTime = computeBuildTimeForWorkshop(workshopWithProductZeroed, target, bestBuildTime);
      if (buildTime <= bestBuildTime) {
        bestBuildTime = buildTime;
        bestWorkshop = workshopWithProductZeroed;
        console.log(`trim off ${product.details.name}`);
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
