import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const StockMyFridgeUp: ImportedProduct[] = [
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 80, ProductPrice: 2, DiscoveryPrice: 10, Type: 'Ingot' },
  { ProductType: 'Coal', ProductAmount: 3, ConstructionPrice: 900, ProductPrice: 10, DiscoveryPrice: 50, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 8000, ProductPrice: 150, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 60000, ProductPrice: 200, DiscoveryPrice: 500, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 700000, ProductPrice: 500, DiscoveryPrice: 1000, Type: 'SemiProduct' },
  { ProductType: 'Kettle', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 4, RightResourceType: 'Iron Rivets', RightResourceAmount: 4, ConstructionPrice: 5000000, ProductPrice: 8000, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Gridiron', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 2, ConstructionPrice: 60000000, ProductPrice: 30000, DiscoveryPrice: 5000, Type: 'SemiProduct' },
  { ProductType: 'Kettle Grill', ProductAmount: 1, LeftResourceType: 'Kettle', LeftResourceAmount: 1, RightResourceType: 'Gridiron', RightResourceAmount: 1, ConstructionPrice: 300000000, ProductPrice: 90000, DiscoveryPrice: 10000, Type: 'EarlyProduct' },
  { ProductType: 'Steel', ProductAmount: 1, LeftResourceType: 'Coal', LeftResourceAmount: 4, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 2500000000, ProductPrice: 400000, DiscoveryPrice: 25000, Type: 'Ingot' },
  { ProductType: 'Refrigerator Casing', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 4, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 10000000000, ProductPrice: 3000000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Electrical Parts', ProductAmount: 2, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 65000000000, ProductPrice: 2000000, DiscoveryPrice: 75000, Type: 'SemiProduct' },
  { ProductType: 'Heat Pump', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 3, RightResourceType: 'Electrical Parts', RightResourceAmount: 4, ConstructionPrice: 400000000000, ProductPrice: 20000000, DiscoveryPrice: 100000, Type: 'EarlyProduct' },
  { ProductType: 'Refrigerator', ProductAmount: 1, LeftResourceType: 'Refrigerator Casing', LeftResourceAmount: 1, RightResourceType: 'Heat Pump', RightResourceAmount: 1, ConstructionPrice: 2000000000000, ProductPrice: 70000000, DiscoveryPrice: 150000, Type: 'LateProduct' },
  { ProductType: 'Cooktop', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 4, RightResourceType: 'Electrical Parts', RightResourceAmount: 8, ConstructionPrice: 20000000000000, ProductPrice: 300000000, DiscoveryPrice: 200000, Type: 'SemiProduct' },
  { ProductType: 'Oven Casing', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 4, RightResourceType: 'Iron Rivets', RightResourceAmount: 6, ConstructionPrice: 70000000000000, ProductPrice: 700000000, DiscoveryPrice: 300000, Type: 'SemiProduct' },
  { ProductType: 'Heating Element', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 2, RightResourceType: 'Electrical Parts', RightResourceAmount: 4, ConstructionPrice: 500000000000000, ProductPrice: 5000000000, DiscoveryPrice: 400000, Type: 'EarlyProduct' },
  { ProductType: 'Oven Parts', ProductAmount: 1, LeftResourceType: 'Gridiron', LeftResourceAmount: 2, RightResourceType: 'Heating Element', RightResourceAmount: 1, ConstructionPrice: 4000000000000000, ProductPrice: 30000000000, DiscoveryPrice: 500000, Type: 'SemiProduct' },
  { ProductType: 'Oven', ProductAmount: 1, LeftResourceType: 'Oven Casing', LeftResourceAmount: 1, RightResourceType: 'Oven Parts', RightResourceAmount: 1, ConstructionPrice: 30000000000000000, ProductPrice: 200000000000, DiscoveryPrice: 600000, Type: 'EarlyProduct' },
  { ProductType: 'Stove', ProductAmount: 1, LeftResourceType: 'Oven', LeftResourceAmount: 1, RightResourceType: 'Cooktop', RightResourceAmount: 1, ConstructionPrice: 400000000000000000, ProductPrice: 1000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
