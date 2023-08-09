import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const CommonLens: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Quartz', ProductAmount: 1, ConstructionPrice: 70, ProductPrice: 4, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Glass', ProductAmount: 1, LeftResourceType: 'Quartz', LeftResourceAmount: 1, ConstructionPrice: 600, ProductPrice: 20, DiscoveryPrice: 50, Type: 'Ingot' },
  { ProductType: 'Kaleidoscope', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Glass', RightResourceAmount: 1, ConstructionPrice: 5000, ProductPrice: 30, DiscoveryPrice: 100, Type: 'EarlyProduct' },
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 30000, ProductPrice: 200, DiscoveryPrice: 500, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 400000, ProductPrice: 300, DiscoveryPrice: 1000, Type: 'Ingot' },
  { ProductType: 'Lens', ProductAmount: 5, LeftResourceType: 'Glass', LeftResourceAmount: 1, ConstructionPrice: 3000000, ProductPrice: 700, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Spyglass', ProductAmount: 1, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 1, RightResourceType: 'Lens', RightResourceAmount: 2, ConstructionPrice: 40000000, ProductPrice: 20000, DiscoveryPrice: 5000, Type: 'EarlyProduct' },
  { ProductType: 'Binoculars', ProductAmount: 1, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 1, RightResourceType: 'Lens', RightResourceAmount: 4, ConstructionPrice: 200000000, ProductPrice: 60000, DiscoveryPrice: 10000, Type: 'LateProduct' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 1500000000, ProductPrice: 400000, DiscoveryPrice: 20000, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 10000000000, ProductPrice: 2000000, DiscoveryPrice: 50000, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 85000000000, ProductPrice: 4000000, DiscoveryPrice: 100000, Type: 'Ingot' },
  { ProductType: 'Telescope', ProductAmount: 1, LeftResourceType: 'Lens', LeftResourceAmount: 2, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 800000000000, ProductPrice: 40000000, DiscoveryPrice: 150000, Type: 'EarlyProduct' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 6500000000000, ProductPrice: 50000000, DiscoveryPrice: 200000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 50000000000000, ProductPrice: 500000000, DiscoveryPrice: 250000, Type: 'SemiProduct' },
  { ProductType: 'Microscope', ProductAmount: 1, LeftResourceType: 'Lens', LeftResourceAmount: 2, RightResourceType: 'Mechanical Parts', RightResourceAmount: 2, ConstructionPrice: 300000000000000, ProductPrice: 4000000000, DiscoveryPrice: 300000, Type: 'LateProduct' },
  { ProductType: 'Camera', ProductAmount: 1, LeftResourceType: 'Lens', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 4, ConstructionPrice: 2000000000000000, ProductPrice: 20000000000, DiscoveryPrice: 400000, Type: 'LateProduct' },
  { ProductType: 'Silver Ore', ProductAmount: 1, ConstructionPrice: 10000000000000000, ProductPrice: 40000000000, DiscoveryPrice: 500000, Type: 'Ore' },
  { ProductType: 'Photographic Plate', ProductAmount: 1, LeftResourceType: 'Glass', LeftResourceAmount: 1, RightResourceType: 'Silver Ore', RightResourceAmount: 1, ConstructionPrice: 50000000000000000, ProductPrice: 200000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Photograph', ProductAmount: 5, LeftResourceType: 'Camera', LeftResourceAmount: 1, RightResourceType: 'Photographic Plate', RightResourceAmount: 5, ConstructionPrice: 400000000000000000, ProductPrice: 300000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
