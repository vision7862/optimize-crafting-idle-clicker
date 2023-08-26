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
    mainStrategy: { topStage: 6, xPlusTen: 51 },
    otherBpsStrategy: { topStage: 4, xPlusTen: 21 },
  },
  {
    setName: 'Leather',
    mainBps: ['Rawhide', 'Leather'],
    mainStrategy: { topStage: 5, xPlusTen: 51 },
    otherBpsStrategy: { topStage: 4, xPlusTen: 21 },
  },
  {
    setName: 'Copper',
    mainBps: ['Copper Ore'],
    mainStrategy: { topStage: 6, xPlusTen: 51 },
    otherBpsStrategy: { topStage: 4, xPlusTen: 21 },
  },
  {
    setName: 'Bronze',
    mainBps: ['Tin Ore'],
    mainStrategy: { topStage: 6, xPlusTen: 51 },
    otherBpsStrategy: { topStage: 4, xPlusTen: 21 },
  },
  {
    setName: 'Iron',
    mainBps: ['Coal'],
    mainStrategy: { topStage: 6, xPlusTen: 51 },
    otherBpsStrategy: { topStage: 4, xPlusTen: 21 },
  },
  {
    setName: 'Precious',
    mainBps: ['Gold Ore'],
    mainStrategy: { topStage: 6, xPlusTen: 51 },
    otherBpsStrategy: { topStage: 5, xPlusTen: 51 },
  },
  {
    setName: 'Renaissance',
    mainBps: ['Compass', 'Gunpowder'],
    mainStrategy: { topStage: 9, xPlusTen: 71 },
    otherBpsStrategy: { topStage: 7, xPlusTen: 51 },
  },
  {
    setName: 'Industrial',
    mainBps: ['Electrical Parts'],
    mainStrategy: { topStage: 9, xPlusTen: 81 },
    otherBpsStrategy: { topStage: 5, xPlusTen: 51 },
  },
  {
    setName: 'Mining Tools',
    mainBps: ['Gunpowder'],
    mainStrategy: { topStage: 9, xPlusTen: 71 },
    otherBpsStrategy: { topStage: 4, xPlusTen: 51 },
  },
  {
    setName: 'Science Tools',
    mainBps: ['Compass'],
    mainStrategy: { topStage: 9, xPlusTen: 71 },
    otherBpsStrategy: { topStage: 7, xPlusTen: 51 },
  },
  {
    setName: 'Exploration',
    mainBps: ['Compass'],
    mainStrategy: { topStage: 9, xPlusTen: 71 },
    otherBpsStrategy: { topStage: 7, xPlusTen: 51 },
  },
  {
    setName: 'Modern Exploration',
    mainBps: ['Antenna'],
    mainStrategy: { topStage: 9, xPlusTen: 81 },
    otherBpsStrategy: { topStage: 3, xPlusTen: 71 },
  },
  {
    setName: 'Modern Technology',
    mainBps: ['Light Bulb'],
    mainStrategy: { topStage: 9, xPlusTen: 81 },
    otherBpsStrategy: { topStage: 4, xPlusTen: 51 },
  },
  {
    setName: 'Cut Gems',
    mainBps: ['Cut Emerald'],
    mainStrategy: { topStage: 5, xPlusTen: 51 },
    otherBpsStrategy: { topStage: 4, xPlusTen: 51 },
  },
  {
    setName: 'Emerald',
    mainBps: ['Uncut Emerald'],
    mainStrategy: { topStage: 10, xPlusTen: 51 },
    otherBpsStrategy: { topStage: 5, xPlusTen: 51 },
  },
  {
    setName: 'Ruby',
    mainBps: ['Uncut Ruby'],
    mainStrategy: { topStage: 10, xPlusTen: 51 },
    otherBpsStrategy: { topStage: 5, xPlusTen: 51 },
  },
  {
    setName: 'Sapphire',
    mainBps: ['Uncut Sapphire'],
    mainStrategy: { topStage: 10, xPlusTen: 51 },
    otherBpsStrategy: { topStage: 5, xPlusTen: 51 },
  },
  {
    setName: 'Onyx',
    mainBps: ['Uncut Onyx'],
    mainStrategy: { topStage: 9, xPlusTen: 71 },
    otherBpsStrategy: { topStage: 7, xPlusTen: 51 },
  },
  {
    setName: 'Hammer',
    mainBps: ['Magnificent Hammer'],
    mainStrategy: { topStage: 9, xPlusTen: 71 },
    otherBpsStrategy: { topStage: 7, xPlusTen: 51 },
  },
  {
    setName: 'Knife',
    mainBps: ['Magnificent Dagger'],
    mainStrategy: { topStage: 9, xPlusTen: 71 },
    otherBpsStrategy: { topStage: 7, xPlusTen: 51 },
  },
  {
    setName: 'Modern Weapons',
    mainBps: ['Magnificent Bow'],
    mainStrategy: { topStage: 9, xPlusTen: 81 },
    otherBpsStrategy: { topStage: 4, xPlusTen: 51 },
  },
  {
    setName: 'Music Instruments',
    mainBps: ['Tambourine'],
    mainStrategy: { topStage: 9, xPlusTen: 81 },
    otherBpsStrategy: { topStage: 4, xPlusTen: 51 },
  },
  {
    setName: 'Vehicles',
    mainBps: ['Combustion Engine'],
    mainStrategy: { topStage: 9, xPlusTen: 81 },
    otherBpsStrategy: { topStage: 3, xPlusTen: 71 },
  },
  {
    setName: 'Entertainment',
    mainBps: ['Antenna'],
    mainStrategy: { topStage: 9, xPlusTen: 81 },
    otherBpsStrategy: { topStage: 3, xPlusTen: 71 },
  },
];
