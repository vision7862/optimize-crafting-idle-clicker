import { ProductName } from '../types/Blueprint';
import { SetMergingStrategy } from '../types/MergingStrategy';

// TODO: GH-4: only merge if there are excess blueprints for that product. for now, hardcode ones the algo wants that i don't have
export const BPS_WITHOUT_DUPES: ProductName[] = [
  // // income wants
  'Bongos',
  'Harp',
  'Tambourine', // in MWS but not in a regular pack
  'Viola',
  'Harpsichord',
  'Snare Drum',
  'Saxophone',
  // 'Microscope',
  // 'Machine Parts',
  // 'Motor Unit',
  // 'Telephone',
  // 'Steam Boat',
  // 'Locomotive',
  // 'Mechanical Parts', // not event only
  // 'Electro Magnet',
  // 'Clockwork',
  // 'Steam Engine',
  // 'Camera',
  // 'Clock',
  // 'Electrical Parts', // not event only. technically.
  'Combustion Engine',
  'Glider',
  'Bicycle',
  'Truck',
  'Motorcycle',
  'Car',
  'Airplane',
  'Antenna',
  'Movie Projector',
  'Walkie Talkie',
  'TV Set',
  'Microchip',
  'Radio',
  'Monitor',
  'PC',

  // research
  // modern technology
  'Stethoscope',
  'Lamp',
  'Refrigerator',
  'X-ray Machine',
  'Flashlight',
  'Kettle Grill',
  'Stove',
  'Defibrillator',
  'Light Bulb', // in MWS but not in a regular pack

  // science tools - tools pack & more
  // 'Mechanical Parts',
  // 'Compass',
  // 'Sickle',
  // 'Chisel',

  // modern exploration
  'Antenna',
  'Diving Gear',
  'Rocket',
  'Tent',
  'Submarine',
  'Space Probe',

  // exploration - in master & grandmaster packs
  // 'Paper',
  // 'Paper Sheets',

  // // gems
  // 'Cut Emerald',
  // 'Cut Ruby',
  // 'Cut Sapphire',
  // 'Cut Onyx',

  // 'Lump Hammer',
  // 'War Hammer',
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
    setName: 'Modern Resources',
    mainBps: ['Petroleum', 'Ilmenite'],
    mainStrategy: { topStage: 10, baseLevel: 101, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 4, baseLevel: 61, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Refined Modern Resources',
    mainBps: ['Gasoline', 'Diesel', 'Titanium'],
    mainStrategy: { topStage: 10, baseLevel: 101, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 5, baseLevel: 81, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Synthetic Materials',
    mainBps: ['Nylon'],
    mainStrategy: { topStage: 10, baseLevel: 101, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Military Gear',
    mainBps: ['Parachute'],
    mainStrategy: { topStage: 10, baseLevel: 101, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Gaming',
    mainBps: ['Headset'],
    mainStrategy: { topStage: 6, baseLevel: 61, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 5, baseLevel: 61, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Digital Revolution',
    mainBps: ['Tablet Computer'],
    mainStrategy: { topStage: 6, baseLevel: 61, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 5, baseLevel: 61, plusLevelsPerStage: 10 },
  },
  {
    setName: 'Robotics',
    mainBps: ['Robot Parts'],
    mainStrategy: { topStage: 6, baseLevel: 61, plusLevelsPerStage: 10 },
    otherBpsStrategy: { topStage: 5, baseLevel: 61, plusLevelsPerStage: 10 },
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
