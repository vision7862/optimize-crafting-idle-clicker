import { getProductByName, getStatusMap } from './WorkshopHelpers';
import { importProducts, importProductsAtLevel } from './importEventProducts';
import { importMainWorkshopAtLevel } from './importMainWorkshop';
import { optimizeEachProductToTarget, optimizeProductAndBelow } from './productLooper';
import { type WorkshopUpgradeInfo } from './shouldUpgrade';
import { type ProductDetails } from './types/Product';
import { DEFAULT_WORKSHOP_STATUS_EVENT, DEFAULT_WORKSHOP_STATUS_MAIN, type Product, type ProductStatus, type Workshop, type WorkshopStatus } from './types/Workshop';

export function optimizeBuildingLastItem(eventName: string): Map<string, ProductStatus> {
  const products: Map<string, ProductDetails> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_EVENT;
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshop: WorkshopUpgradeInfo = optimizeProductAndBelow(
    workshop.productsInfo[products.size - 1].details.buildCost,
    workshop.productsInfo[products.size - 2].details.name,
    workshop,
  );
  return getStatusMap(upgradedWorkshop.workshop);
}

export function optimizeBuildingFromTargetProduct(eventName: string, target: number, productName: string): Map<string, ProductStatus> {
  const products: Map<string, ProductDetails> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_MAIN;

  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshop: WorkshopUpgradeInfo = optimizeProductAndBelow(
    target,
    getProductByName(productName, workshop.productsInfo).details.name,
    workshop,
  );
  return getStatusMap(upgradedWorkshop.workshop);
}

// for when you have a full workshop and want to build the single next thing without optimizing the whole path up
// currently looks at the exact previous item
export function optimizeBuildingSingleProductInWorkshop(productName: string, level: number): Map<string, ProductStatus> {
  const products: Map<string, ProductDetails> = importMainWorkshopAtLevel(level);
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_MAIN;
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  let productBeforeTarget: string = workshop.productsInfo[0].details.name;
  for (const product of workshop.productsInfo) {
    if (product.details.name === productName) {
      const upgradedWorkshop: WorkshopUpgradeInfo = optimizeProductAndBelow(product.details.buildCost, productBeforeTarget, workshop);
      return getStatusMap(upgradedWorkshop.workshop);
    } else {
      productBeforeTarget = product.details.name;
    }
  }

  throw new Error('cannot find product ' + productName + ' in workshop ' + JSON.stringify(products));
}

export function oneByOneToLastItem(eventName: string): TargetWorkshopInfo {
  const products: Map<string, ProductDetails> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_MAIN;
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshopInfo: WorkshopUpgradeInfo = optimizeEachProductToTarget(
    workshop.productsInfo[products.size - 1].details.buildCost,
    workshop,
  );
  return {
    workshop: upgradedWorkshopInfo.workshop,
    cyclesToTarget: upgradedWorkshopInfo.cyclesToTarget,
  };
}

export function oneByOneToTargetAtEventLevel(eventName: string, target: number, level: number): TargetWorkshopInfo {
  const products: Map<string, ProductDetails> = importProductsAtLevel(eventName, level);
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_EVENT;
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshopInfo: WorkshopUpgradeInfo = optimizeEachProductToTarget(target, workshop);
  return {
    workshop: upgradedWorkshopInfo.workshop,
    cyclesToTarget: upgradedWorkshopInfo.cyclesToTarget,
  };
}

export type TargetWorkshopInfo = Readonly<{
  workshop: Workshop
  cyclesToTarget: number
}>;

export function oneByOneToLastAtWorkshopLevel(level: number): Map<string, ProductStatus> {
  const products: Map<string, ProductDetails> = importMainWorkshopAtLevel(level);
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_MAIN;
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshop: WorkshopUpgradeInfo = optimizeEachProductToTarget(
    workshop.productsInfo[products.size].details.buildCost,
    workshop,
  );
  return getStatusMap(upgradedWorkshop.workshop);
}

export function oneByOneToTargetAtWorkshopLevel(target: number, workshopStatus: WorkshopStatus): TargetWorkshopInfo {
  const products: Map<string, ProductDetails> = importMainWorkshopAtLevel(workshopStatus.level);
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshopInfo: WorkshopUpgradeInfo = optimizeEachProductToTarget(target, workshop);
  return {
    workshop: upgradedWorkshopInfo.workshop,
    cyclesToTarget: upgradedWorkshopInfo.cyclesToTarget,
  };
}

function setUpWorkshop(products: Map<string, ProductDetails>, workshopStatus: WorkshopStatus): Workshop {
  const productsInfo = new Array<Product>();
  let isFirstItem = true;
  for (const details of products.values()) {
    productsInfo.push({
      status: {
        level: isFirstItem ? 1 : 0,
        merchants: 0,
      },
      details,
    });
    isFirstItem = false;
  }

  return {
    productsInfo,
    workshopStatus,
  };
}
