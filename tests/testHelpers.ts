import { type ProductDetails } from '../src/types/Product';
import { type Product, type ProductStatus, type Workshop } from '../src/types/Workshop';

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

const DEFAULT_PRODUCT: Product = {
  details: DEFAULT_PRODUCT_DETAILS,
  status: DEFAULT_STATUS,
};

// const DEFAULT_STATUSES: Map<string, ProductStatus> = new Map<string, ProductStatus>().set(DEFAULT_PRODUCT_DETAILS.name, DEFAULT_STATUS);

const products = [[DEFAULT_PRODUCT_DETAILS.name, DEFAULT_PRODUCT]] as const;
const DEFAULT_PRODUCTS_INFO: Map<string, Product> = new Map<string, Product>(products);

export const DEFAULT_WORKSHOP: Workshop = {
  productsInfo: DEFAULT_PRODUCTS_INFO,
  workshopStatus: {
    event: true,
    level: 0,
    scientists: 0,
  },
};

export function getWorkshop(product: ProductDetails, level: number): Workshop {
  const status: ProductStatus = {
    ...DEFAULT_STATUS,
    level,
  };
  return {
    ...DEFAULT_WORKSHOP,
    productsInfo: new Map(DEFAULT_PRODUCTS_INFO).set(product.name, { details: product, status }),
  };
}
