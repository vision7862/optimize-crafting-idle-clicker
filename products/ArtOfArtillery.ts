import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const ArtOfArtillery: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Coal', ProductAmount: 3, ConstructionPrice: 80, ProductPrice: 4, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 700, ProductPrice: 20, DiscoveryPrice: 50, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 6000, ProductPrice: 30, DiscoveryPrice: 100, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 70000, ProductPrice: 90, DiscoveryPrice: 500, Type: 'SemiProduct' },
  { ProductType: 'Wheel', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 5, ConstructionPrice: 900000, ProductPrice: 2000, DiscoveryPrice: 1000, Type: 'EarlyProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 7000000, ProductPrice: 3000, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Base Plate', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 4, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 60000000, ProductPrice: 40000, DiscoveryPrice: 5000, Type: 'SemiProduct' },
  { ProductType: 'Mortar Barrel', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 2, RightResourceType: 'Mechanical Parts', RightResourceAmount: 4, ConstructionPrice: 500000000, ProductPrice: 200000, DiscoveryPrice: 10000, Type: 'SemiProduct' },
  { ProductType: 'Mortar', ProductAmount: 1, LeftResourceType: 'Mortar Barrel', LeftResourceAmount: 1, RightResourceType: 'Base Plate', RightResourceAmount: 1, ConstructionPrice: 4000000000, ProductPrice: 1000000, DiscoveryPrice: 20000, Type: 'EarlyProduct' },
  { ProductType: 'Sulfur', ProductAmount: 1, ConstructionPrice: 30000000000, ProductPrice: 4000000, DiscoveryPrice: 50000, Type: 'Ore' },
  { ProductType: 'Saltpeter', ProductAmount: 1, ConstructionPrice: 250000000000, ProductPrice: 20000000, DiscoveryPrice: 100000, Type: 'Ore' },
  { ProductType: 'Gunpowder', ProductAmount: 3, LeftResourceType: 'Sulfur', LeftResourceAmount: 1, RightResourceType: 'Saltpeter', RightResourceAmount: 3, ConstructionPrice: 3000000000000, ProductPrice: 70000000, DiscoveryPrice: 150000, Type: 'SemiProduct' },
  { ProductType: 'Steel', ProductAmount: 1, LeftResourceType: 'Coal', LeftResourceAmount: 4, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 15000000000000, ProductPrice: 400000000, DiscoveryPrice: 200000, Type: 'Ingot' },
  { ProductType: 'Rocket', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 2, RightResourceType: 'Gunpowder', RightResourceAmount: 3, ConstructionPrice: 100000000000000, ProductPrice: 2000000000, DiscoveryPrice: 250000, Type: 'SemiProduct' },
  { ProductType: 'Weapon Parts', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 2, ConstructionPrice: 700000000000000, ProductPrice: 8000000000, DiscoveryPrice: 300000, Type: 'SemiProduct' },
  { ProductType: 'Launcher', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 3, RightResourceType: 'Weapon Parts', RightResourceAmount: 2, ConstructionPrice: 6000000000000000, ProductPrice: 60000000000, DiscoveryPrice: 400000, Type: 'SemiProduct' },
  { ProductType: 'Rocket Launcher', ProductAmount: 1, LeftResourceType: 'Launcher', LeftResourceAmount: 1, RightResourceType: 'Rocket', RightResourceAmount: 1, ConstructionPrice: 50000000000000000, ProductPrice: 400000000000, DiscoveryPrice: 500000, Type: 'LateProduct' },
  { ProductType: 'Cannon Barrel', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 5, RightResourceType: 'Weapon Parts', RightResourceAmount: 4, ConstructionPrice: 550000000000000000, ProductPrice: 2000000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Cannon', ProductAmount: 1, LeftResourceType: 'Cannon Barrel', LeftResourceAmount: 1, RightResourceType: 'Wheel', RightResourceAmount: 2, ConstructionPrice: 4000000000000000000, ProductPrice: 8000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
