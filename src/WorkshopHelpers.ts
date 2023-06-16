import { type Product, type ProductStatus, type Workshop } from './types/Workshop';

export function getStatusMap(workshop: Workshop): Map<string, ProductStatus> {
  const statuses = new Map<string, ProductStatus>();
  for (const product of workshop.productsInfo.values()) {
    statuses.set(product.details.name, product.status);
  }
  return statuses;
}

export function getProductByName(productName: string, productsInfo: Map<string, Product>): Product {
  const product: Product | undefined = productsInfo.get(productName);
  if (product !== undefined) {
    return product;
  } else {
    throw new Error('Workshop does not contain ' + productName);
  }
}
