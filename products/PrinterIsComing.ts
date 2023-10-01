import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const PrinterIsComing: ImportedProduct[] = [
  { ProductType: 'Wood', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Paper', ProductAmount: 5, LeftResourceType: 'Wood', LeftResourceAmount: 1, ConstructionPrice: 80, ProductPrice: 2, DiscoveryPrice: 10, Type: 'EarlyProduct' },
  { ProductType: 'Rawhide', ProductAmount: 1, ConstructionPrice: 1000, ProductPrice: 50, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Leather', ProductAmount: 3, LeftResourceType: 'Rawhide', LeftResourceAmount: 1, ConstructionPrice: 20000, ProductPrice: 150, DiscoveryPrice: 500, Type: 'Ingot' },
  { ProductType: 'Coal', ProductAmount: 1, ConstructionPrice: 300000, ProductPrice: 800, DiscoveryPrice: 1000, Type: 'Ore' },
  { ProductType: 'Iron Ore', ProductAmount: 1, ConstructionPrice: 2000000, ProductPrice: 3000, DiscoveryPrice: 2000, Type: 'Ore' },
  { ProductType: 'Iron Ingots', ProductAmount: 5, LeftResourceType: 'Coal', LeftResourceAmount: 3, RightResourceType: 'Iron Ore', RightResourceAmount: 2, ConstructionPrice: 9000000, ProductPrice: 5000, DiscoveryPrice: 3000, Type: 'Ingot' },
  { ProductType: 'Iron Rivets', ProductAmount: 5, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, ConstructionPrice: 200000000, ProductPrice: 20000, DiscoveryPrice: 5000, Type: 'SemiProduct' },
  { ProductType: 'Ink', ProductAmount: 1, ConstructionPrice: 1000000000, ProductPrice: 400000, DiscoveryPrice: 10000, Type: 'Ore' },
  { ProductType: 'Type', ProductAmount: 10, LeftResourceType: 'Iron Ingots', LeftResourceAmount: 1, RightResourceType: 'Ink', RightResourceAmount: 3, ConstructionPrice: 15000000000, ProductPrice: 300000, DiscoveryPrice: 15000, Type: 'SemiProduct' },
  { ProductType: 'Mechanical Parts', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 1, RightResourceType: 'Iron Rivets', RightResourceAmount: 5, ConstructionPrice: 90000000000, ProductPrice: 6000000, DiscoveryPrice: 30000, Type: 'SemiProduct' },
  { ProductType: 'Screw Press', ProductAmount: 1, LeftResourceType: 'Wood', LeftResourceAmount: 2, RightResourceType: 'Mechanical Parts', RightResourceAmount: 3, ConstructionPrice: 1000000000000, ProductPrice: 50000000, DiscoveryPrice: 50000, Type: 'EarlyProduct' },
  { ProductType: 'Printing Press', ProductAmount: 1, LeftResourceType: 'Type', LeftResourceAmount: 10, RightResourceType: 'Screw Press', RightResourceAmount: 1, ConstructionPrice: 10000000000000, ProductPrice: 300000000, DiscoveryPrice: 75000, Type: 'LateProduct' },
  { ProductType: 'Paper Sheets', ProductAmount: 10, LeftResourceType: 'Paper', LeftResourceAmount: 4, RightResourceType: 'Printing Press', RightResourceAmount: 1, ConstructionPrice: 80000000000000, ProductPrice: 100000000, DiscoveryPrice: 100000, Type: 'SemiProduct' },
  { ProductType: 'Book Cover', ProductAmount: 2, LeftResourceType: 'Leather', LeftResourceAmount: 1, ConstructionPrice: 300000000000000, ProductPrice: 2000000000, DiscoveryPrice: 150000, Type: 'SemiProduct' },
  { ProductType: 'Book', ProductAmount: 1, LeftResourceType: 'Paper Sheets', LeftResourceAmount: 5, RightResourceType: 'Book Cover', RightResourceAmount: 1, ConstructionPrice: 2000000000000000, ProductPrice: 30000000000, DiscoveryPrice: 200000, Type: 'LateProduct' },
  { ProductType: 'Gold Ore', ProductAmount: 1, ConstructionPrice: 10000000000000000, ProductPrice: 100000000000, DiscoveryPrice: 300000, Type: 'Ore' },
  { ProductType: 'Gold Ingots', ProductAmount: 3, LeftResourceType: 'Gold Ore', LeftResourceAmount: 1, ConstructionPrice: 90000000000000000, ProductPrice: 300000000000, DiscoveryPrice: 400000, Type: 'Ingot' },
  { ProductType: 'Gilded Book Cover', ProductAmount: 1, LeftResourceType: 'Book Cover', LeftResourceAmount: 1, RightResourceType: 'Gold Ingots', RightResourceAmount: 1, ConstructionPrice: 1000000000000000000, ProductPrice: 6000000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Tome', ProductAmount: 1, LeftResourceType: 'Paper Sheets', LeftResourceAmount: 10, RightResourceType: 'Gilded Book Cover', RightResourceAmount: 1, ConstructionPrice: 10000000000000000000, ProductPrice: 50000000000000, DiscoveryPrice: 800000, Type: 'LateProduct' },
];
