import { Product, ProductStatus } from '../../types/Product';
import { EventWorkshopStatus, Workshop, WorkshopStatus } from '../../types/Workshop';

export function getStatusMap(workshop: Workshop): Map<string, ProductStatus> {
  const statuses = new Map<string, ProductStatus>();
  for (const product of workshop.productsInfo) {
    statuses.set(product.details.name, product.status);
  }
  return statuses;
}

export function getProductByName(productName: string, productsInfo: readonly Product[]): Product {
  for (const product of productsInfo) {
    if (product.details.name === productName) {
      return product;
    }
  }
  throw new Error('Workshop does not contain ' + productName);
}

export function isEvent(workshopStatus: Partial<WorkshopStatus>): workshopStatus is EventWorkshopStatus {
  return (workshopStatus as EventWorkshopStatus).eventName !== undefined;
}
