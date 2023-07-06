import { Blueprint } from '../types/Blueprint';

export const DEFAULT_BLUEPRINT: Blueprint = {
  productName: 'productName',
  evolutionStage: 1,
  upgradeLevel: 1,
  score: 10,
};

export const BLUEPRINT_LIBRARY: Blueprint[] = [
  {
    productName: 'Wood',
    evolutionStage: 2,
    upgradeLevel: 1,
    score: 120,
  },
  { ...DEFAULT_BLUEPRINT, productName: 'Wood' },
  { ...DEFAULT_BLUEPRINT, productName: 'Wood' },
  { ...DEFAULT_BLUEPRINT, productName: 'Club' },
  { ...DEFAULT_BLUEPRINT, productName: 'Club' },
  { ...DEFAULT_BLUEPRINT, productName: 'Club' },
  { ...DEFAULT_BLUEPRINT, productName: 'Club' },
  { ...DEFAULT_BLUEPRINT, productName: 'Arrows' },
  { ...DEFAULT_BLUEPRINT, productName: 'Arrows' },
  { ...DEFAULT_BLUEPRINT, productName: 'Arrows' },
  { ...DEFAULT_BLUEPRINT, productName: 'Arrows' },
  { ...DEFAULT_BLUEPRINT, productName: 'Bow' },
  { ...DEFAULT_BLUEPRINT, productName: 'Bow' },
  { ...DEFAULT_BLUEPRINT, productName: 'Bow' },
  { ...DEFAULT_BLUEPRINT, productName: 'Bow' },
  { ...DEFAULT_BLUEPRINT, productName: 'Bow' },
  { ...DEFAULT_BLUEPRINT, productName: 'Copper Axe', upgradeLevel: 51, score: 60 },
  { ...DEFAULT_BLUEPRINT, productName: 'Copper Axe' },
  { ...DEFAULT_BLUEPRINT, productName: 'Copper Axe' },
  { ...DEFAULT_BLUEPRINT, productName: 'Copper Axe' },
  { ...DEFAULT_BLUEPRINT, productName: 'Copper Axe' },
  { ...DEFAULT_BLUEPRINT, productName: 'Copper Axe' },
  { ...DEFAULT_BLUEPRINT, productName: 'Copper Axe' },
  { ...DEFAULT_BLUEPRINT, productName: 'Copper Axe' },
  { ...DEFAULT_BLUEPRINT, productName: 'Bronze Spear', upgradeLevel: 51, score: 60 },
  { ...DEFAULT_BLUEPRINT, productName: 'Bronze Spear' },
  { ...DEFAULT_BLUEPRINT, productName: 'Bronze Spear' },
];
