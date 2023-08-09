import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const LockNLoad: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 65, ProductPrice: 3, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 600, ProductPrice: 15, DiscoveryPrice: 50, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 7000, ProductPrice: 20, DiscoveryPrice: 100, Type: 'Ingot' },
  { ProductType: 'Stock', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, ConstructionPrice: 50000, ProductPrice: 300, DiscoveryPrice: 500, Type: 'SemiProduct' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 650000, ProductPrice: 400, DiscoveryPrice: 1000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 5000000, ProductPrice: 4500, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Trigger', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 1, ConstructionPrice: 30000000, ProductPrice: 30000, DiscoveryPrice: 5000, Type: 'SemiProduct' },
  { ProductType: 'Forestock', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, ConstructionPrice: 150000000, ProductPrice: 90000, DiscoveryPrice: 10000, Type: 'SemiProduct' },
  { ProductType: 'Steel', ProductAmount: 1, LeftResourceType: 'Coal', LeftResourceAmount: 4, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 800000000, ProductPrice: 250000, DiscoveryPrice: 20000, Type: 'Ingot' },
  { ProductType: 'Lever', ProductAmount: 2, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 7000000000, ProductPrice: 400000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Bolt', ProductAmount: 3, LeftResourceType: 'Steel', LeftResourceAmount: 1, ConstructionPrice: 55000000000, ProductPrice: 1500000, DiscoveryPrice: 100000, Type: 'SemiProduct' },
  { ProductType: 'Lever Action', ProductAmount: 1, LeftResourceType: 'Trigger', LeftResourceAmount: 1, RightResourceType: 'Lever', RightResourceAmount: 1, ConstructionPrice: 500000000000, ProductPrice: 20000000, DiscoveryPrice: 150000, Type: 'EarlyProduct' },
  { ProductType: 'Bolt Action', ProductAmount: 1, LeftResourceType: 'Trigger', LeftResourceAmount: 1, RightResourceType: 'Bolt', RightResourceAmount: 1, ConstructionPrice: 3000000000000, ProductPrice: 50000000, DiscoveryPrice: 200000, Type: 'EarlyProduct' },
  { ProductType: 'Pump Action', ProductAmount: 1, LeftResourceType: 'Trigger', LeftResourceAmount: 1, RightResourceType: 'Forestock', RightResourceAmount: 1, ConstructionPrice: 20000000000000, ProductPrice: 300000000, DiscoveryPrice: 250000, Type: 'EarlyProduct' },
  { ProductType: 'Weapon Parts', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 2, RightResourceType: 'Steel', RightResourceAmount: 1, ConstructionPrice: 80000000000000, ProductPrice: 700000000, DiscoveryPrice: 300000, Type: 'SemiProduct' },
  { ProductType: 'Rifle Parts', ProductAmount: 1, LeftResourceType: 'Stock', LeftResourceAmount: 1, RightResourceType: 'Weapon Parts', RightResourceAmount: 1, ConstructionPrice: 500000000000000, ProductPrice: 5000000000, DiscoveryPrice: 400000, Type: 'SemiProduct' },
  { ProductType: 'Lever Action Rifle', ProductAmount: 1, LeftResourceType: 'Lever Action', LeftResourceAmount: 1, RightResourceType: 'Rifle Parts', RightResourceAmount: 1, ConstructionPrice: 3000000000000000, ProductPrice: 25000000000, DiscoveryPrice: 500000, Type: 'LateProduct' },
  { ProductType: 'Bolt Action Rifle', ProductAmount: 1, LeftResourceType: 'Bolt Action', LeftResourceAmount: 1, RightResourceType: 'Rifle Parts', RightResourceAmount: 1, ConstructionPrice: 20000000000000000, ProductPrice: 100000000000, DiscoveryPrice: 600000, Type: 'LateProduct' },
  { ProductType: 'Pump Action Rifle', ProductAmount: 1, LeftResourceType: 'Pump Action', LeftResourceAmount: 1, RightResourceType: 'Rifle Parts', RightResourceAmount: 1, ConstructionPrice: 100000000000000000, ProductPrice: 450000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
