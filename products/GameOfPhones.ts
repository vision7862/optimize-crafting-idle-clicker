import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const GameOfPhones: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Copper Ore', ProductAmount: 1, ConstructionPrice: 80, ProductPrice: 8, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Copper Ingots', ProductAmount: 3, LeftResourceType: 'Copper Ore', LeftResourceAmount: 1, ConstructionPrice: 2000, ProductPrice: 20, DiscoveryPrice: 50, Type: 'Ingot' },
  { ProductType: 'Wire', ProductAmount: 5, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 1, ConstructionPrice: 25000, ProductPrice: 70, DiscoveryPrice: 100, Type: 'SemiProduct' },
  { ProductType: 'Tin Ore', ProductAmount: 1, ConstructionPrice: 200000, ProductPrice: 800, DiscoveryPrice: 500, Type: 'Ore' },
  { ProductType: 'Tin Can', ProductAmount: 2, LeftResourceType: 'Tin Ore', LeftResourceAmount: 1, ConstructionPrice: 2500000, ProductPrice: 2500, DiscoveryPrice: 1000, Type: 'SemiProduct' },
  { ProductType: 'Tin Can Telephone', ProductAmount: 1, LeftResourceType: 'Wire', LeftResourceAmount: 5, RightResourceType: 'Tin Can', RightResourceAmount: 2, ConstructionPrice: 15000000, ProductPrice: 30000, DiscoveryPrice: 2000, Type: 'EarlyProduct' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 200000000, ProductPrice: 100000, DiscoveryPrice: 5000, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 900000000, ProductPrice: 400000, DiscoveryPrice: 10000, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 10000000000, ProductPrice: 700000, DiscoveryPrice: 20000, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 70000000000, ProductPrice: 2000000, DiscoveryPrice: 50000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 2, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 600000000000, ProductPrice: 25000000, DiscoveryPrice: 100000, Type: 'SemiProduct' },
  { ProductType: 'Electro Magnet', ProductAmount: 1, LeftResourceType: 'Wire', LeftResourceAmount: 3, RightResourceType: 'Iron Ingots', RightResourceAmount: 1, ConstructionPrice: 5500000000000, ProductPrice: 300000000, DiscoveryPrice: 150000, Type: 'EarlyProduct' },
  { ProductType: 'Electrical Parts', ProductAmount: 2, LeftResourceType: 'Copper Ingots', LeftResourceAmount: 2, RightResourceType: 'Iron Rivets', RightResourceAmount: 8, ConstructionPrice: 60000000000000, ProductPrice: 500000000, DiscoveryPrice: 200000, Type: 'SemiProduct' },
  { ProductType: 'Electrical Circuit', ProductAmount: 1, LeftResourceType: 'Wire', LeftResourceAmount: 6, RightResourceType: 'Electrical Parts', RightResourceAmount: 4, ConstructionPrice: 400000000000000, ProductPrice: 6000000000, DiscoveryPrice: 300000, Type: 'SemiProduct' },
  { ProductType: 'Transmitter', ProductAmount: 1, LeftResourceType: 'Electro Magnet', LeftResourceAmount: 1, RightResourceType: 'Electrical Circuit', RightResourceAmount: 1, ConstructionPrice: 3000000000000000, ProductPrice: 30000000000, DiscoveryPrice: 400000, Type: 'EarlyProduct' },
  { ProductType: 'Receiver', ProductAmount: 1, LeftResourceType: 'Mechanical Parts', LeftResourceAmount: 4, RightResourceType: 'Electro Magnet', RightResourceAmount: 1, ConstructionPrice: 15000000000000000, ProductPrice: 80000000000, DiscoveryPrice: 500000, Type: 'EarlyProduct' },
  { ProductType: 'Telegraph', ProductAmount: 1, LeftResourceType: 'Transmitter', LeftResourceAmount: 1, RightResourceType: 'Receiver', RightResourceAmount: 1, ConstructionPrice: 100000000000000000, ProductPrice: 500000000000, DiscoveryPrice: 600000, Type: 'LateProduct' },
  { ProductType: 'Telephone', ProductAmount: 1, LeftResourceType: 'Electrical Parts', LeftResourceAmount: 4, RightResourceType: 'Telegraph', RightResourceAmount: 1, ConstructionPrice: 900000000000000000, ProductPrice: 3000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];
