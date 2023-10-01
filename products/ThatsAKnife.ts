import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const ThatsAKnife: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 70, ProductPrice: 10, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 900, ProductPrice: 30, DiscoveryPrice: 100, Type: 'Ingot' },
  { ProductType: 'Copper Blades', ProductAmount: 1, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 2, ConstructionPrice: 15000, ProductPrice: 250, DiscoveryPrice: 500, Type: 'SemiProduct' },
  { ProductType: 'Throwing Knife', ProductAmount: 1, LeftResourceType: 'Copper Blades', LeftResourceAmount: 1, ConstructionPrice: 80000, ProductPrice: 800, DiscoveryPrice: 1000, Type: 'LateProduct' },
  { ProductType: 'Skinner Knife', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Copper Blades', RightResourceAmount: 1, ConstructionPrice: 600000, ProductPrice: 3000, DiscoveryPrice: 2000, Type: 'EarlyProduct' },
  { ProductType: 'Rawhide', ProductAmount: 4, LeftResourceType: 'Skinner Knife', LeftResourceAmount: 1, ConstructionPrice: 4000000, ProductPrice: 4000, DiscoveryPrice: 3000, Type: 'Ore' },
  { ProductType: 'Leather', ProductAmount: 3, LeftResourceType: 'Rawhide', LeftResourceAmount: 1, ConstructionPrice: 30000000, ProductPrice: 15000, DiscoveryPrice: 5000, Type: 'Ingot' },
  { ProductType: 'Hilt', ProductAmount: 1, LeftResourceType: 'Leather', LeftResourceAmount: 2, ConstructionPrice: 200000000, ProductPrice: 200000, DiscoveryPrice: 10000, Type: 'SemiProduct' },
  { ProductType: 'Copper Dagger', ProductAmount: 1, LeftResourceType: 'Copper Blades', LeftResourceAmount: 2, RightResourceType: 'Hilt', RightResourceAmount: 1, ConstructionPrice: 900000000, ProductPrice: 700000, DiscoveryPrice: 15000, Type: 'LateProduct' },
  { ProductType: 'Tin Ore', ProductAmount: 1, ConstructionPrice: 5000000000, ProductPrice: 1500000, DiscoveryPrice: 20000, Type: 'Ore' },
  { ProductType: 'Bronze Ingots', ProductAmount: 5, LeftResourceType: 'Copper Ore', LeftResourceAmount: 3, RightResourceType: 'Tin Ore', RightResourceAmount: 1, ConstructionPrice: 30000000000, ProductPrice: 2000000, DiscoveryPrice: 30000, Type: 'Ingot' },
  { ProductType: 'Bronze Blades', ProductAmount: 1, LeftResourceType: 'Bronze Ingots', LeftResourceAmount: 2, ConstructionPrice: 200000000000, ProductPrice: 40000000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Bronze Dagger', ProductAmount: 1, LeftResourceType: 'Bronze Blades', LeftResourceAmount: 2, RightResourceType: 'Hilt', RightResourceAmount: 1, ConstructionPrice: 1000000000000, ProductPrice: 250000000, DiscoveryPrice: 75000, Type: 'LateProduct' },
  { ProductType: 'Sickle', ProductAmount: 1, LeftResourceType: 'Bronze Blades', LeftResourceAmount: 3, RightResourceType: 'Wood', RightResourceAmount: 1, ConstructionPrice: 5000000000000, ProductPrice: 600000000, DiscoveryPrice: 100000, Type: 'EarlyProduct' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 30000000000000, ProductPrice: 1000000000, DiscoveryPrice: 125000, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 100000000000000, ProductPrice: 3000000000, DiscoveryPrice: 150000, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 2, RightResourceType: 'Iron Ore', RightResourceAmount: 3, ConstructionPrice: 400000000000000, ProductPrice: 4000000000, DiscoveryPrice: 200000, Type: 'Ingot' },
  { ProductType: 'Iron Blades', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 2, ConstructionPrice: 3000000000000000, ProductPrice: 45000000000, DiscoveryPrice: 250000, Type: 'SemiProduct' },
  { ProductType: 'Parrying Dagger', ProductAmount: 1, LeftResourceType: 'Iron Blades', LeftResourceAmount: 2, RightResourceType: 'Hilt', RightResourceAmount: 1, ConstructionPrice: 20000000000000000, ProductPrice: 200000000000, DiscoveryPrice: 300000, Type: 'LateProduct' },
  { ProductType: 'Janbiya', ProductAmount: 1, LeftResourceType: 'Iron Blades', LeftResourceAmount: 3, RightResourceType: 'Hilt', RightResourceAmount: 1, ConstructionPrice: 80000000000000000, ProductPrice: 500000000000, DiscoveryPrice: 350000, Type: 'LateProduct' },
  { ProductType: 'Gold Ore', ProductAmount: 1, ConstructionPrice: 400000000000000000, ProductPrice: 1000000000000, DiscoveryPrice: 400000, Type: 'Ore' },
  { ProductType: 'Gold Ingots', ProductAmount: 3, LeftResourceType: 'Gold Ore', LeftResourceAmount: 1, ConstructionPrice: 1000000000000000000, ProductPrice: 1500000000000, DiscoveryPrice: 450000, Type: 'Ingot' },
  { ProductType: 'Steel', ProductAmount: 1, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 2, RightResourceType: 'Coal', RightResourceAmount: 4, ConstructionPrice: 8000000000000000000, ProductPrice: 10000000000000, DiscoveryPrice: 500000, Type: 'Ingot' },
  { ProductType: 'Steel Blades', ProductAmount: 1, LeftResourceType: 'Steel', LeftResourceAmount: 2, RightResourceType: 'Coal', RightResourceAmount: 2, ConstructionPrice: 20000000000000000000, ProductPrice: 50000000000000, DiscoveryPrice: 550000, Type: 'SemiProduct' },
  { ProductType: 'Magnificent Hilt', ProductAmount: 1, LeftResourceType: 'Gold Ingots', LeftResourceAmount: 2, RightResourceType: 'Hilt', RightResourceAmount: 1, ConstructionPrice: 1e20, ProductPrice: 150000000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Magnificent Dagger', ProductAmount: 2, LeftResourceType: 'Steel Blades', LeftResourceAmount: 1, RightResourceType: 'Magnificent Hilt', RightResourceAmount: 2, ConstructionPrice: 5e20, ProductPrice: 350000000000000, DiscoveryPrice: 650000, Type: 'LateProduct' },
  { ProductType: 'Poisonous Plant', ProductAmount: 5, LeftResourceType: 'Sickle', LeftResourceAmount: 1, ConstructionPrice: 2e21, ProductPrice: 400000000000000, DiscoveryPrice: 700000, Type: 'Ore' },
  { ProductType: 'Poison', ProductAmount: 1, LeftResourceType: 'Poisonous Plant', LeftResourceAmount: 3, ConstructionPrice: 7e21, ProductPrice: 6000000000000000, DiscoveryPrice: 750000, Type: 'Ingot' },
  { ProductType: 'Poisoned Dagger', ProductAmount: 1, LeftResourceType: 'Magnificent Dagger', LeftResourceAmount: 1, RightResourceType: 'Poison', RightResourceAmount: 1, ConstructionPrice: 1e22, ProductPrice: 30000000000000000, DiscoveryPrice: 800000, Type: 'LateProduct' },
];
