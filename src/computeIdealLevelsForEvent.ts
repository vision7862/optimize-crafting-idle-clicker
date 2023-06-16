import { getStatusMap } from './WorkshopHelpers';
import { importProducts, importProductsAtLevel } from './importEventProducts';
import { importMainWorkshopAtLevel } from './importMainWorkshop';
import { optimizeEachProductToTarget, optimizeEachProductToTargetWithTime, optimizeProductAndBelow } from './productLooper';
import { type ProductDetails } from './types/Product';
import { type Product, type ProductStatus, type Workshop, type WorkshopStatus } from './types/Workshop';

export function optimizeBuildingLastItem(eventName: string): Map<string, ProductStatus> {
  const products: Map<string, ProductDetails> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = {
    event: true,
    level: 0,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const productsInOrder: Product[] = Array.from(workshop.productsInfo.values());
  const upgradedWorkshop = optimizeProductAndBelow(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    productsInOrder[products.size - 1]!.details.buildCost,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    productsInOrder[products.size - 2]!,
    workshop,
  );
  return getStatusMap(upgradedWorkshop);
}

export function optimizeBuildingFromTargetProduct(eventName: string, target: number, productName: string): Map<string, ProductStatus> {
  const products: Map<string, ProductDetails> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = {
    event: false,
    level: 0,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshop = optimizeProductAndBelow(
    target,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    workshop.productsInfo.get(productName)!,
    workshop,
  );
  return getStatusMap(upgradedWorkshop);
}

// for when you have a full workshop and want to build the single next thing without optimizing the whole path up
// currently looks at the exact previous item
export function optimizeBuildingSingleProductInWorkshop(productName: string, level: number): Map<string, ProductStatus> {
  const products: Map<string, ProductDetails> = importMainWorkshopAtLevel(level);
  const workshopStatus: WorkshopStatus = {
    event: true,
    level,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  let productBeforeTarget = Array.from(workshop.productsInfo.values())[0];
  for (const product of workshop.productsInfo.values()) {
    if (product.details.name === productName) {
      const upgradedWorkshop = optimizeProductAndBelow(product.details.buildCost, productBeforeTarget, workshop);
      return getStatusMap(upgradedWorkshop);
    } else {
      productBeforeTarget = product;
    }
  }

  throw new Error('cannot find product ' + productName + ' in workshop ' + JSON.stringify(products));
}

export function oneByOneToLastItem(eventName: string): Map<string, ProductStatus> {
  return oneByOneToLastItemWithTime(eventName).statuses;
}

export function oneByOneToLastItemWithTime(eventName: string): TargetWorkshopInfo {
  const products: Map<string, ProductDetails> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = {
    event: true,
    level: 0,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshopInfo = optimizeEachProductToTargetWithTime(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    workshop.productsInfo[products.size - 1]!.buildCost,
    workshop,
  );
  return {
    statuses: getStatusMap(upgradedWorkshopInfo.workshop),
    cyclesToTarget: upgradedWorkshopInfo.cyclesToTarget,
  };
}

export function oneByOneToTargetAtEventLevel(eventName: string, target: number, level: number): Map<string, ProductStatus> {
  return oneByOneToTargetAtEventLevelWithTime(eventName, target, level).statuses;
}

export function oneByOneToTargetAtEventLevelWithTime(eventName: string, target: number, level: number): TargetWorkshopInfo {
  const products: Map<string, ProductDetails> = importProductsAtLevel(eventName, level);
  const workshopStatus: WorkshopStatus = {
    event: true,
    level,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshopInfo = optimizeEachProductToTargetWithTime(target, workshop);
  return {
    statuses: getStatusMap(upgradedWorkshopInfo.workshop),
    cyclesToTarget: upgradedWorkshopInfo.cyclesToTarget,
  };
}

export type TargetWorkshopInfo = Readonly<{
  statuses: Map<string, ProductStatus>
  cyclesToTarget: number
}>;

export function oneByOneToLastAtWorkshopLevel(level: number): Map<string, ProductStatus> {
  const products: Map<string, ProductDetails> = importMainWorkshopAtLevel(level);
  const workshopStatus: WorkshopStatus = {
    event: false,
    level,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshop = optimizeEachProductToTarget(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Array.from(workshop.productsInfo.values())[products.size]!.details.buildCost,
    workshop,
  );
  return getStatusMap(upgradedWorkshop);
}

export function oneByOneToTargetAtWorkshopLevel(target: number, level: number): Map<string, ProductStatus> {
  return oneByOneToTargetAtWorkshopLevelWithTime(target, level).statuses;
}

export function oneByOneToTargetAtWorkshopLevelWithTime(target: number, level: number): TargetWorkshopInfo {
  const products: Map<string, ProductDetails> = importMainWorkshopAtLevel(level);
  const workshopStatus: WorkshopStatus = {
    event: false,
    level,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshopInfo = optimizeEachProductToTargetWithTime(target, workshop);
  return {
    statuses: getStatusMap(upgradedWorkshopInfo.workshop),
    cyclesToTarget: upgradedWorkshopInfo.cyclesToTarget,
  };
}

export function oneByOneToTarget(eventName: string, target: number): Map<string, ProductStatus> {
  return oneByOneToTargetAtEventLevel(eventName, target, 10);
}

// export function optimizeToTargetFromStatus(eventName: string, statuses: Map<string, ProductStatus>, target: number): Map<string, ProductStatus> {
//   const products: Map<string, ProductDetails> = importProductsAtLevel(eventName, 10);
//   const workshopStatus: WorkshopStatus = {
//     event: true,
//     level: 0,
//     scientists: 100,
//   };
//   const workshop: Workshop = setUpWorkshop(products, workshopStatus);
//   const modifiedWorkshop: Workshop = {
//     ...workshop,
//     statuses,
//   };
//   const upgradedWorkshop = optimizeEachProductToTarget(target, modifiedWorkshop);
//   return getStatusMap(upgradedWorkshop);
// }

function setUpWorkshop(products: Map<string, ProductDetails>, workshopStatus: WorkshopStatus): Workshop {
  const productsInfo = new Map<string, Product>();
  let isFirstItem = true;
  for (const [productName, details] of products.entries()) {
    if (isFirstItem) {
      productsInfo.set(productName, {
        status: {
          level: 1,
          merchants: 0,
        },
        details,
      });
      isFirstItem = false;
    } else {
      productsInfo.set(productName, {
        status: {
          level: 0,
          merchants: 0,
        },
        details,
      });
    }
  }
  return {
    productsInfo,
    workshopStatus,
  };
}
