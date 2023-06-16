import { importProducts, importProductsAtLevel } from './importEventProducts';
import { importMainWorkshopAtLevel } from './importMainWorkshop';
import { optimizeEachProductToTarget, optimizeEachProductToTargetWithTime, optimizeProductAndBelow } from './productLooper';
import { type ProductStatus, type Workshop, type WorkshopStatus } from './types/Workshop';

export function optimizeBuildingLastItem(eventName: string): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = {
    event: true,
    level: 0,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const productsInOrder = Array.from(products.keys());
  const upgradedWorkshop = optimizeProductAndBelow(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products.get(productsInOrder[productsInOrder.length - 1])!.buildCost,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products.get(productsInOrder[productsInOrder.length - 2])!,
    workshop,
  );
  return upgradedWorkshop.statuses;
}

export function optimizeBuildingFromTargetProduct(eventName: string, target: number, productName: string): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = {
    event: false,
    level: 0,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  // const productsInOrder = Array.from(products.keys());
  const upgradedWorkshop = optimizeProductAndBelow(
    target,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    workshop.products.get(productName)!,
    workshop,
  );
  return upgradedWorkshop.statuses;
}

// for when you have a full workshop and want to build the single next thing without optimizing the whole path up
// currently looks at the exact previous item
export function optimizeBuildingSingleProductInWorkshop(productName: string, level: number): Map<string, ProductStatus> {
  const products: Map<string, Product> = importMainWorkshopAtLevel(level);
  const workshopStatus: WorkshopStatus = {
    event: true,
    level,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const productsInOrder = Array.from(products.keys());
  const upgradedWorkshop = optimizeProductAndBelow(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    workshop.products.get(productName)!.buildCost,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    workshop.products.get(productsInOrder[productsInOrder.indexOf(productName) - 1])!,
    workshop,
  );
  return upgradedWorkshop.statuses;
}

export function oneByOneToLastItem(eventName: string): Map<string, ProductStatus> {
  return oneByOneToLastItemWithTime(eventName).statuses;
}

export function oneByOneToLastItemWithTime(eventName: string): TargetWorkshopInfo {
  const products: Map<string, Product> = importProducts(eventName);
  const workshopStatus: WorkshopStatus = {
    event: true,
    level: 0,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const productsInOrder = Array.from(products.keys());
  const upgradedWorkshopInfo = optimizeEachProductToTargetWithTime(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products.get(productsInOrder[productsInOrder.length - 1])!.buildCost,
    workshop,
  );
  return {
    statuses: upgradedWorkshopInfo.workshop.statuses,
    cyclesToTarget: upgradedWorkshopInfo.cyclesToTarget,
  };
}

export function oneByOneToTargetAtEventLevel(eventName: string, target: number, level: number): Map<string, ProductStatus> {
  return oneByOneToTargetAtEventLevelWithTime(eventName, target, level).statuses;
}

export function oneByOneToTargetAtEventLevelWithTime(eventName: string, target: number, level: number): TargetWorkshopInfo {
  const products: Map<string, Product> = importProductsAtLevel(eventName, level);
  const workshopStatus: WorkshopStatus = {
    event: true,
    level,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshopInfo = optimizeEachProductToTargetWithTime(target, workshop);
  return {
    statuses: upgradedWorkshopInfo.workshop.statuses,
    cyclesToTarget: upgradedWorkshopInfo.cyclesToTarget,
  };
}

export type TargetWorkshopInfo = Readonly<{
  statuses: Map<string, ProductStatus>
  cyclesToTarget: number
}>;

export function oneByOneToLastAtWorkshopLevel(level: number): Map<string, ProductStatus> {
  const products: Map<string, Product> = importMainWorkshopAtLevel(level);
  const workshopStatus: WorkshopStatus = {
    event: false,
    level,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const productsInOrder = Array.from(products.keys());
  const upgradedWorkshop = optimizeEachProductToTarget(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    products.get(productsInOrder[productsInOrder.length - 1])!.buildCost,
    workshop,
  );
  return upgradedWorkshop.statuses;
}

export function oneByOneToTargetAtWorkshopLevel(target: number, level: number): Map<string, ProductStatus> {
  return oneByOneToTargetAtWorkshopLevelWithTime(target, level).statuses;
}

export function oneByOneToTargetAtWorkshopLevelWithTime(target: number, level: number): TargetWorkshopInfo {
  const products: Map<string, Product> = importMainWorkshopAtLevel(level);
  const workshopStatus: WorkshopStatus = {
    event: false,
    level,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const upgradedWorkshopInfo = optimizeEachProductToTargetWithTime(target, workshop);
  return {
    statuses: upgradedWorkshopInfo.workshop.statuses,
    cyclesToTarget: upgradedWorkshopInfo.cyclesToTarget,
  };
}

export function oneByOneToTarget(eventName: string, target: number): Map<string, ProductStatus> {
  return oneByOneToTargetAtEventLevel(eventName, target, 10);
}

export function optimizeToTargetFromStatus(eventName: string, statuses: Map<string, ProductStatus>, target: number): Map<string, ProductStatus> {
  const products: Map<string, Product> = importProductsAtLevel(eventName, 10);
  const workshopStatus: WorkshopStatus = {
    event: true,
    level: 0,
    scientists: 100,
  };
  const workshop: Workshop = setUpWorkshop(products, workshopStatus);
  const modifiedWorkshop: Workshop = {
    ...workshop,
    statuses,
  };
  const upgradedWorkshop = optimizeEachProductToTarget(target, modifiedWorkshop);
  return upgradedWorkshop.statuses;
}

function setUpWorkshop(products: Map<string, Product>, workshopStatus: WorkshopStatus): Workshop {
  const statuses = new Map<string, ProductStatus>();
  const status: ProductStatus = {
    level: 0,
    merchants: 0,
  };

  let isFirstItem = true;
  for (const productName of products.keys()) {
    if (isFirstItem) {
      statuses.set(productName, {
        level: 1,
        merchants: 0,
      });
      isFirstItem = false;
    } else {
      statuses.set(productName, status);
    }
  }
  return {
    products,
    statuses,
    ...workshopStatus,
  };
}
