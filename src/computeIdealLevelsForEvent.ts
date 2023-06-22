import { getProductByName, isEvent } from './helpers/WorkshopHelpers';
import { importProductsAtLevel } from './importEventProducts';
import { importMainWorkshop } from './importMainWorkshop';
import { bottomUpBuilder, topDownLeveler } from './productLooper';
import { type WorkshopUpgradeInfo } from './shouldUpgrade';
import { type Product, type ProductDetails } from './types/Product';
import { type Workshop, type WorkshopStatus } from './types/Workshop';

export function topDownToLastItem(workshopStatus: WorkshopStatus): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = getProducts(workshopStatus);
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  return (topDownLeveler(
    workshop.productsInfo[products.size - 1].details.buildCost,
    workshop.productsInfo[products.size - 2].details.name,
    workshop,
  ));
}

export function productDownUpToMoney(workshopStatus: WorkshopStatus, target: number, productName: string): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = getProducts(workshopStatus);

  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  return (topDownLeveler(
    target,
    getProductByName(productName, workshop.productsInfo).details.name,
    workshop,
  ));
}

// for when you have a full workshop and want to build the single next thing without optimizing the whole path up
// currently looks at the exact previous item
export function topDownToTargetProduct(workshopStatus: WorkshopStatus, productName: string): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = getProducts(workshopStatus);
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  let productBeforeTarget: string = workshop.productsInfo[0].details.name;
  for (const product of workshop.productsInfo) {
    if (product.details.name === productName) {
      return (topDownLeveler(product.details.buildCost, productBeforeTarget, workshop));
    } else {
      productBeforeTarget = product.details.name;
    }
  }

  throw new Error('cannot find product ' + productName + ' in workshop ' + JSON.stringify(products));
}

export function bottomUpToLastItem(workshopStatus: WorkshopStatus): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = getProducts(workshopStatus);
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  return (bottomUpBuilder(
    workshop.productsInfo[products.size - 1].details.buildCost,
    workshop,
  ));
}

export function bottomUpToMoney(target: number, workshopStatus: WorkshopStatus): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = getProducts(workshopStatus);
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  return (bottomUpBuilder(target, workshop));
}

function getProducts(workshopStatus: WorkshopStatus): Map<string, ProductDetails> {
  return isEvent(workshopStatus) ? importProductsAtLevel(workshopStatus.eventName, workshopStatus.level) : importMainWorkshop();
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
