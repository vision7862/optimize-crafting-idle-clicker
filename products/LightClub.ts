import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const LightClub: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 80, ProductPrice: 4, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 700, ProductPrice: 8, DiscoveryPrice: 50, Type: 'Ingot' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 6000, ProductPrice: 100, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 50000, ProductPrice: 400, DiscoveryPrice: 500, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 600000, ProductPrice: 600, DiscoveryPrice: 1000, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 5000000, ProductPrice: 1500, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 40000000, ProductPrice: 20000, DiscoveryPrice: 5000, Type: 'SemiProduct' },
  { ProductType: 'Quartz', ProductAmount: 1, ConstructionPrice: 500000000, ProductPrice: 300000, DiscoveryPrice: 10000, Type: 'Ore' },
  { ProductType: 'Glass', ProductAmount: 1, LeftResourceType: 'Quartz', LeftResourceAmount: 1, ConstructionPrice: 6000000000, ProductPrice: 2000000, DiscoveryPrice: 25000, Type: 'Ingot' },
  { ProductType: 'Tungsten', ProductAmount: 1, ConstructionPrice: 40000000000, ProductPrice: 5000000, DiscoveryPrice: 50000, Type: 'Ore' },
  { ProductType: 'Filament', ProductAmount: 4, LeftResourceType: 'Tungsten', LeftResourceAmount: 1, ConstructionPrice: 500000000000, ProductPrice: 9000000, DiscoveryPrice: 75000, Type: 'SemiProduct' },
  { ProductType: 'Light Bulb', ProductAmount: 3, LeftResourceType: 'Glass', LeftResourceAmount: 1, RightResourceType: 'Filament', RightResourceAmount: 3, ConstructionPrice: 3000000000000, ProductPrice: 50000000, DiscoveryPrice: 100000, Type: 'SemiProduct' },
  { ProductType: 'Electrical Parts', ProductAmount: 2, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 25000000000000, ProductPrice: 300000000, DiscoveryPrice: 150000, Type: 'SemiProduct' },
  { ProductType: 'Lamp Casing', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 2, RightResourceType: 'Electrical Parts', RightResourceAmount: 2, ConstructionPrice: 200000000000000, ProductPrice: 5000000000, DiscoveryPrice: 200000, Type: 'SemiProduct' },
  { ProductType: 'Lamp', ProductAmount: 1, LeftResourceType: 'Lamp Casing', LeftResourceAmount: 1, RightResourceType: 'Light Bulb', RightResourceAmount: 1, ConstructionPrice: 1500000000000000, ProductPrice: 30000000000, DiscoveryPrice: 250000, Type: 'EarlyProduct' },
  { ProductType: 'Red Glass', ProductAmount: 1, LeftResourceType: 'Quartz', LeftResourceAmount: 1, ConstructionPrice: 10000000000000000, ProductPrice: 90000000000, DiscoveryPrice: 300000, Type: 'Ingot' },
  { ProductType: 'Red Light Bulb', ProductAmount: 3, LeftResourceType: 'Red Glass', LeftResourceAmount: 1, RightResourceType: 'Filament', RightResourceAmount: 3, ConstructionPrice: 60000000000000000, ProductPrice: 100000000000, DiscoveryPrice: 350000, Type: 'SemiProduct' },
  { ProductType: 'Infrared Lamp', ProductAmount: 1, LeftResourceType: 'Lamp Casing', LeftResourceAmount: 1, RightResourceType: 'Red Light Bulb', RightResourceAmount: 1, ConstructionPrice: 250000000000000000, ProductPrice: 550000000000, DiscoveryPrice: 400000, Type: 'EarlyProduct' },
  { ProductType: 'Shutters', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 6, ConstructionPrice: 1000000000000000000, ProductPrice: 1500000000000, DiscoveryPrice: 500000, Type: 'SemiProduct' },
  { ProductType: 'Signal Lamp', ProductAmount: 1, LeftResourceType: 'Lamp', LeftResourceAmount: 1, RightResourceType: 'Shutters', RightResourceAmount: 1, ConstructionPrice: 5000000000000000000, ProductPrice: 6000000000000, DiscoveryPrice: 600000, Type: 'LateProduct' },
  { ProductType: 'Flashlight', ProductAmount: 1, LeftResourceType: 'Light Bulb', LeftResourceAmount: 1, RightResourceType: 'Electrical Parts', RightResourceAmount: 4, ConstructionPrice: 20000000000000000000, ProductPrice: 10000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
