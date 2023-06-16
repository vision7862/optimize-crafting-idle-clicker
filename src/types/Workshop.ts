export type Workshop = Readonly<{
  products: Map<string, Product>
  statuses: Map<string, ProductStatus>
}> & WorkshopStatus;

export type WorkshopStatus = Readonly<{
  event: boolean
  level: number
  scientists: number
}>;

export interface ProductStatus {
  level: number
  merchants: number
}
