import { type ProductStatus, type Workshop } from './types/Workshop';

export function getStatusMap(workshop: Workshop): Map<string, ProductStatus> {
  const statuses = new Map<string, ProductStatus>();
  for (const product of workshop.productsInfo.values()) {
    statuses.set(product.details.name, product.status);
  }
  return statuses;
}
