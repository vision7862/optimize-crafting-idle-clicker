import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const CraftingALaCarte: ImportedProduct[] = [
  { ProductType: 'Wheat', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Flour', ProductAmount: 2, LeftResourceType: 'Wheat', LeftResourceAmount: 1, ConstructionPrice: 70, ProductPrice: 3, DiscoveryPrice: 10, Type: 'Ingot' },
  { ProductType: 'Bread', ProductAmount: 1, LeftResourceType: 'Flour', LeftResourceAmount: 3, ConstructionPrice: 600, ProductPrice: 40, DiscoveryPrice: 50, Type: 'EarlyProduct' },
  { ProductType: 'Corn', ProductAmount: 1, ConstructionPrice: 7500, ProductPrice: 100, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Corn Bread', ProductAmount: 1, LeftResourceType: 'Flour', LeftResourceAmount: 2, RightResourceType: 'Corn', RightResourceAmount: 1, ConstructionPrice: 50000, ProductPrice: 500, DiscoveryPrice: 500, Type: 'EarlyProduct' },
  { ProductType: 'Turkey', ProductAmount: 1, ConstructionPrice: 650000, ProductPrice: 1000, DiscoveryPrice: 1000, Type: 'Ore' },
  { ProductType: 'Broth', ProductAmount: 4, LeftResourceType: 'Turkey', LeftResourceAmount: 1, ConstructionPrice: 4000000, ProductPrice: 900, DiscoveryPrice: 2000, Type: 'SemiProduct' },
  { ProductType: 'Gravy', ProductAmount: 1, LeftResourceType: 'Broth', LeftResourceAmount: 1, RightResourceType: 'Flour', RightResourceAmount: 1, ConstructionPrice: 25000000, ProductPrice: 6000, DiscoveryPrice: 5000, Type: 'LateProduct' },
  { ProductType: 'Potato', ProductAmount: 1, ConstructionPrice: 150000000, ProductPrice: 30000, DiscoveryPrice: 10000, Type: 'Ore' },
  { ProductType: 'Mashed Potatoes', ProductAmount: 1, LeftResourceType: 'Potato', LeftResourceAmount: 3, ConstructionPrice: 650000000, ProductPrice: 200000, DiscoveryPrice: 20000, Type: 'EarlyProduct' },
  { ProductType: 'Cranberries', ProductAmount: 1, ConstructionPrice: 4000000000, ProductPrice: 400000, DiscoveryPrice: 50000, Type: 'Ore' },
  { ProductType: 'Sugar', ProductAmount: 1, ConstructionPrice: 25000000000, ProductPrice: 2000000, DiscoveryPrice: 100000, Type: 'Ore' },
  { ProductType: 'Cranberry Sauce', ProductAmount: 1, LeftResourceType: 'Cranberries', LeftResourceAmount: 1, RightResourceType: 'Sugar', RightResourceAmount: 1, ConstructionPrice: 90000000000, ProductPrice: 7000000, DiscoveryPrice: 150000, Type: 'EarlyProduct' },
  { ProductType: 'Apple', ProductAmount: 1, ConstructionPrice: 600000000000, ProductPrice: 30000000, DiscoveryPrice: 200000, Type: 'Ore' },
  { ProductType: 'Apple Cider', ProductAmount: 1, LeftResourceType: 'Apple', LeftResourceAmount: 2, ConstructionPrice: 4000000000000, ProductPrice: 200000000, DiscoveryPrice: 250000, Type: 'EarlyProduct' },
  { ProductType: 'Pie Dough', ProductAmount: 1, LeftResourceType: 'Flour', LeftResourceAmount: 3, RightResourceType: 'Sugar', RightResourceAmount: 2, ConstructionPrice: 25000000000000, ProductPrice: 500000000, DiscoveryPrice: 300000, Type: 'SemiProduct' },
  { ProductType: 'Apple Pie', ProductAmount: 1, LeftResourceType: 'Apple', LeftResourceAmount: 3, RightResourceType: 'Pie Dough', RightResourceAmount: 1, ConstructionPrice: 200000000000000, ProductPrice: 4000000000, DiscoveryPrice: 350000, Type: 'LateProduct' },
  { ProductType: 'Thyme', ProductAmount: 1, ConstructionPrice: 1500000000000000, ProductPrice: 20000000000, DiscoveryPrice: 400000, Type: 'Ore' },
  { ProductType: 'Sage', ProductAmount: 1, ConstructionPrice: 8000000000000000, ProductPrice: 50000000000, DiscoveryPrice: 450000, Type: 'Ore' },
  { ProductType: 'Herbs', ProductAmount: 1, LeftResourceType: 'Sage', LeftResourceAmount: 2, RightResourceType: 'Thyme', RightResourceAmount: 3, ConstructionPrice: 60000000000000000, ProductPrice: 600000000000, DiscoveryPrice: 500000, Type: 'EarlyProduct' },
  { ProductType: 'Stuffing', ProductAmount: 1, LeftResourceType: 'Bread', LeftResourceAmount: 1, RightResourceType: 'Herbs', RightResourceAmount: 1, ConstructionPrice: 400000000000000000, ProductPrice: 3000000000000, DiscoveryPrice: 600000, Type: 'SemiProduct' },
  { ProductType: 'Stuffed Turkey', ProductAmount: 1, LeftResourceType: 'Turkey', LeftResourceAmount: 1, RightResourceType: 'Stuffing', RightResourceAmount: 1, ConstructionPrice: 3000000000000000000, ProductPrice: 10000000000000, DiscoveryPrice: 700000, Type: 'LateProduct' },
];