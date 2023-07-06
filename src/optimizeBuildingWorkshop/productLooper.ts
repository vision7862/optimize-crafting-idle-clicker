import { Product } from '../types/Product';
import { Workshop } from '../types/Workshop';
import { computeBuildTimeForWorkshop } from './helpers/targetHelpers';
import { WorkshopUpgradeInfo, getUpgradedWorkshopIfBetter } from './shouldUpgrade';

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
  let bestCyclesToTarget = Number.MAX_VALUE;
  let bestWorkshop: Workshop = workshop;
  let bestCyclesSkipped: number = 0;
  for (let belowThisCyclesSkip = 1; belowThisCyclesSkip < 50; belowThisCyclesSkip++) {
    // let cyclesToTarget = 0;
    let modifiedWorkshop: Workshop = workshop;
    for (let productIndex = 0; productIndex < workshop.productsInfo.length; productIndex++) {
      const thisProduct: Product | undefined = workshop.productsInfo[productIndex];
      const nextProduct: Product | undefined = workshop.productsInfo[productIndex + 1];
      if (thisProduct !== undefined) {
        const currentTarget = nextProduct !== undefined ? Math.min(target, nextProduct.details.buildCost) : target;
        const modifiedWorkshopInfo = topDownLeveler(
          currentTarget,
          thisProduct.details.name,
          modifiedWorkshop,
          belowThisCyclesSkip,
        );
        modifiedWorkshop = modifiedWorkshopInfo.workshop;
        // cyclesToTarget += modifiedWorkshopInfo.cyclesToTarget;
        if (nextProduct === undefined || target < nextProduct.details.buildCost) {
          break;
        }
      }
    }
    const cyclesToTarget = computeBuildTimeForWorkshop(modifiedWorkshop, target);
    if (cyclesToTarget < bestCyclesToTarget) {
      bestCyclesToTarget = cyclesToTarget;
      bestWorkshop = modifiedWorkshop;
      bestCyclesSkipped = belowThisCyclesSkip;
    }
  }

  console.log('best cycles skipped: ' + bestCyclesSkipped.toString());

  // console.log(JSON.stringify(filterOutSkippedFullWorkshop(bestWorkshop)));
  return {
    workshop: bestWorkshop,
    cyclesToTarget: bestCyclesToTarget,
  };
}
