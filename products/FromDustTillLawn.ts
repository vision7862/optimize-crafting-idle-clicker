import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const FromDustTillLawn: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Coal', ProductAmount: 3, ConstructionPrice: 80, ProductPrice: 2, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 1000, ProductPrice: 40, DiscoveryPrice: 50, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 15000, ProductPrice: 60, DiscoveryPrice: 100, Type: 'Ingot' },
  { ProductType: 'Hedge Trimmer', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Iron Ingots', RightResourceAmount: 1, ConstructionPrice: 200000, ProductPrice: 700, DiscoveryPrice: 500, Type: 'EarlyProduct' },
  { ProductType: 'Tiki Torch', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Ingots', RightResourceAmount: 1, ConstructionPrice: 2500000, ProductPrice: 5000, DiscoveryPrice: 1000, Type: 'EarlyProduct' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 20000000, ProductPrice: 6000, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 300000000, ProductPrice: 90000, DiscoveryPrice: 5000, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 2000000000, ProductPrice: 150000, DiscoveryPrice: 10000, Type: 'Ingot' },
  { ProductType: 'Electrical Parts', ProductAmount: 2, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 15000000000, ProductPrice: 1000000, DiscoveryPrice: 25000, Type: 'SemiProduct' },
  { ProductType: 'Light Bulb', ProductAmount: 1, LeftResourceType: 'Electrical Parts', LeftResourceAmount: 2, ConstructionPrice: 90000000000, ProductPrice: 9000000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Lamp Casing', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, RightResourceType: 'Electrical Parts', RightResourceAmount: 4, ConstructionPrice: 1000000000000, ProductPrice: 50000000, DiscoveryPrice: 100000, Type: 'SemiProduct' },
  { ProductType: 'Lamp', ProductAmount: 1, LeftResourceType: 'Lamp Casing', LeftResourceAmount: 1, RightResourceType: 'Light Bulb', RightResourceAmount: 1, ConstructionPrice: 8000000000000, ProductPrice: 400000000, DiscoveryPrice: 150000, Type: 'EarlyProduct' },
  { ProductType: 'Steel', ProductAmount: 1, LeftResourceType: 'Coal', LeftResourceAmount: 4, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 150000000000000, ProductPrice: 2000000000, DiscoveryPrice: 200000, Type: 'Ingot' },
  { ProductType: 'Garden Lantern', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 1, RightResourceType: 'Lamp', RightResourceAmount: 1, ConstructionPrice: 800000000000000, ProductPrice: 9000000000, DiscoveryPrice: 300000, Type: 'LateProduct' },
  { ProductType: 'Electric Motor', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, RightResourceType: 'Electrical Parts', RightResourceAmount: 3, ConstructionPrice: 6000000000000000, ProductPrice: 40000000000, DiscoveryPrice: 400000, Type: 'SemiProduct' },
  { ProductType: 'Lawn Edge Trimmer', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 2, RightResourceType: 'Electric Motor', RightResourceAmount: 1, ConstructionPrice: 40000000000000000, ProductPrice: 300000000000, DiscoveryPrice: 500000, Type: 'LateProduct' },
  { ProductType: 'Lawn Mower', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 3, RightResourceType: 'Electric Motor', RightResourceAmount: 1, ConstructionPrice: 500000000000000000, ProductPrice: 2000000000000, DiscoveryPrice: 600000, Type: 'LateProduct' },
];
