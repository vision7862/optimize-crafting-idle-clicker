import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const ProductCycle: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Rubber', ProductAmount: 1, ConstructionPrice: 80, ProductPrice: 5, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Tire', ProductAmount: 1, LeftResourceType: 'Rubber', LeftResourceAmount: 1, ConstructionPrice: 900, ProductPrice: 30, DiscoveryPrice: 50, Type: 'SemiProduct' },
  { ProductType: 'Coal', ProductAmount: 3, ConstructionPrice: 7000, ProductPrice: 40, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 60000, ProductPrice: 350, DiscoveryPrice: 500, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 500000, ProductPrice: 400, DiscoveryPrice: 1000, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 10, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 3000000, ProductPrice: 500, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Steel', ProductAmount: 1, LeftResourceType: 'Coal', LeftResourceAmount: 4, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 40000000, ProductPrice: 20000, DiscoveryPrice: 5000, Type: 'Ingot' },
  { ProductType: 'Mechanical Parts', ProductAmount: 4, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 200000000, ProductPrice: 10000, DiscoveryPrice: 10000, Type: 'SemiProduct' },
  { ProductType: 'Small Wheel', ProductAmount: 1, LeftResourceType: 'Tire', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 4, ConstructionPrice: 1000000000, ProductPrice: 150000, DiscoveryPrice: 20000, Type: 'SemiProduct' },
  { ProductType: 'Large Wheel', ProductAmount: 1, LeftResourceType: 'Tire', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 8, ConstructionPrice: 5000000000, ProductPrice: 500000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Penny-Farthing Wheels', ProductAmount: 1, LeftResourceType: 'Small Wheel', LeftResourceAmount: 1, RightResourceType: 'Large Wheel', RightResourceAmount: 1, ConstructionPrice: 20000000000, ProductPrice: 2000000, DiscoveryPrice: 100000, Type: 'SemiProduct' },
  { ProductType: 'Penny-Farthing Frame', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 2, RightResourceType: 'Mechanical Parts', RightResourceAmount: 4, ConstructionPrice: 100000000000, ProductPrice: 4500000, DiscoveryPrice: 150000, Type: 'SemiProduct' },
  { ProductType: 'Penny-Farthing', ProductAmount: 1, LeftResourceType: 'Penny-Farthing Wheels', LeftResourceAmount: 1, RightResourceType: 'Penny-Farthing Frame', RightResourceAmount: 1, ConstructionPrice: 600000000000, ProductPrice: 25000000, DiscoveryPrice: 200000, Type: 'EarlyProduct' },
  { ProductType: 'Bicycle Wheel', ProductAmount: 1, LeftResourceType: 'Tire', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 6, ConstructionPrice: 3000000000000, ProductPrice: 60000000, DiscoveryPrice: 250000, Type: 'SemiProduct' },
  { ProductType: 'Bicycle Frame', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 3, RightResourceType: 'Mechanical Parts', RightResourceAmount: 6, ConstructionPrice: 25000000000000, ProductPrice: 400000000, DiscoveryPrice: 300000, Type: 'SemiProduct' },
  { ProductType: 'Bicycle', ProductAmount: 1, LeftResourceType: 'Bicycle Wheel', LeftResourceAmount: 2, RightResourceType: 'Bicycle Frame', RightResourceAmount: 1, ConstructionPrice: 150000000000000, ProductPrice: 2000000000, DiscoveryPrice: 350000, Type: 'LateProduct' },
  { ProductType: 'Motorcycle Wheel', ProductAmount: 1, LeftResourceType: 'Tire', LeftResourceAmount: 1, RightResourceType: 'Steel', RightResourceAmount: 2, ConstructionPrice: 600000000000000, ProductPrice: 4500000000, DiscoveryPrice: 400000, Type: 'SemiProduct' },
  { ProductType: 'Cylinder', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 4, ConstructionPrice: 2500000000000000, ProductPrice: 15000000000, DiscoveryPrice: 450000, Type: 'SemiProduct' },
  { ProductType: 'Crankshaft', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 1, ConstructionPrice: 9000000000000000, ProductPrice: 50000000000, DiscoveryPrice: 500000, Type: 'SemiProduct' },
  { ProductType: 'Single-Cylinder Engine', ProductAmount: 1, LeftResourceType: 'Cylinder', LeftResourceAmount: 1, RightResourceType: 'Crankshaft', RightResourceAmount: 1, ConstructionPrice: 45000000000000000, ProductPrice: 300000000000, DiscoveryPrice: 550000, Type: 'EarlyProduct' },
  { ProductType: 'Motorcycle Frame', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 10, RightResourceType: 'Steel', RightResourceAmount: 4, ConstructionPrice: 200000000000000000, ProductPrice: 900000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Motorcycle Chassis', ProductAmount: 1, LeftResourceType: 'Single-Cylinder Engine', LeftResourceAmount: 1, RightResourceType: 'Motorcycle Frame', RightResourceAmount: 1, ConstructionPrice: 1000000000000000000, ProductPrice: 5000000000000, DiscoveryPrice: 650000, Type: 'SemiProduct' },
  { ProductType: 'Motorcycle', ProductAmount: 1, LeftResourceType: 'Motorcycle Wheel', LeftResourceAmount: 2, RightResourceType: 'Motorcycle Chassis', RightResourceAmount: 1, ConstructionPrice: 5000000000000000000, ProductPrice: 20000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];