import { computeBuildTimeForWorkshop, filterOutSkippedFullWorkshop } from './helpers/targetHelpers';
import { getProductsInfoWithNewStatusForProduct, getUpgradedWorkshopIfBetter } from './shouldUpgrade';
import { Product, ProductStatus } from './types/Product';
import { Workshop } from './types/Workshop';

export function levelProductToTarget(target: number, productName: string, workshop: Workshop): Workshop {
  let shouldUpgradeNext = true;
  let modifiedWorkshop: Workshop = workshop;
  while (shouldUpgradeNext) {
    const upgradedWorkshop: Workshop | null = getUpgradedWorkshopIfBetter(target, productName, modifiedWorkshop);
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

export function buildWorkshopToTarget(target: number, workshop: Workshop): WorkshopUpgradeInfo {
  const firstPassOptimizedWorkshop = buildProductToNextProductOfWorkshop(workshop, target);
  console.info('computing time to build optimized workshop...');
  const firstPassBuildTime = computeBuildTimeForWorkshop(firstPassOptimizedWorkshop, target);

  console.info('trimming unneeded products...');
  const trimmedWorkshop = trimWorkshop(target, firstPassOptimizedWorkshop, firstPassBuildTime);

  return trimmedWorkshop;
}

function buildProductToNextProductOfWorkshop(workshop: Workshop, target: number): Workshop {
  let modifiedWorkshop: Workshop = workshop;
  for (let productIndex = 0; productIndex < workshop.productsInfo.length; productIndex++) {
    const thisProduct: Product | undefined = workshop.productsInfo[productIndex];
    const nextProduct: Product | undefined = workshop.productsInfo[productIndex + 1];
    if (thisProduct !== undefined) {
      const currentTarget = nextProduct !== undefined ? Math.min(target, nextProduct.details.buildCost) : target;
      modifiedWorkshop = levelProductToTarget(currentTarget, thisProduct.details.name, modifiedWorkshop);
      if (nextProduct === undefined || target < nextProduct.details.buildCost) {
        break;
      }
    }
  }
  return modifiedWorkshop;
}

// sometimes, the first pass skips building intermediate products, ex Rawhide, because the rest of the workshop's income can get to the next product without it
// but then, it needs a later product, ex Hilt, to get all the way up to, say, copper. so it builds Hilt and all the previous required products: leather and rawhide
// but when building the workshop forward, if we have rawhide and leather, that takes us to copper without hilt
// trimWorkshop removes hilt (and possibly leather) in that case, and others like it
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

  const lastProduct = [...bestWorkshop.productsInfo].findLast((product) => product.status.level > 0);
  if (lastProduct === undefined) {
    throw new Error('no products build in workshop');
  }
  bestWorkshop = levelProductToTarget(target, lastProduct.details.name, bestWorkshop);
  const buildTime = computeBuildTimeForWorkshop(bestWorkshop, target);

  return {
    workshop: bestWorkshop,
    buildTime,
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
