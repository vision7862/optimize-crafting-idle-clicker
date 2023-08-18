import { ProductName } from '../types/Blueprint';

// TODO: GH-4: only merge if there are excess blueprints for that product. for now, hardcode ones the algo wants that i don't have
const BPS_WITHOUT_DUPES: ProductName[] = [
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
const BPS_AT_TOP: ProductName[] = [
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
export const NON_51_PLUS_10_STRATEGY = new Map<ProductName, number>([
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
