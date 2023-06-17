import { type ProductDetails } from './Product';

export type Workshop = Readonly<{
  productsInfo: readonly Product[]
  workshopStatus: WorkshopStatus
}>;

export type Product = Readonly<{
  details: ProductDetails
  status: ProductStatus
}>;

export type WorkshopStatus = Readonly<{
  event: boolean
  level: number
  scientists: number
}>;

export type ProductStatus = Readonly<{
  level: number
  merchants: number
}>;
