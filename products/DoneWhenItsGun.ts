import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const DoneWhenItsGun: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 80, ProductPrice: 4, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 900, ProductPrice: 10, DiscoveryPrice: 50, Type: 'Ore' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 10000, ProductPrice: 100, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 80000, ProductPrice: 400, DiscoveryPrice: 500, Type: 'Ingot' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 1000000, ProductPrice: 600, DiscoveryPrice: 1000, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 8000000, ProductPrice: 1000, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 60000000, ProductPrice: 10000, DiscoveryPrice: 5000, Type: 'SemiProduct' },
  { ProductType: 'Steel', ProductAmount: 1, LeftResourceType: 'Coal', LeftResourceAmount: 4, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 300000000, ProductPrice: 50000, DiscoveryPrice: 10000, Type: 'Ingot' },
  { ProductType: 'Weapon Parts', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 2, RightResourceType: 'Steel', RightResourceAmount: 1, ConstructionPrice: 2500000000, ProductPrice: 400000, DiscoveryPrice: 20000, Type: 'SemiProduct' },
  { ProductType: 'Hammer', ProductAmount: 4, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 20000000000, ProductPrice: 500000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Percussion Cap', ProductAmount: 3, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 1, RightResourceType: 'Mechanical Parts', RightResourceAmount: 6, ConstructionPrice: 100000000000, ProductPrice: 2000000, DiscoveryPrice: 100000, Type: 'SemiProduct' },
  { ProductType: 'Caplock', ProductAmount: 1, LeftResourceType: 'Hammer', LeftResourceAmount: 1, RightResourceType: 'Percussion Cap', RightResourceAmount: 1, ConstructionPrice: 800000000000, ProductPrice: 40000000, DiscoveryPrice: 200000, Type: 'SemiProduct' },
  { ProductType: 'Caplock Pistol', ProductAmount: 1, LeftResourceType: 'Weapon Parts', LeftResourceAmount: 1, RightResourceType: 'Caplock', RightResourceAmount: 1, ConstructionPrice: 7000000000000, ProductPrice: 200000000, DiscoveryPrice: 300000, Type: 'EarlyProduct' },
  { ProductType: 'Derringer', ProductAmount: 1, LeftResourceType: 'Weapon Parts', LeftResourceAmount: 1, RightResourceType: 'Caplock', RightResourceAmount: 1, ConstructionPrice: 50000000000000, ProductPrice: 700000000, DiscoveryPrice: 400000, Type: 'LateProduct' },
  { ProductType: 'Cylinder', ProductAmount: 5, LeftResourceType: 'Steel', LeftResourceAmount: 1, ConstructionPrice: 400000000000000, ProductPrice: 800000000, DiscoveryPrice: 500000, Type: 'SemiProduct' },
  { ProductType: 'Revolver Action', ProductAmount: 1, LeftResourceType: 'Caplock', LeftResourceAmount: 1, RightResourceType: 'Cylinder', RightResourceAmount: 1, ConstructionPrice: 3500000000000000, ProductPrice: 20000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Revolver', ProductAmount: 1, LeftResourceType: 'Weapon Parts', LeftResourceAmount: 1, RightResourceType: 'Revolver Action', RightResourceAmount: 1, ConstructionPrice: 20000000000000000, ProductPrice: 100000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
