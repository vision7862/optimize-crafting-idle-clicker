import { getProductByName, isEvent } from './helpers/WorkshopHelpers';
import { importProductsAtLevel } from './importEventProducts';
import { importMainWorkshop } from './importMainWorkshop';
import { bottomUpBuilder, topDownLeveler } from './productLooper';
import { type WorkshopUpgradeInfo } from './shouldUpgrade';
import { type Product, type ProductDetails } from './types/Product';
import { DEFAULT_WORKSHOP_STATUS_EVENT, DEFAULT_WORKSHOP_STATUS_MAIN, type Workshop, type WorkshopStatus } from './types/Workshop';

export function topDownToLastItem(partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  return (topDownLeveler(
    workshop.productsInfo[workshop.productsInfo.length - 1].details.buildCost,
    workshop.productsInfo[workshop.productsInfo.length - 2].details.name,
    workshop,
  ));
}

export function productDownUpToMoney(partialWorkshopStatus: Partial<WorkshopStatus>, target: number, productName: string): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  return (topDownLeveler(
    target,
    getProductByName(productName, workshop.productsInfo).details.name,
    workshop,
  ));
}

// for when you have a full workshop and want to build the single next thing without optimizing the whole path up
// currently looks at the exact previous item
export function topDownToTargetProduct(partialWorkshopStatus: Partial<WorkshopStatus>, productName: string): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  let productBeforeTarget: string = workshop.productsInfo[0].details.name;
  for (const product of workshop.productsInfo) {
    if (product.details.name === productName) {
      return (topDownLeveler(product.details.buildCost, productBeforeTarget, workshop));
    } else {
      productBeforeTarget = product.details.name;
    }
  }

  throw new Error('cannot find product ' + productName + ' in workshop ' + JSON.stringify(workshop.productsInfo));
}

export function bottomUpToLastItem(partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  return (bottomUpBuilder(
    workshop.productsInfo[workshop.productsInfo.length - 1].details.buildCost,
    workshop,
  ));
}

export function bottomUpToMoney(target: number, partialWorkshopStatus: Partial<WorkshopStatus>): WorkshopUpgradeInfo {
  const workshop: Workshop = setUpWorkshop(partialWorkshopStatus);
  return (bottomUpBuilder(target, workshop));
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
  return isEvent(partialWorkshopStatus) ? { ...DEFAULT_WORKSHOP_STATUS_EVENT, ...partialWorkshopStatus } : { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
}

function getProductDetails(workshopStatus: WorkshopStatus): ProductDetails[] {
  return isEvent(workshopStatus) ? importProductsAtLevel(workshopStatus.eventName, workshopStatus.level) : importMainWorkshop();
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
