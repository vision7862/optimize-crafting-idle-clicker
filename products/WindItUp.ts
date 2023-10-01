import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const WindItUp: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Flute', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, ConstructionPrice: 80, ProductPrice: 5, DiscoveryPrice: 10, Type: 'EarlyProduct' },
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 750, ProductPrice: 25, DiscoveryPrice: 50, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 6000, ProductPrice: 50, DiscoveryPrice: 100, Type: 'Ingot' },
  { ProductType: 'Horn', ProductAmount: 1, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 2, ConstructionPrice: 55000, ProductPrice: 400, DiscoveryPrice: 500, Type: 'EarlyProduct' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 600000, ProductPrice: 600, DiscoveryPrice: 1000, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 3000000, ProductPrice: 3000, DiscoveryPrice: 2000, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 35000000, ProductPrice: 4000, DiscoveryPrice: 5000, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 200000000, ProductPrice: 9000, DiscoveryPrice: 10000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 1500000000, ProductPrice: 200000, DiscoveryPrice: 20000, Type: 'SemiProduct' },
  { ProductType: 'Piston Valves', ProductAmount: 2, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 2, ConstructionPrice: 10000000000, ProductPrice: 1000000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Trumpet Tube', ProductAmount: 1, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 3, ConstructionPrice: 80000000000, ProductPrice: 8000000, DiscoveryPrice: 100000, Type: 'SemiProduct' },
  { ProductType: 'Trumpet', ProductAmount: 1, LeftResourceType: 'Piston Valves', LeftResourceAmount: 3, RightResourceType: 'Trumpet Tube', RightResourceAmount: 1, ConstructionPrice: 900000000000, ProductPrice: 50000000, DiscoveryPrice: 150000, Type: 'EarlyProduct' },
  { ProductType: 'Tuba Tube', ProductAmount: 1, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 5, ConstructionPrice: 7000000000000, ProductPrice: 300000000, DiscoveryPrice: 200000, Type: 'SemiProduct' },
  { ProductType: 'Tuba', ProductAmount: 1, LeftResourceType: 'Piston Valves', LeftResourceAmount: 5, RightResourceType: 'Tuba Tube', RightResourceAmount: 1, ConstructionPrice: 80000000000000, ProductPrice: 2000000000, DiscoveryPrice: 250000, Type: 'LateProduct' },
  { ProductType: 'Keys', ProductAmount: 10, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 5, ConstructionPrice: 500000000000000, ProductPrice: 500000000, DiscoveryPrice: 300000, Type: 'SemiProduct' },
  { ProductType: 'Clarinet Body', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, ConstructionPrice: 4000000000000000, ProductPrice: 40000000000, DiscoveryPrice: 400000, Type: 'SemiProduct' },
  { ProductType: 'Clarinet', ProductAmount: 1, LeftResourceType: 'Keys', LeftResourceAmount: 17, RightResourceType: 'Clarinet Body', RightResourceAmount: 1, ConstructionPrice: 30000000000000000, ProductPrice: 300000000000, DiscoveryPrice: 500000, Type: 'LateProduct' },
  { ProductType: 'Saxophone Body', ProductAmount: 1, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 4, ConstructionPrice: 400000000000000000, ProductPrice: 1000000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Saxophone', ProductAmount: 1, LeftResourceType: 'Keys', LeftResourceAmount: 23, RightResourceType: 'Saxophone Body', RightResourceAmount: 1, ConstructionPrice: 2500000000000000000, ProductPrice: 7000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
