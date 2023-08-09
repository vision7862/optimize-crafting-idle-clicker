import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const IdleFlicker: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 80, ProductPrice: 4, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 700, ProductPrice: 8, DiscoveryPrice: 50, Type: 'Ingot' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 6000, ProductPrice: 90, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 50000, ProductPrice: 300, DiscoveryPrice: 500, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 600000, ProductPrice: 500, DiscoveryPrice: 1000, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 5000000, ProductPrice: 2000, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 60000000, ProductPrice: 15000, DiscoveryPrice: 5000, Type: 'SemiProduct' },
  { ProductType: 'Quartz', ProductAmount: 1, ConstructionPrice: 500000000, ProductPrice: 200000, DiscoveryPrice: 10000, Type: 'Ore' },
  { ProductType: 'Glass', ProductAmount: 1, LeftResourceType: 'Quartz', LeftResourceAmount: 1, ConstructionPrice: 6000000000, ProductPrice: 1000000, DiscoveryPrice: 25000, Type: 'Ingot' },
  { ProductType: 'Electrical Parts', ProductAmount: 2, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 50000000000, ProductPrice: 2000000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Projector Lens', ProductAmount: 3, LeftResourceType: 'Glass', LeftResourceAmount: 1, ConstructionPrice: 400000000000, ProductPrice: 6000000, DiscoveryPrice: 75000, Type: 'SemiProduct' },
  { ProductType: 'Arc Lamp', ProductAmount: 1, LeftResourceType: 'Glass', LeftResourceAmount: 1, RightResourceType: 'Electrical Parts', RightResourceAmount: 2, ConstructionPrice: 2000000000000, ProductPrice: 70000000, DiscoveryPrice: 100000, Type: 'EarlyProduct' },
  { ProductType: 'Projector Parts', ProductAmount: 1, LeftResourceType: 'Projector Lens', LeftResourceAmount: 1, RightResourceType: 'Arc Lamp', RightResourceAmount: 1, ConstructionPrice: 15000000000000, ProductPrice: 500000000, DiscoveryPrice: 150000, Type: 'SemiProduct' },
  { ProductType: 'Movie Projector', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 6, RightResourceType: 'Projector Parts', RightResourceAmount: 1, ConstructionPrice: 100000000000000, ProductPrice: 2500000000, DiscoveryPrice: 200000, Type: 'LateProduct' },
  { ProductType: 'Antenna', ProductAmount: 1, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 3, RightResourceType: 'Electrical Parts', RightResourceAmount: 4, ConstructionPrice: 700000000000000, ProductPrice: 9000000000, DiscoveryPrice: 300000, Type: 'EarlyProduct' },
  { ProductType: 'TV Casing', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 8, RightResourceType: 'Antenna', RightResourceAmount: 1, ConstructionPrice: 6000000000000000, ProductPrice: 50000000000, DiscoveryPrice: 400000, Type: 'SemiProduct' },
  { ProductType: 'Cathode Ray Tube', ProductAmount: 1, LeftResourceType: 'Glass', LeftResourceAmount: 1, RightResourceType: 'Electrical Parts', RightResourceAmount: 4, ConstructionPrice: 50000000000000000, ProductPrice: 300000000000, DiscoveryPrice: 500000, Type: 'SemiProduct' },
  { ProductType: 'TV Components', ProductAmount: 1, LeftResourceType: 'Glass', LeftResourceAmount: 2, RightResourceType: 'Cathode Ray Tube', RightResourceAmount: 1, ConstructionPrice: 600000000000000000, ProductPrice: 2000000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'TV Set', ProductAmount: 1, LeftResourceType: 'TV Casing', LeftResourceAmount: 1, RightResourceType: 'TV Components', RightResourceAmount: 1, ConstructionPrice: 4000000000000000000, ProductPrice: 10000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
