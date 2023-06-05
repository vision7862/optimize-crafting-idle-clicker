export interface Workshop {
  products: Map<string, Product>
  statuses: Map<string, ProductStatus>
};

export interface ProductStatus {
  level: number
  merchants: number
}
