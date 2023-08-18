import { BASE_BP } from '../helpers/blueprintObjectHelpers';
import { Blueprint } from '../types/Blueprint';

// strategy 21+10, bottom blueprint for stage 2, 3, 4, etc, and top of stage 4
const s21 = {
  bII: { ...BASE_BP, evolutionStage: 2, score: 60, scoreChangePerLevel: 6 },
  bIII: { ...BASE_BP, evolutionStage: 3, score: 480, scoreChangePerLevel: 48 },
  bIV: { ...BASE_BP, evolutionStage: 4, score: 4800, scoreChangePerLevel: 480 },
  tIV: { ...BASE_BP, evolutionStage: 4, upgradeLevel: 51, score: 28800, scoreChangePerLevel: 480 },
};

// strategy 51+10, bottom blueprint for stage 2, 3, 4, etc
const s51 = {
  bII: { ...BASE_BP, evolutionStage: 2, score: 120, scoreChangePerLevel: 12 },
  bIII: { ...BASE_BP, evolutionStage: 3, score: 1680, scoreChangePerLevel: 168 },
  bIV: { ...BASE_BP, evolutionStage: 4, score: 26880, scoreChangePerLevel: 2688 },
  bV: { ...BASE_BP, evolutionStage: 5, score: 483840, scoreChangePerLevel: 48384 },
};

// strategy 71+10
const s71 = {
  bII: { ...BASE_BP, evolutionStage: 2, score: 160, scoreChangePerLevel: 16 },
  bIII: { ...BASE_BP, evolutionStage: 3, score: 2880, scoreChangePerLevel: 288 },
  bIV: { ...BASE_BP, evolutionStage: 4, score: 57600, scoreChangePerLevel: 5760 },
};

// strategy 81+10
const s81 = {
  bII: { ...BASE_BP, evolutionStage: 2, score: 180, scoreChangePerLevel: 18 },
  bIII: { ...BASE_BP, evolutionStage: 3, score: 1800, scoreChangePerLevel: 180 },
  bIV: { ...BASE_BP, evolutionStage: 4, score: 19800, scoreChangePerLevel: 1980 },
};

export const BLUEPRINT_LIBRARY: Blueprint[] = [
  { ...s51.bV, productName: 'Wood', upgradeLevel: 91, score: 4838400 },
  { ...s21.bIV, productName: 'Club', upgradeLevel: 41, score: 24000 },
  { ...s21.bIV, productName: 'Arrows', upgradeLevel: 41, score: 21000, scoreChangePerLevel: 420 },
  { ...s21.bIV, productName: 'Bow', upgradeLevel: 41, score: 24000 },
  { ...s51.bIV, productName: 'Rawhide', upgradeLevel: 81, score: 241920 },
  { ...s51.bV, productName: 'Leather', upgradeLevel: 81, score: 4354560 },
  { ...s21.tIV, productName: 'Boots' },
  { ...s21.tIV, productName: 'Hilt' },
  { ...s21.tIV, productName: 'Leather Armor' },
  { ...s51.bV, productName: 'Copper Ore', upgradeLevel: 51, score: 2903040 },
  { ...s21.bIV, productName: 'Copper Ingots', upgradeLevel: 51, score: 43200, scoreChangePerLevel: 720 },
  { productName: 'Copper Axe', evolutionStage: 4, upgradeLevel: 51, score: 37800, scoreChangePerLevel: 630 },
  { ...s21.tIV, productName: 'Copper Blades' },
  { ...s21.tIV, productName: 'Copper Knife' },
  { ...s21.bIV, productName: 'Copper Dagger', upgradeLevel: 51, score: 30000, scoreChangePerLevel: 500 },
  { ...s51.bV, productName: 'Tin Ore', upgradeLevel: 61, score: 3386880 },
  { ...s21.bIV, productName: 'Bronze Ingots', upgradeLevel: 51, score: 38880, scoreChangePerLevel: 648 },
  { ...s21.bIV, productName: 'Bronze Spear', upgradeLevel: 51, score: 32400, scoreChangePerLevel: 540 },
  { ...s21.tIV, productName: 'Bronze Shield' },
  { ...s21.tIV, productName: 'Bronze Blades' },
  { ...s21.tIV, productName: 'Bronze Dagger' },
  { ...s21.bIV, productName: 'Bronze Sword', upgradeLevel: 41, score: 24000 },
  { ...BASE_BP, productName: 'Sickle', upgradeLevel: 51, score: 60 },
  { ...s51.bV, productName: 'Coal', upgradeLevel: 61, score: 3386880 },
  { ...s21.bIV, productName: 'Iron Ore', upgradeLevel: 51, score: 39600, scoreChangePerLevel: 660 },
  { ...s21.bIV, productName: 'Iron Ingots', upgradeLevel: 51, score: 32400, scoreChangePerLevel: 540 },
  { ...s51.bIII, productName: 'Chisel', upgradeLevel: 41, score: 8400 },
  { ...s21.tIV, productName: 'Iron Mace' },
  { ...s21.bIV, productName: 'Iron Rivets', upgradeLevel: 51, score: 26100, scoreChangePerLevel: 435 },
  { ...BASE_BP, productName: 'Shovel', upgradeLevel: 41, score: 50 },
  { ...s51.bII, productName: 'Lump Hammer', upgradeLevel: 61, score: 840 },
  { ...s21.tIV, productName: 'Iron Helmet' },
  { ...s21.tIV, productName: 'Iron Plates' },
  { ...s21.bIV, productName: 'Imp. Leather Armor', upgradeLevel: 51, score: 32400, scoreChangePerLevel: 540 },
  { ...s21.bIV, productName: 'Iron Blades', upgradeLevel: 41, score: 24000 },
  { ...s21.bIV, productName: 'Iron Sword', upgradeLevel: 41, score: 25000, scoreChangePerLevel: 500 },
  { ...s21.bIV, productName: 'Iron Armor', upgradeLevel: 41, score: 24000 },
  { ...s21.bIV, productName: 'Iron Claymore', upgradeLevel: 41, score: 25000, scoreChangePerLevel: 500 },
  { ...s51.bV, productName: 'Gold Ore', upgradeLevel: 41, score: 2419200 },
  { ...s51.bIII, productName: 'Gold Ingots' },
  { ...BASE_BP, productName: 'Uncut Emerald', upgradeLevel: 11, score: 20 },
  { ...BASE_BP, productName: 'Gold Ring', upgradeLevel: 51, score: 60 },
  { ...BASE_BP, productName: 'Cut Emerald', upgradeLevel: 51, score: 60 },
  { ...BASE_BP, productName: 'Gold Necklace', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Emerald Ring', upgradeLevel: 11, score: 20 },
  { ...s51.bIII, productName: 'Uncut Ruby', upgradeLevel: 71, score: 13440 },
  { ...BASE_BP, productName: 'Paper Sheets', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Steel', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Pickaxe', upgradeLevel: 41, score: 50 },
  { ...BASE_BP, productName: 'War Hammer', upgradeLevel: 11, score: 20 },
  { ...BASE_BP, productName: 'Steel Blades', upgradeLevel: 21, score: 30 },
  { ...s51.bII, productName: 'Cut Ruby' },
  { ...BASE_BP, productName: 'Map', upgradeLevel: 41, score: 50 },
  { ...s51.bII, productName: 'Ruby Ring' },
  { ...BASE_BP, productName: 'Tent' },
  { ...BASE_BP, productName: 'Katana', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Magnificent Bow', upgradeLevel: 51, score: 60 },
  { ...BASE_BP, productName: 'Magnificent Hilt', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Magnificent Hammer', upgradeLevel: 11, score: 20 },
  { ...BASE_BP, productName: 'Magnificent Dagger', upgradeLevel: 61, score: 70 },
  { ...BASE_BP, productName: 'Magnificent Sword', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Rowboat' },
  { ...s71.bII, productName: 'Uncut Sapphire', upgradeLevel: 61, score: 840 },
  { ...BASE_BP, productName: 'Magnificent Armor', upgradeLevel: 21, score: 30 },
  { ...s51.bII, productName: 'Mechanical Parts', upgradeLevel: 41, score: 600 },
  { ...BASE_BP, productName: 'Spyglass' },
  { ...BASE_BP, productName: 'Magnificent Crossbow', upgradeLevel: 31, score: 40 },
  { ...s51.bII, productName: 'Sulfur' },
  { ...BASE_BP, productName: 'Bongos', upgradeLevel: 41, score: 50 },
  { ...s51.bII, productName: 'Cut Sapphire', upgradeLevel: 51, score: 720 },
  { ...BASE_BP, productName: 'Halberd' },
  { ...s51.bIII, productName: 'Microscope', upgradeLevel: 21, score: 5040 },
  { ...s71.bII, productName: 'Compass', upgradeLevel: 61, score: 1120 },
  { ...BASE_BP, productName: 'Clockwork', upgradeLevel: 31, score: 40 },
  { ...s51.bIII, productName: 'Saltpeter', upgradeLevel: 31, score: 6720 },
  { ...BASE_BP, productName: 'Sapphire Ring' },
  { ...BASE_BP, productName: 'Clock', upgradeLevel: 31, score: 40 },
  { ...s71.bII, productName: 'Gunpowder', upgradeLevel: 61, score: 1120 },
  { ...BASE_BP, productName: 'Uncut Onyx' },
  { ...BASE_BP, productName: 'Weapon Parts' },
  { ...BASE_BP, productName: 'Canvas' },
  { ...s51.bII, productName: 'Saxophone', upgradeLevel: 21, score: 360 },
  { ...BASE_BP, productName: 'Electro Magnet', upgradeLevel: 31, score: 40 },
  { ...BASE_BP, productName: 'Titanium' },
  { ...BASE_BP, productName: 'Kettle Grill' },
  { ...BASE_BP, productName: 'Pistol' },
  { ...s51.bII, productName: 'Bicycle', upgradeLevel: 41, score: 600 },
  { ...BASE_BP, productName: 'Machine Parts', upgradeLevel: 31, score: 40 },
  { ...BASE_BP, productName: 'Camera', upgradeLevel: 31, score: 40 },
  { ...s51.bII, productName: 'Mortar', upgradeLevel: 61, score: 840 },
  { ...BASE_BP, productName: 'Electrical Parts', upgradeLevel: 31, score: 40 },
  { ...s51.bII, productName: 'Stethoscope', upgradeLevel: 21, score: 360 },
  { ...BASE_BP, productName: 'Musket', upgradeLevel: 31, score: 40 },
  { ...BASE_BP, productName: 'Motor Unit', upgradeLevel: 31, score: 40 },
  { ...BASE_BP, productName: 'Caplock Pistol', upgradeLevel: 51, score: 60 },
  { ...BASE_BP, productName: 'Hedge Trimmer', upgradeLevel: 31, score: 40 },
  { ...BASE_BP, productName: 'Steam Engine', upgradeLevel: 31, score: 40 },
  { ...s51.bII, productName: 'Rocket Launcher', upgradeLevel: 31, score: 480 },
  { ...BASE_BP, productName: 'Telephone', upgradeLevel: 31, score: 40 },
  { ...s51.bII, productName: 'Lever Action Rifle', upgradeLevel: 31, score: 480 },
  { ...BASE_BP, productName: 'Steam Boat', upgradeLevel: 31, score: 40 },
  { ...BASE_BP, productName: 'Cannon', upgradeLevel: 41, score: 50 },
  { ...BASE_BP, productName: 'Refrigerator' },
  { ...BASE_BP, productName: 'Locomotive', upgradeLevel: 31, score: 40 },
  { ...BASE_BP, productName: 'Tiki Torch', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Bolt Action Rifle', upgradeLevel: 41, score: 50 },
  { ...BASE_BP, productName: 'Diving Gear' },
  { ...BASE_BP, productName: 'Stove' },
  { ...BASE_BP, productName: 'Combustion Engine', upgradeLevel: 31, score: 40 },
  { ...BASE_BP, productName: 'Motorcycle' },
  { ...s81.bII, productName: 'Antenna', upgradeLevel: 61, score: 1260 },
  { ...BASE_BP, productName: 'Car', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Radio', upgradeLevel: 21, score: 30 },
  { ...s51.bII, productName: 'Truck', upgradeLevel: 41, score: 600 },
  { ...BASE_BP, productName: 'X-ray Machine', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Flashlight', upgradeLevel: 11, score: 20 },
  { ...BASE_BP, productName: 'Movie Projector', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Electric Motor', upgradeLevel: 11, score: 20 },
  { ...BASE_BP, productName: 'Monitor', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Submarine' },
  { ...BASE_BP, productName: 'Lawn Mower', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Defibrillator', upgradeLevel: 11, score: 20 },
  { ...BASE_BP, productName: 'Walkie Talkie', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Space Probe', upgradeLevel: 11, score: 20 },
  { ...BASE_BP, productName: 'TV Set', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Rocket', upgradeLevel: 11, score: 20 },
  { ...BASE_BP, productName: 'Microchip', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'PC', upgradeLevel: 21, score: 30 },
];

// TODO: GH-4: only merge if there are excess blueprints for that product. for now, hardcode ones the algo wants that i don't have
const BPS_WITHOUT_DUPES = [
  'Chisel',
  'Shovel',
  'Lump Hammer',
  'Pickaxe',
  'Map',
  // 'Magnificent Dagger',
  'Bongos',
  'Hedge Trimmer',
  'Lawn Mower',
  'Saxophone',
  'Bicycle',
  'Motorcycle',
  'Car',
  'Rawhide',
  'Leather',
  'Copper Ore',
  'Mortar',
  'Caplock Pistol',
  'Rocket Launcher',
  'Paper Sheets',
  'Truck',
  'Lever Action Rifle',
  'Clockwork',
  'Cut Emerald',
  'Sickle',
];
// TODO: set up the strategy to also allow marking a top tier at which to stop merging. for now put that here
const BPS_AT_TOP = [
  'Wood',
  'Club',
  'Arrows',
  'Bow',
  'Boots',
  'Hilt',
  'Leather Armor',
  'Copper Axe',
  'Copper Ingots',
  'Copper Blades',
  'Copper Knife',
  'Copper Dagger',
  'Bronze Ingots',
  'Bronze Shield',
  'Bronze Blades',
  'Bronze Dagger',
  'Bronze Sword',
  'Bronze Spear',
  'Iron Ore',
  'Iron Ingots',
  'Iron Mace',
  'Iron Rivets',
  'Iron Helmet',
  'Iron Plates',
  'Imp. Leather Armor',
  'Iron Blades',
  'Iron Sword',
  'Iron Armor',
  'Iron Claymore',
];
export const BPS_TO_NOT_MERGE = [...BPS_WITHOUT_DUPES, ...BPS_AT_TOP];

// some blueprints should not use 51+10 strategy. they should use x+10 instead, map product name to x
export const NON_51_PLUS_10_STRATEGY = new Map<string, number>([
  ['Compass', 71],
  ['Light Bulb', 71],
  ['Gunpowder', 71],
  ['Uncut Sapphire', 71],
  ['Uncut Onyx', 71],
  ['Magnificent Dagger', 71],
  ['Magnificent Bow', 81],
  ['Electrical Parts', 81],
  ['Combustion Engine', 81],
  ['Antenna', 81],
  ['Radio', 71],
  ['Movie Projector', 71],
  ['Monitor', 71],
  ['Walkie Talkie', 71],
  ['TV Set', 71],
  ['Microchip', 71],
  ['PC', 71],
  ['Club', 21],
  ['Arrows', 21],
  ['Bow', 21],
  ['Boots', 21],
  ['Hilt', 21],
  ['Leather Armor', 21],
  ['Copper Ingots', 21],
  ['Copper Axe', 21],
  ['Copper Blades', 21],
  ['Copper Knife', 21],
  ['Copper Dagger', 21],
  ['Bronze Ingots', 21],
  ['Bronze Spear', 21],
  ['Bronze Shield', 21],
  ['Bronze Blades', 21],
  ['Bronze Dagger', 21],
  ['Bronze Sword', 21],
  ['Iron Ore', 21],
  ['Iron Ingots', 21],
  ['Iron Mace', 21],
  ['Iron Rivets', 21],
  ['Iron Helmet', 21],
  ['Iron Plates', 21],
  ['Imp. Leather Armor', 21],
  ['Iron Blades', 21],
  ['Iron Sword', 21],
  ['Iron Armor', 21],
  ['Iron Claymore', 21],
]);
