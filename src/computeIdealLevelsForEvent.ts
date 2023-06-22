import { getProductByName } from './helpers/WorkshopHelpers';
import { importProducts, importProductsAtLevel } from './importEventProducts';
import { importMainWorkshopAtLevel } from './importMainWorkshop';
import { optimizeEachProductToTarget, optimizeProductAndBelow } from './productLooper';
import { type WorkshopUpgradeInfo } from './shouldUpgrade';
import { type Product, type ProductDetails } from './types/Product';
import { DEFAULT_WORKSHOP_STATUS_EVENT, DEFAULT_WORKSHOP_STATUS_MAIN, type Workshop, type WorkshopStatus } from './types/Workshop';

export function optimizeBuildingLastItem(eventName: string): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_EVENT;
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  return (optimizeProductAndBelow(
    workshop.productsInfo[products.size - 1].details.buildCost,
    workshop.productsInfo[products.size - 2].details.name,
    workshop,
  ));
}

export function optimizeBuildingFromTargetProduct(eventName: string, target: number, productName: string): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_MAIN;

  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  return (optimizeProductAndBelow(
    target,
    getProductByName(productName, workshop.productsInfo).details.name,
    workshop,
  ));
}

// for when you have a full workshop and want to build the single next thing without optimizing the whole path up
// currently looks at the exact previous item
export function optimizeBuildingSingleProductInWorkshop(productName: string): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = importMainWorkshopAtLevel();
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_MAIN;
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  let productBeforeTarget: string = workshop.productsInfo[0].details.name;
  for (const product of workshop.productsInfo) {
    if (product.details.name === productName) {
      return (optimizeProductAndBelow(product.details.buildCost, productBeforeTarget, workshop));
    } else {
      productBeforeTarget = product.details.name;
    }
  }

  throw new Error('cannot find product ' + productName + ' in workshop ' + JSON.stringify(products));
}

export function oneByOneToLastItem(eventName: string): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_MAIN;
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  return (optimizeEachProductToTarget(
    workshop.productsInfo[products.size - 1].details.buildCost,
    workshop,
  ));
}

export function oneByOneToLastAtWorkshopLevel(): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = importMainWorkshopAtLevel();
  const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_MAIN;
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  return (optimizeEachProductToTarget(
    workshop.productsInfo[products.size - 1].details.buildCost,
    workshop,
  ));
}

export function oneByOneToTargetAtEventLevel(target: number, workshopStatus: WorkshopStatus, eventName: string): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = importProductsAtLevel(eventName, workshopStatus.level);
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  return (optimizeEachProductToTarget(target, workshop));
}

export function oneByOneToTarget(target: number, workshopStatus: WorkshopStatus): WorkshopUpgradeInfo {
  const products: Map<string, ProductDetails> = importMainWorkshopAtLevel();
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  return (optimizeEachProductToTarget(target, workshop));
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
