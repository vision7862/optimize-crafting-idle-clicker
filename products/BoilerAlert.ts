import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const BoilerAlert: ImportedProduct[] = [
  { ProductType: 'Coal', ProductAmount: 3, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 2, ConstructionPrice: 200, ProductPrice: 5, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Iron Ore', LeftResourceAmount: 2, RightResourceType: 'Coal', RightResourceAmount: 3, ConstructionPrice: 2000, ProductPrice: 20, DiscoveryPrice: 50, Type: 'Ingot' },
  { ProductType: 'Water Tank', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 2, ConstructionPrice: 30000, ProductPrice: 400, DiscoveryPrice: 100, Type: 'SemiProduct' },
  { ProductType: 'Cylinder', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 300000, ProductPrice: 1000, DiscoveryPrice: 500, Type: 'SemiProduct' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 2000000, ProductPrice: 700, DiscoveryPrice: 1000, Type: 'SemiProduct' },
  { ProductType: 'Boiler', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 4, RightResourceType: 'Iron Rivets', RightResourceAmount: 10, ConstructionPrice: 10000000, ProductPrice: 20000, DiscoveryPrice: 5000, Type: 'EarlyProduct' },
  { ProductType: 'Iron Pipes', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 100000000, ProductPrice: 40000, DiscoveryPrice: 10000, Type: 'SemiProduct' },
  { ProductType: 'Steel', ProductAmount: 1, LeftResourceType: 'Coal', LeftResourceAmount: 4, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 900000000, ProductPrice: 200000, DiscoveryPrice: 20000, Type: 'Ingot' },
  { ProductType: 'Machine Parts', ProductAmount: 2, LeftResourceType: 'Steel', LeftResourceAmount: 1, ConstructionPrice: 8000000000, ProductPrice: 600000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Piston', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, RightResourceType: 'Machine Parts', RightResourceAmount: 1, ConstructionPrice: 50000000000, ProductPrice: 5000000, DiscoveryPrice: 100000, Type: 'SemiProduct' },
  { ProductType: 'Water Pump', ProductAmount: 1, LeftResourceType: 'Water Tank', LeftResourceAmount: 1, RightResourceType: 'Iron Pipes', RightResourceAmount: 2, ConstructionPrice: 500000000000, ProductPrice: 30000000, DiscoveryPrice: 150000, Type: 'EarlyProduct' },
  { ProductType: 'Motor Unit', ProductAmount: 1, LeftResourceType: 'Cylinder', LeftResourceAmount: 1, RightResourceType: 'Piston', RightResourceAmount: 1, ConstructionPrice: 4000000000000, ProductPrice: 100000000, DiscoveryPrice: 200000, Type: 'SemiProduct' },
  { ProductType: 'Engine Components', ProductAmount: 1, LeftResourceType: 'Boiler', LeftResourceAmount: 1, RightResourceType: 'Motor Unit', RightResourceAmount: 1, ConstructionPrice: 30000000000000, ProductPrice: 500000000, DiscoveryPrice: 250000, Type: 'SemiProduct' },
  { ProductType: 'Steam Engine', ProductAmount: 1, LeftResourceType: 'Water Pump', LeftResourceAmount: 1, RightResourceType: 'Engine Components', RightResourceAmount: 1, ConstructionPrice: 200000000000000, ProductPrice: 3000000000, DiscoveryPrice: 300000, Type: 'LateProduct' },
  { ProductType: 'Steel Beam', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 5, ConstructionPrice: 900000000000000, ProductPrice: 10000000000, DiscoveryPrice: 400000, Type: 'SemiProduct' },
  { ProductType: 'Wheel', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 2, RightResourceType: 'Machine Parts', RightResourceAmount: 4, ConstructionPrice: 7000000000000000, ProductPrice: 40000000000, DiscoveryPrice: 500000, Type: 'SemiProduct' },
  { ProductType: 'Balanced Beam', ProductAmount: 1, LeftResourceType: 'Steel Beam', LeftResourceAmount: 1, RightResourceType: 'Wheel', RightResourceAmount: 1, ConstructionPrice: 50000000000000000, ProductPrice: 300000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Beam Engine', ProductAmount: 1, LeftResourceType: 'Steam Engine', LeftResourceAmount: 1, RightResourceType: 'Balanced Beam', RightResourceAmount: 1, ConstructionPrice: 300000000000000000, ProductPrice: 1000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
