type ProductDetails = Readonly<{
  name: string
  researchCost: number
  buildCost: number
  upgradeCostMultiplier?: number
  revenue: number
  outputCount: number
  input1: InputProduct | null
  input2: InputProduct | null
}>;

type InputProduct = Readonly<{
  product: ProductDetails
  count: number
}>;
