import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const PoleModel: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Rawhide', ProductAmount: 1, ConstructionPrice: 80, ProductPrice: 5, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Leather', ProductAmount: 1, LeftResourceType: 'Rawhide', LeftResourceAmount: 1, ConstructionPrice: 900, ProductPrice: 30, DiscoveryPrice: 50, Type: 'Ingot' },
  { ProductType: 'Sledge', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 4, RightResourceType: 'Leather', RightResourceAmount: 3, ConstructionPrice: 7000, ProductPrice: 200, DiscoveryPrice: 100, Type: 'EarlyProduct' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 50000, ProductPrice: 400, DiscoveryPrice: 500, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 600000, ProductPrice: 1500, DiscoveryPrice: 1000, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 4500000, ProductPrice: 2000, DiscoveryPrice: 2000, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 50000000, ProductPrice: 8000, DiscoveryPrice: 5000, Type: 'SemiProduct' },
  { ProductType: 'Entrenching Tool', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Iron Ingots', RightResourceAmount: 3, ConstructionPrice: 400000000, ProductPrice: 90000, DiscoveryPrice: 10000, Type: 'EarlyProduct' },
  { ProductType: 'Fabric', ProductAmount: 1, ConstructionPrice: 3000000000, ProductPrice: 300000, DiscoveryPrice: 20000, Type: 'Ore' },
  { ProductType: 'Tent', ProductAmount: 1, LeftResourceType: 'Fabric', LeftResourceAmount: 3, RightResourceType: 'Iron Ingots', RightResourceAmount: 1, ConstructionPrice: 15000000000, ProductPrice: 2000000, DiscoveryPrice: 50000, Type: 'LateProduct' },
  { ProductType: 'Ice Axe', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 75000000000, ProductPrice: 5000000, DiscoveryPrice: 100000, Type: 'EarlyProduct' },
  { ProductType: 'Backpack', ProductAmount: 1, LeftResourceType: 'Leather', LeftResourceAmount: 2, RightResourceType: 'Fabric', RightResourceAmount: 1, ConstructionPrice: 600000000000, ProductPrice: 20000000, DiscoveryPrice: 150000, Type: 'LateProduct' },
  { ProductType: 'Quartz', ProductAmount: 1, ConstructionPrice: 3000000000000, ProductPrice: 70000000, DiscoveryPrice: 200000, Type: 'Ore' },
  { ProductType: 'Glass', ProductAmount: 1, LeftResourceType: 'Quartz', LeftResourceAmount: 1, ConstructionPrice: 25000000000000, ProductPrice: 400000000, DiscoveryPrice: 250000, Type: 'Ingot' },
  { ProductType: 'Lens', ProductAmount: 5, LeftResourceType: 'Glass', LeftResourceAmount: 1, ConstructionPrice: 150000000000000, ProductPrice: 450000000, DiscoveryPrice: 300000, Type: 'SemiProduct' },
  { ProductType: 'Telescope', ProductAmount: 1, LeftResourceType: 'Lens', LeftResourceAmount: 2, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 700000000000000, ProductPrice: 6000000000, DiscoveryPrice: 400000, Type: 'EarlyProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 6000000000000000, ProductPrice: 20000000000, DiscoveryPrice: 500000, Type: 'SemiProduct' },
  { ProductType: 'Theodolite Base', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 4, ConstructionPrice: 50000000000000000, ProductPrice: 400000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Theodolite', ProductAmount: 1, LeftResourceType: 'Theodolite Base', LeftResourceAmount: 1, RightResourceType: 'Telescope', RightResourceAmount: 1, ConstructionPrice: 400000000000000000, ProductPrice: 1000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
