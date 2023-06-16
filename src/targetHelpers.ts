import { type ProductStatus } from './types/Workshop';

export function computeTargetFromFame(fame: number, level: number): number {
  return 10 ** (fame + level - 1);
}

export function getCostOfScientists(numScientists: number): number {
  let cost = 0;
  for (let i = 2; i <= numScientists; i++) {
    cost += Math.round(50 * (1.15 ** (i - 2)));
  }
  return cost;
}

export function filterOutSkipped(statuses: Map<string, ProductStatus>): Map<string, ProductStatus> {
  const filteredStatuses = new Map<string, ProductStatus>(statuses);
  for (const [productName, status] of filteredStatuses.entries()) {
    if (status.level === 0) {
      filteredStatuses.delete(productName);
    }
  };
  return filteredStatuses;
}
