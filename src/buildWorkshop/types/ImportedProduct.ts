export type ImportedProduct = Readonly<{
  ProductType: string;
  ProductAmount: number;
  ConstructionPrice: number;
  ProductPrice: number;
  DiscoveryPrice: number;
  Type: string;
  Tags?: readonly string[];
  LeftResourceType?: string;
  LeftResourceAmount?: number;
  RightResourceType?: string;
  RightResourceAmount?: number;
  Optional?: boolean;
}>;
