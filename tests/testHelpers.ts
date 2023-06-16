import { type ProductStatus, type Workshop } from '../src/types/Workshop';

export const DEFAULT_PRODUCT: ProductDetails = {
  name: 'product_name',
  researchCost: 2,
  buildCost: 3.5e18,
  revenue: 1.5e18,
  outputCount: 1,
  input1: null,
  input2: null,
};

const DEFAULT_PRODUCTS: Map<string, ProductDetails> = new Map<string, ProductDetails>().set(DEFAULT_PRODUCT.name, DEFAULT_PRODUCT);

const DEFAULT_STATUS: ProductStatus = {
  level: 0,
  merchants: 0,
};

const DEFAULT_STATUSES: Map<string, ProductStatus> = new Map<string, ProductStatus>().set(DEFAULT_PRODUCT.name, DEFAULT_STATUS);

export const DEFAULT_WORKSHOP: Workshop = {
  products: DEFAULT_PRODUCTS,
  statuses: DEFAULT_STATUSES,
};

export function getWorkshop(product: ProductDetails, level: number): Workshop {
  const status: ProductStatus = {
    ...DEFAULT_STATUS,
    level,
  };
  return {
    ...DEFAULT_WORKSHOP,
    products: DEFAULT_PRODUCTS.set(product.name, product),
    statuses: DEFAULT_STATUSES.set(product.name, status),
  };
}
