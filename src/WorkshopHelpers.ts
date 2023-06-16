import { type ProductStatus, type Workshop } from './types/Workshop';

export function getProductLevel(product: ProductDetails, workshop: Workshop): number {
  const productStatus: ProductStatus | undefined = workshop.statuses.get(product.name);
  if (productStatus != null) {
    return productStatus.level;
  } else {
    throw new Error('product ' + product.name + ' does not have a status.');
  }
}
