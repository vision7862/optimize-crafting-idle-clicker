interface ProductDetails {
  name: string
  researchCost: number
  buildCost: number
  upgradeCostMultiplier?: number
  revenue: number
  outputCount: number
  input1: InputProduct | null
  input2: InputProduct | null
};

interface InputProduct {
  product: ProductDetails
  count: number
}
