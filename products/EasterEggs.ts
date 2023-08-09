import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const EasterEggs: ImportedProduct[] = [
  { ProductType: 'Egg', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Sticks', ProductAmount: 1, ConstructionPrice: 80, ProductPrice: 8, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Basket', ProductAmount: 1, LeftResourceType: 'Sticks', LeftResourceAmount: 6, ConstructionPrice: 900, ProductPrice: 90, DiscoveryPrice: 50, Type: 'EarlyProduct' },
  { ProductType: 'Yellow Paint', ProductAmount: 1, ConstructionPrice: 8000, ProductPrice: 200, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Yellow Egg', ProductAmount: 1, LeftResourceType: 'Egg', LeftResourceAmount: 1, RightResourceType: 'Yellow Paint', RightResourceAmount: 1, ConstructionPrice: 70000, ProductPrice: 700, DiscoveryPrice: 500, Type: 'EarlyProduct' },
  { ProductType: 'Red Paint', ProductAmount: 1, ConstructionPrice: 600000, ProductPrice: 2000, DiscoveryPrice: 1000, Type: 'Ore' },
  { ProductType: 'Red Egg', ProductAmount: 1, LeftResourceType: 'Egg', LeftResourceAmount: 1, RightResourceType: 'Red Paint', RightResourceAmount: 1, ConstructionPrice: 5000000, ProductPrice: 7000, DiscoveryPrice: 2000, Type: 'EarlyProduct' },
  { ProductType: 'Orange Paint', ProductAmount: 2, LeftResourceType: 'Red Paint', LeftResourceAmount: 1, RightResourceType: 'Yellow Paint', RightResourceAmount: 1, ConstructionPrice: 40000000, ProductPrice: 20000, DiscoveryPrice: 5000, Type: 'Ingot' },
  { ProductType: 'Orange Egg', ProductAmount: 1, LeftResourceType: 'Egg', LeftResourceAmount: 1, RightResourceType: 'Orange Paint', RightResourceAmount: 1, ConstructionPrice: 300000000, ProductPrice: 90000, DiscoveryPrice: 10000, Type: 'EarlyProduct' },
  { ProductType: 'Reddish Eggs', ProductAmount: 1, LeftResourceType: 'Red Egg', LeftResourceAmount: 3, RightResourceType: 'Orange Egg', RightResourceAmount: 2, ConstructionPrice: 2000000000, ProductPrice: 600000, DiscoveryPrice: 20000, Type: 'SemiProduct' },
  { ProductType: 'Easter Basket', ProductAmount: 1, LeftResourceType: 'Basket', LeftResourceAmount: 1, RightResourceType: 'Reddish Eggs', RightResourceAmount: 1, ConstructionPrice: 20000000000, ProductPrice: 3000000, DiscoveryPrice: 50000, Type: 'LateProduct' },
  { ProductType: 'Blue Paint', ProductAmount: 1, ConstructionPrice: 100000000000, ProductPrice: 10000000, DiscoveryPrice: 100000, Type: 'Ore' },
  { ProductType: 'Blue Egg', ProductAmount: 1, LeftResourceType: 'Egg', LeftResourceAmount: 1, RightResourceType: 'Blue Paint', RightResourceAmount: 1, ConstructionPrice: 700000000000, ProductPrice: 50000000, DiscoveryPrice: 150000, Type: 'EarlyProduct' },
  { ProductType: 'Green Paint', ProductAmount: 2, LeftResourceType: 'Blue Paint', LeftResourceAmount: 1, RightResourceType: 'Yellow Paint', RightResourceAmount: 1, ConstructionPrice: 5000000000000, ProductPrice: 100000000, DiscoveryPrice: 200000, Type: 'Ingot' },
  { ProductType: 'Green Egg', ProductAmount: 1, LeftResourceType: 'Egg', LeftResourceAmount: 1, RightResourceType: 'Green Paint', RightResourceAmount: 1, ConstructionPrice: 30000000000000, ProductPrice: 600000000, DiscoveryPrice: 250000, Type: 'EarlyProduct' },
  { ProductType: 'Yellowish Eggs', ProductAmount: 1, LeftResourceType: 'Yellow Egg', LeftResourceAmount: 3, RightResourceType: 'Green Egg', RightResourceAmount: 2, ConstructionPrice: 300000000000000, ProductPrice: 5000000000, DiscoveryPrice: 300000, Type: 'SemiProduct' },
  { ProductType: 'Large Easter Basket', ProductAmount: 1, LeftResourceType: 'Easter Basket', LeftResourceAmount: 1, RightResourceType: 'Yellowish Eggs', RightResourceAmount: 1, ConstructionPrice: 2000000000000000, ProductPrice: 20000000000, DiscoveryPrice: 350000, Type: 'LateProduct' },
  { ProductType: 'Purple Paint', ProductAmount: 2, LeftResourceType: 'Red Paint', LeftResourceAmount: 1, RightResourceType: 'Blue Paint', RightResourceAmount: 1, ConstructionPrice: 10000000000000000, ProductPrice: 30000000000, DiscoveryPrice: 400000, Type: 'Ingot' },
  { ProductType: 'Purple Egg', ProductAmount: 1, LeftResourceType: 'Egg', LeftResourceAmount: 1, RightResourceType: 'Purple Paint', RightResourceAmount: 1, ConstructionPrice: 80000000000000000, ProductPrice: 400000000000, DiscoveryPrice: 500000, Type: 'EarlyProduct' },
  { ProductType: 'Bluish Eggs', ProductAmount: 1, LeftResourceType: 'Blue Egg', LeftResourceAmount: 3, RightResourceType: 'Purple Egg', RightResourceAmount: 2, ConstructionPrice: 500000000000000000, ProductPrice: 2000000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Huge Easter Basket', ProductAmount: 1, LeftResourceType: 'Large Easter Basket', LeftResourceAmount: 1, RightResourceType: 'Bluish Eggs', RightResourceAmount: 1, ConstructionPrice: 3000000000000000000, ProductPrice: 7000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];