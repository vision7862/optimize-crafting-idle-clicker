import { ImportedProduct } from '../src/buildWorkshop/types/ImportedProduct';

export const AlchemistsKitchen: ImportedProduct[] = [
  { ProductType: 'Taraxacum Officinale', ProductAmount: 1, ConstructionPrice: 10, ProductPrice: 1, DiscoveryPrice: 1, Type: 'Ore' },
  { ProductType: 'Anethum Graveolens', ProductAmount: 2, ConstructionPrice: 100, ProductPrice: 5, DiscoveryPrice: 10, Type: 'Ore' },
  { ProductType: 'Potio Flava', ProductAmount: 1, LeftResourceType: 'Taraxacum Officinale', LeftResourceAmount: 2, RightResourceType: 'Anethum Graveolens', RightResourceAmount: 2, ConstructionPrice: 2000, ProductPrice: 70, DiscoveryPrice: 50, Type: 'Ingot' },
  { ProductType: 'Amanita Muscaria', ProductAmount: 1, ConstructionPrice: 20000, ProductPrice: 300, DiscoveryPrice: 100, Type: 'Ore' },
  { ProductType: 'Rosa Canina', ProductAmount: 2, ConstructionPrice: 150000, ProductPrice: 500, DiscoveryPrice: 200, Type: 'Ore' },
  { ProductType: 'Potio Roba', ProductAmount: 1, LeftResourceType: 'Amanita Muscaria', LeftResourceAmount: 1, RightResourceType: 'Rosa Canina', RightResourceAmount: 4, ConstructionPrice: 2500000, ProductPrice: 8000, DiscoveryPrice: 500, Type: 'Ingot' },
  { ProductType: 'Potio Aurantiaca', ProductAmount: 5, LeftResourceType: 'Potio Flava', LeftResourceAmount: 3, RightResourceType: 'Potio Roba', RightResourceAmount: 2, ConstructionPrice: 15000000, ProductPrice: 8000, DiscoveryPrice: 1000, Type: 'SemiProduct' },
  { ProductType: 'Cichorium Intybus', ProductAmount: 3, ConstructionPrice: 200000000, ProductPrice: 30000, DiscoveryPrice: 2000, Type: 'Ore' },
  { ProductType: 'Stropharia Aeruginosa', ProductAmount: 2, ConstructionPrice: 1000000000, ProductPrice: 200000, DiscoveryPrice: 5000, Type: 'Ore' },
  { ProductType: 'Potio Caerulea', ProductAmount: 1, LeftResourceType: 'Cichorium Intybus', LeftResourceAmount: 5, RightResourceType: 'Stropharia Aeruginosa', RightResourceAmount: 3, ConstructionPrice: 15000000000, ProductPrice: 3000000, DiscoveryPrice: 10000, Type: 'Ingot' },
  { ProductType: 'Potio Violacea', ProductAmount: 5, LeftResourceType: 'Potio Roba', LeftResourceAmount: 1, RightResourceType: 'Potio Caerulea', RightResourceAmount: 4, ConstructionPrice: 80000000000, ProductPrice: 4000000, DiscoveryPrice: 20000, Type: 'SemiProduct' },
  { ProductType: 'Salvia Officinalis', ProductAmount: 3, ConstructionPrice: 700000000000, ProductPrice: 10000000, DiscoveryPrice: 50000, Type: 'Ore' },
  { ProductType: 'Olea Europaea', ProductAmount: 1, ConstructionPrice: 3000000000000, ProductPrice: 50000000, DiscoveryPrice: 100000, Type: 'Ore' },
  { ProductType: 'Potio Viridis', ProductAmount: 1, LeftResourceType: 'Salvia Officinalis', LeftResourceAmount: 3, RightResourceType: 'Olea Europaea', RightResourceAmount: 1, ConstructionPrice: 20000000000000, ProductPrice: 400000000, DiscoveryPrice: 150000, Type: 'Ingot' },
  { ProductType: 'Potio Fusca', ProductAmount: 5, LeftResourceType: 'Potio Aurantiaca', LeftResourceAmount: 2, RightResourceType: 'Potio Viridis', RightResourceAmount: 3, ConstructionPrice: 100000000000000, ProductPrice: 400000000, DiscoveryPrice: 200000, Type: 'EarlyProduct' },
  { ProductType: 'Muscari Botryoides', ProductAmount: 2, ConstructionPrice: 500000000000000, ProductPrice: 2000000000, DiscoveryPrice: 250000, Type: 'Ore' },
  { ProductType: 'Allium Schoenoprasum', ProductAmount: 3, ConstructionPrice: 4000000000000000, ProductPrice: 10000000000, DiscoveryPrice: 300000, Type: 'Ore' },
  { ProductType: 'Potio Rosea', ProductAmount: 1, LeftResourceType: 'Muscari Botryoides', LeftResourceAmount: 2, RightResourceType: 'Allium Schoenoprasum', RightResourceAmount: 4, ConstructionPrice: 30000000000000000, ProductPrice: 200000000000, DiscoveryPrice: 400000, Type: 'Ingot' },
  { ProductType: 'Potio Purpura', ProductAmount: 5, LeftResourceType: 'Potio Violacea', LeftResourceAmount: 3, RightResourceType: 'Potio Rosea', RightResourceAmount: 2, ConstructionPrice: 200000000000000000, ProductPrice: 200000000000, DiscoveryPrice: 500000, Type: 'EarlyProduct' },
  { ProductType: "Philosopher's Stone", ProductAmount: 1, LeftResourceType: 'Potio Fusca', LeftResourceAmount: 2, RightResourceType: 'Potio Purpura', RightResourceAmount: 2, ConstructionPrice: 1000000000000000000, ProductPrice: 5000000000000, DiscoveryPrice: 600000, Type: 'LateProduct' },
];
