export interface Workshop {
  products: Map<string, Product>
  statuses: Map<string, ProductStatus>
  event: boolean
  level: number
};

export interface ProductStatus {
  level: number
  merchants: number
}
