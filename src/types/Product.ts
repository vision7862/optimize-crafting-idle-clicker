export type Product = Readonly<{
  details: ProductDetails;
  status: ProductStatus;
}>;

export type ProductDetails = Readonly<{
  name: string;
  researchCost: number;
  buildCost: number;
  upgradeCostMultiplier: number;
  revenue: number;
  outputCount: number;
  input1: InputProduct | null;
  input2: InputProduct | null;
}>;

export type InputProduct = Readonly<{
  name: string;
  count: number;
}>;

export type ProductStatus = Readonly<{
  level: number;
  merchants: number;
}>;
