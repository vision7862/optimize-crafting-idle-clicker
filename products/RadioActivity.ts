import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const RadioActivity: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Rawhide', ProductAmount: 1, ConstructionPrice: 80, ProductPrice: 4, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Leather', ProductAmount: 3, LeftResourceType: 'Rawhide', LeftResourceAmount: 1, ConstructionPrice: 750, ProductPrice: 7, DiscoveryPrice: 50, Type: 'Ingot' },
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 6000, ProductPrice: 80, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 50000, ProductPrice: 150, DiscoveryPrice: 500, Type: 'Ingot' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 650000, ProductPrice: 1000, DiscoveryPrice: 1000, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 4500000, ProductPrice: 4000, DiscoveryPrice: 2000, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 50000000, ProductPrice: 5000, DiscoveryPrice: 5000, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 10, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 400000000, ProductPrice: 8000, DiscoveryPrice: 10000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 3000000000, ProductPrice: 250000, DiscoveryPrice: 25000, Type: 'SemiProduct' },
  { ProductType: 'Radio Casing', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 4, ConstructionPrice: 20000000000, ProductPrice: 3000000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Electrical Parts', ProductAmount: 2, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 150000000000, ProductPrice: 5000000, DiscoveryPrice: 75000, Type: 'SemiProduct' },
  { ProductType: 'Antenna', ProductAmount: 1, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 3, RightResourceType: 'Electrical Parts', RightResourceAmount: 4, ConstructionPrice: 1000000000000, ProductPrice: 60000000, DiscoveryPrice: 100000, Type: 'EarlyProduct' },
  { ProductType: 'Radio Parts', ProductAmount: 1, LeftResourceType: 'Electrical Parts', LeftResourceAmount: 6, RightResourceType: 'Antenna', RightResourceAmount: 1, ConstructionPrice: 9500000000000, ProductPrice: 400000000, DiscoveryPrice: 150000, Type: 'SemiProduct' },
  { ProductType: 'Radio', ProductAmount: 1, LeftResourceType: 'Radio Casing', LeftResourceAmount: 1, RightResourceType: 'Radio Parts', RightResourceAmount: 1, ConstructionPrice: 100000000000000, ProductPrice: 2000000000, DiscoveryPrice: 200000, Type: 'LateProduct' },
  { ProductType: 'Headphone', ProductAmount: 1, LeftResourceType: 'Leather', LeftResourceAmount: 1, RightResourceType: 'Electrical Parts', RightResourceAmount: 3, ConstructionPrice: 600000000000000, ProductPrice: 6000000000, DiscoveryPrice: 300000, Type: 'EarlyProduct' },
  { ProductType: 'Microphone', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 3, RightResourceType: 'Electrical Parts', RightResourceAmount: 3, ConstructionPrice: 4500000000000000, ProductPrice: 30000000000, DiscoveryPrice: 400000, Type: 'EarlyProduct' },
  { ProductType: 'Headset', ProductAmount: 1, LeftResourceType: 'Headphone', LeftResourceAmount: 1, RightResourceType: 'Microphone', RightResourceAmount: 1, ConstructionPrice: 30000000000000000, ProductPrice: 200000000000, DiscoveryPrice: 500000, Type: 'LateProduct' },
  { ProductType: 'Two-Way Radio', ProductAmount: 1, LeftResourceType: 'Radio', LeftResourceAmount: 1, RightResourceType: 'Headset', RightResourceAmount: 1, ConstructionPrice: 200000000000000000, ProductPrice: 800000000000, DiscoveryPrice: 600000, Type: 'LateProduct' },
  { ProductType: 'Walkie Talkie', ProductAmount: 1, LeftResourceType: 'Radio Parts', LeftResourceAmount: 1, RightResourceType: 'Microphone', RightResourceAmount: 1, ConstructionPrice: 1000000000000000000, ProductPrice: 5000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
