import { type Product, type ProductDetails, type ProductStatus } from '../src/types/Product';
import { DEFAULT_WORKSHOP_STATUS_MAIN, type Workshop } from '../src/types/Workshop';

export const DEFAULT_PRODUCT_DETAILS: ProductDetails = {
  name: 'product_name',
  researchCost: 2,
  buildCost: 3.5e18,
  revenue: 1.5e18,
  outputCount: 1,
  input1: null,
  input2: null,
};

// const DEFAULT_PRODUCTS: Map<string, ProductDetails> = new Map<string, ProductDetails>().set(DEFAULT_PRODUCT_DETAILS.name, DEFAULT_PRODUCT_DETAILS);

const DEFAULT_STATUS: ProductStatus = {
  level: 0,
  merchants: 0,
};

export const DEFAULT_PRODUCT: Product = {
  details: DEFAULT_PRODUCT_DETAILS,
  status: DEFAULT_STATUS,
};

// const DEFAULT_STATUSES: Map<string, ProductStatus> = new Map<string, ProductStatus>().set(DEFAULT_PRODUCT_DETAILS.name, DEFAULT_STATUS);

const DEFAULT_PRODUCTS_INFO: Product[] = new Array<Product>(DEFAULT_PRODUCT);

export const DEFAULT_WORKSHOP: Workshop = {
  productsInfo: DEFAULT_PRODUCTS_INFO,
  workshopStatus: DEFAULT_WORKSHOP_STATUS_MAIN,
};

export function getWorkshop(product: ProductDetails, level: number): Workshop {
  const status: ProductStatus = {
    ...DEFAULT_STATUS,
    level,
  };
  const productsInfo: Product[] = new Array<Product>(...DEFAULT_PRODUCTS_INFO);
  productsInfo.splice(0, 1, { details: product, status });
  return {
    ...DEFAULT_WORKSHOP,
    productsInfo,
  };
}
