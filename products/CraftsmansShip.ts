import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const CraftsmansShip: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Paper', ProductAmount: 5, LeftResourceType: 'Wood', LeftResourceAmount: 1, ConstructionPrice: 100, ProductPrice: 2, DiscoveryPrice: 10, Type: 'EarlyProduct' },
  { ProductType: 'Ink', ProductAmount: 1, ConstructionPrice: 2000, ProductPrice: 50, DiscoveryPrice: 50, Type: 'Ore' },
  { ProductType: 'Map', ProductAmount: 1, LeftResourceType: 'Paper', LeftResourceAmount: 4, RightResourceType: 'Ink', RightResourceAmount: 1, ConstructionPrice: 20000, ProductPrice: 400, DiscoveryPrice: 100, Type: 'LateProduct' },
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 300000, ProductPrice: 1000, DiscoveryPrice: 200, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 2000000, ProductPrice: 2000, DiscoveryPrice: 500, Type: 'Ingot' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 20000000, ProductPrice: 30000, DiscoveryPrice: 1000, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 300000000, ProductPrice: 80000, DiscoveryPrice: 2000, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Iron Ore', LeftResourceAmount: 2, RightResourceType: 'Coal', RightResourceAmount: 3, ConstructionPrice: 1000000000, ProductPrice: 100000, DiscoveryPrice: 5000, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 7000000000, ProductPrice: 200000, DiscoveryPrice: 10000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 40000000000, ProductPrice: 3000000, DiscoveryPrice: 20000, Type: 'SemiProduct' },
  { ProductType: 'Spyglass', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 2, RightResourceType: 'Copper Ingots', RightResourceAmount: 1, ConstructionPrice: 500000000000, ProductPrice: 30000000, DiscoveryPrice: 50000, Type: 'EarlyProduct' },
  { ProductType: 'Steel', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 2, RightResourceType: 'Coal', RightResourceAmount: 4, ConstructionPrice: 3000000000000, ProductPrice: 100000000, DiscoveryPrice: 100000, Type: 'Ingot' },
  { ProductType: 'Compass', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 1, RightResourceType: 'Steel', RightResourceAmount: 1, ConstructionPrice: 20000000000000, ProductPrice: 500000000, DiscoveryPrice: 150000, Type: 'LateProduct' },
  { ProductType: 'Planks', ProductAmount: 4, LeftResourceType: 'Wood', LeftResourceAmount: 1, ConstructionPrice: 100000000000000, ProductPrice: 600000000, DiscoveryPrice: 200000, Type: 'Ingot' },
  { ProductType: 'Rowboat', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Planks', RightResourceAmount: 6, ConstructionPrice: 800000000000000, ProductPrice: 10000000000, DiscoveryPrice: 300000, Type: 'EarlyProduct' },
  { ProductType: 'Fabric', ProductAmount: 1, ConstructionPrice: 6000000000000000, ProductPrice: 40000000000, DiscoveryPrice: 400000, Type: 'Ore' },
  { ProductType: 'Sail', ProductAmount: 1, LeftResourceType: 'Fabric', LeftResourceAmount: 4, ConstructionPrice: 40000000000000000, ProductPrice: 400000000000, DiscoveryPrice: 500000, Type: 'SemiProduct' },
  { ProductType: 'Boat Hull', ProductAmount: 0.25, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Planks', RightResourceAmount: 5, ConstructionPrice: 100000000000000000, ProductPrice: 2000000000000, DiscoveryPrice: 650000, Type: 'SemiProduct' },
  { ProductType: 'Caravel', ProductAmount: 0.25, LeftResourceType: 'Boat Hull', LeftResourceAmount: 0.25, RightResourceType: 'Sail', RightResourceAmount: 0.5, ConstructionPrice: 1000000000000000000, ProductPrice: 10000000000000, DiscoveryPrice: 800000, Type: 'LateProduct' },
];
