import { getCurrentIncome } from '../shouldUpgrade';
import { Product, ProductStatus } from '../types/Product';
import { Workshop } from '../types/Workshop';

export function computeTargetFromFame(fame: number, level: number): number {
  return 10 ** (fame + level - 1);
}

export function filterOutSkipped(statuses: Map<string, ProductStatus>): Map<string, ProductStatus> {
  const filteredStatuses = new Map<string, ProductStatus>(statuses);
  for (const [productName, status] of filteredStatuses.entries()) {
    if (status.level === 0) {
      filteredStatuses.delete(productName);
    }
  }
  return filteredStatuses;
}

export function filterOutSkippedFullWorkshop(workshop: Workshop): Workshop {
  const filteredProducts = workshop.productsInfo.filter((product: Product) => product.status.level > 0);
  return {
    productsInfo: filteredProducts,
    workshopStatus: workshop.workshopStatus,
  };
}

export function computeBuildTimeForWorkshop(workshop: Workshop): number {
  const buildCycles = 0;
  for (let i = 0; i < workshop.productsInfo.length; i++) {
    if (workshop.productsInfo[i].status.level > 0) {
      // buildCycles += 1; // every product takes at
      const croppedProducts = workshop.productsInfo.slice(0, i);
      const incomeWithThisProductAsMax = getCurrentIncome(
        { productsInfo: croppedProducts, workshopStatus: workshop.workshopStatus },
        1,
      );
    }
  }
  return buildCycles;
}
