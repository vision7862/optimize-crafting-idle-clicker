import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const WorkshopOfHorrors: ImportedProduct[] = [
  { ProductType: 'Pumpkin', ProductAmount: 1, ConstructionPrice: 12, ProductPrice: 3, DiscoveryPrice: 3, Type: 'Ore' },
  { ProductType: 'Pumpkin Pie', ProductAmount: 1, LeftResourceType: 'Pumpkin', LeftResourceAmount: 3, ConstructionPrice: 150, ProductPrice: 30, DiscoveryPrice: 30, Type: 'EarlyProduct' },
  { ProductType: "Jack-o'-lantern", ProductAmount: 1, LeftResourceType: 'Pumpkin', LeftResourceAmount: 1, ConstructionPrice: 3000, ProductPrice: 150, DiscoveryPrice: 90, Type: 'LateProduct' },
  { ProductType: 'Fabric', ProductAmount: 1, ConstructionPrice: 45000, ProductPrice: 600, DiscoveryPrice: 270, Type: 'Ore' },
  { ProductType: 'Witch Hat', ProductAmount: 1, LeftResourceType: 'Fabric', LeftResourceAmount: 1, ConstructionPrice: 800000, ProductPrice: 4000, DiscoveryPrice: 900, Type: 'SemiProduct' },
  { ProductType: 'Robe', ProductAmount: 1, LeftResourceType: 'Fabric', LeftResourceAmount: 2, ConstructionPrice: 8000000, ProductPrice: 10000, DiscoveryPrice: 1800, Type: 'SemiProduct' },
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 20000000, ProductPrice: 20000, DiscoveryPrice: 2100, Type: 'Ore' },
  { ProductType: 'Vampire Stake', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 1, ConstructionPrice: 400000000, ProductPrice: 90000, DiscoveryPrice: 5400, Type: 'EarlyProduct' },
  { ProductType: 'Witch Broom', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 2, ConstructionPrice: 5000000000, ProductPrice: 600000, DiscoveryPrice: 9000, Type: 'SemiProduct' },
  { ProductType: 'Iron Ingots', ProductAmount: 1, ConstructionPrice: 25000000000, ProductPrice: 7500000, DiscoveryPrice: 15000, Type: 'Ingot' },
  { ProductType: 'Bloody Axe', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 900000000000, ProductPrice: 600000000, DiscoveryPrice: 30000, Type: 'EarlyProduct' },
  { ProductType: 'Coffin', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 6, ConstructionPrice: 40000000000000, ProductPrice: 3000000000, DiscoveryPrice: 45000, Type: 'LateProduct' },
  { ProductType: 'Scythe', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Ingots', RightResourceAmount: 2, ConstructionPrice: 600000000000000, ProductPrice: 6000000000, DiscoveryPrice: 72000, Type: 'SemiProduct' },
  { ProductType: 'Ectoplasm', ProductAmount: 1, ConstructionPrice: 4000000000000000, ProductPrice: 40000000000, DiscoveryPrice: 90000, Type: 'Ore' },
  { ProductType: 'Ghost', ProductAmount: 1, LeftResourceType: 'Ectoplasm', LeftResourceAmount: 2, ConstructionPrice: 30000000000000000, ProductPrice: 600000000000, DiscoveryPrice: 120000, Type: 'EarlyProduct' },
  { ProductType: 'Witch', ProductAmount: 1, LeftResourceType: 'Witch Hat', LeftResourceAmount: 1, RightResourceType: 'Witch Broom', RightResourceAmount: 1, ConstructionPrice: 700000000000000000, ProductPrice: 2000000000000, DiscoveryPrice: 180000, Type: 'LateProduct' },
  { ProductType: 'Mummy', ProductAmount: 1, LeftResourceType: 'Fabric', LeftResourceAmount: 4, RightResourceType: 'Ectoplasm', RightResourceAmount: 1, ConstructionPrice: 3000000000000000000, ProductPrice: 9000000000000, DiscoveryPrice: 240000, Type: 'LateProduct' },
  { ProductType: 'Grim Reaper', ProductAmount: 1, LeftResourceType: 'Robe', LeftResourceAmount: 1, RightResourceType: 'Scythe', RightResourceAmount: 1, ConstructionPrice: 30000000000000000000, ProductPrice: 30000000000000, DiscoveryPrice: 300000, Type: 'LateProduct' },
];
