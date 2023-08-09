import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const StringProcessing: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Rawhide', ProductAmount: 1, ConstructionPrice: 80, ProductPrice: 5, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 700, ProductPrice: 20, DiscoveryPrice: 50, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 6000, ProductPrice: 100, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 50000, ProductPrice: 150, DiscoveryPrice: 500, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 600000, ProductPrice: 450, DiscoveryPrice: 1000, Type: 'SemiProduct' },
  { ProductType: 'Strings', ProductAmount: 12, LeftResourceType: 'Rawhide', LeftResourceAmount: 1, ConstructionPrice: 7000000, ProductPrice: 500, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 60000000, ProductPrice: 15000, DiscoveryPrice: 5000, Type: 'SemiProduct' },
  { ProductType: 'Harp Frame', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Mechanical Parts', RightResourceAmount: 6, ConstructionPrice: 450000000, ProductPrice: 250000, DiscoveryPrice: 10000, Type: 'SemiProduct' },
  { ProductType: 'Harp', ProductAmount: 1, LeftResourceType: 'Strings', LeftResourceAmount: 40, RightResourceType: 'Harp Frame', RightResourceAmount: 1, ConstructionPrice: 5500000000, ProductPrice: 900000, DiscoveryPrice: 20000, Type: 'EarlyProduct' },
  { ProductType: 'Viola Frame', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, ConstructionPrice: 40000000000, ProductPrice: 4000000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Viola Neck', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 4, ConstructionPrice: 500000000000, ProductPrice: 30000000, DiscoveryPrice: 100000, Type: 'SemiProduct' },
  { ProductType: 'Viola Parts', ProductAmount: 1, LeftResourceType: 'Viola Frame', LeftResourceAmount: 1, RightResourceType: 'Viola Neck', RightResourceAmount: 1, ConstructionPrice: 4000000000000, ProductPrice: 150000000, DiscoveryPrice: 150000, Type: 'SemiProduct' },
  { ProductType: 'Viola Body', ProductAmount: 1, LeftResourceType: 'Strings', LeftResourceAmount: 4, RightResourceType: 'Viola Parts', RightResourceAmount: 1, ConstructionPrice: 30000000000000, ProductPrice: 600000000, DiscoveryPrice: 200000, Type: 'EarlyProduct' },
  { ProductType: 'Viola Bow', ProductAmount: 3, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Rawhide', RightResourceAmount: 1, ConstructionPrice: 200000000000000, ProductPrice: 900000000, DiscoveryPrice: 250000, Type: 'EarlyProduct' },
  { ProductType: 'Viola', ProductAmount: 1, LeftResourceType: 'Viola Body', LeftResourceAmount: 1, RightResourceType: 'Viola Bow', RightResourceAmount: 1, ConstructionPrice: 1500000000000000, ProductPrice: 20000000000, DiscoveryPrice: 300000, Type: 'LateProduct' },
  { ProductType: 'Harpsichord Frame', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 3, RightResourceType: 'Iron Rivets', RightResourceAmount: 10, ConstructionPrice: 8000000000000000, ProductPrice: 50000000000, DiscoveryPrice: 400000, Type: 'SemiProduct' },
  { ProductType: 'Harpsichord Keys', ProductAmount: 16, LeftResourceType: 'Wood', LeftResourceAmount: 1, ConstructionPrice: 65000000000000000, ProductPrice: 25000000000, DiscoveryPrice: 500000, Type: 'SemiProduct' },
  { ProductType: 'Harpsichord Mechanism', ProductAmount: 1, LeftResourceType: 'Strings', LeftResourceAmount: 80, RightResourceType: 'Harpsichord Keys', RightResourceAmount: 80, ConstructionPrice: 400000000000000000, ProductPrice: 4000000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Harpsichord', ProductAmount: 1, LeftResourceType: 'Harpsichord Frame', LeftResourceAmount: 1, RightResourceType: 'Harpsichord Mechanism', RightResourceAmount: 1, ConstructionPrice: 2000000000000000000, ProductPrice: 10000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
