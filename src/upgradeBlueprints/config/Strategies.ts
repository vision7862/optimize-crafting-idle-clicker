import { ProductName } from '../types/Blueprint';
import { SetMergingStrategy } from '../types/MergingStrategy';

// TODO: GH-4: only merge if there are excess blueprints for that product. for now, hardcode ones the algo wants that i don't have
export const BPS_WITHOUT_DUPES: ProductName[] = [
  // income wants
  'Sickle',
  'Saxophone',
  'Mortar',
  'Rawhide',
  'Rocket Launcher',
  'Lever Action Rifle',

  // cheapest to merge
  'Shovel',
  'Paper Sheets',
  'Map',
  'Caplock Pistol',
  'Bongos',
  'Rowboat',
  'Spyglass',
  'Clock',
  'Cannon',

  // gems
  'Cut Emerald',
  'Cut Ruby',
  'Cut Sapphire',

  // Renaissance set
  'Saltpeter',

  // Industrial set
  'Microscope',
  'Clockwork', // have enough for stage 2 but not stage 3 which is what it wants
];

export const STRATEGIES: SetMergingStrategy[] = [
  {
    setName: 'Wood',
    mainBps: ['Wood'],
    mainStrategy: { topStage: 6, baseLevel: 51, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 4, baseLevel: 21, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Leather',
    mainBps: ['Rawhide', 'Leather'],
    mainStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 4, baseLevel: 21, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Copper',
    mainBps: ['Copper Ore'],
    mainStrategy: { topStage: 6, baseLevel: 51, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 4, baseLevel: 21, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Bronze',
    mainBps: ['Tin Ore'],
    mainStrategy: { topStage: 6, baseLevel: 51, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 4, baseLevel: 21, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Iron',
    mainBps: ['Coal'],
    mainStrategy: { topStage: 6, baseLevel: 51, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 4, baseLevel: 21, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Precious',
    mainBps: ['Gold Ore'],
    mainStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 0 },
    otherBpsStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 0 },
  },
  {
    setName: 'Renaissance',
    mainBps: ['Compass', 'Gunpowder'],
    mainStrategy: { topStage: 9, baseLevel: 71, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 7, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Industrial',
    mainBps: ['Electrical Parts'],
    mainStrategy: { topStage: 9, baseLevel: 81, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Mining Tools',
    mainBps: ['Gunpowder'],
    mainStrategy: { topStage: 9, baseLevel: 71, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 7, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Science Tools',
    mainBps: ['Compass'],
    mainStrategy: { topStage: 9, baseLevel: 71, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 7, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Exploration',
    mainBps: ['Compass'],
    mainStrategy: { topStage: 9, baseLevel: 71, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 7, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Modern Exploration',
    mainBps: ['Antenna'],
    mainStrategy: { topStage: 9, baseLevel: 81, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 3, baseLevel: 71, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Modern Technology',
    mainBps: ['Light Bulb'],
    mainStrategy: { topStage: 9, baseLevel: 81, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 4, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Cut Gems',
    mainBps: ['Cut Emerald'],
    mainStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 4, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Emerald',
    mainBps: ['Uncut Emerald'],
    mainStrategy: { topStage: 10, baseLevel: 51, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Ruby',
    mainBps: ['Uncut Ruby'],
    mainStrategy: { topStage: 10, baseLevel: 51, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Sapphire',
    mainBps: ['Uncut Sapphire'],
    mainStrategy: { topStage: 10, baseLevel: 51, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Onyx',
    mainBps: ['Uncut Onyx'],
    mainStrategy: { topStage: 9, baseLevel: 71, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 7, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Hammer',
    mainBps: ['Magnificent Hammer'],
    mainStrategy: { topStage: 9, baseLevel: 71, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 7, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Knife',
    mainBps: ['Magnificent Dagger'],
    mainStrategy: { topStage: 9, baseLevel: 71, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 7, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Modern Weapons',
    mainBps: ['Magnificent Bow'],
    mainStrategy: { topStage: 9, baseLevel: 81, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 4, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Music Instruments',
    mainBps: ['Tambourine'],
    mainStrategy: { topStage: 9, baseLevel: 81, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 4, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Vehicles',
    mainBps: ['Combustion Engine'],
    mainStrategy: { topStage: 9, baseLevel: 81, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 3, baseLevel: 71, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Entertainment',
    mainBps: ['Antenna'],
    mainStrategy: { topStage: 9, baseLevel: 81, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 3, baseLevel: 71, plusLevelsPerStage: 10 },
  },
];
