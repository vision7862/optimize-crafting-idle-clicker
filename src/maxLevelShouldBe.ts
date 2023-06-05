import { getProductLevel } from './WorkshopHelpers';
import { shouldUpgrade } from './shouldUpgrade';
import { type Workshop } from './types/Workshop';

export function maxLevelShouldBe (
  target: number,
  product: Product,
  workshop: Workshop,
): number {
  let currLevel = getProductLevel(product, workshop);
  do {
    currLevel++;
    if (currLevel > 100) {
      break;
    }
  } while (shouldUpgrade(target, true, true, product, workshop));
  return currLevel - 1;
}
