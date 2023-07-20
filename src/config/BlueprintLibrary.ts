import { Blueprint } from '../types/Blueprint';

export const BOTTOM_STAGE_1: Blueprint = {
  productName: 'productName',
  evolutionStage: 1,
  upgradeLevel: 1,
  score: 10,
};

export const TOP_STAGE_1: Blueprint = {
  ...BOTTOM_STAGE_1,
  upgradeLevel: 51,
  score: BOTTOM_STAGE_1.score + (BOTTOM_STAGE_1.score / 10) * 50,
};

export const BOTTOM_STAGE_2: Blueprint = {
  ...BOTTOM_STAGE_1,
  evolutionStage: 2,
  score: TOP_STAGE_1.score * 2,
};

export const TOP_STAGE_2: Blueprint = {
  ...BOTTOM_STAGE_2,
  upgradeLevel: 61,
  score: BOTTOM_STAGE_2.score + (BOTTOM_STAGE_2.score / 10) * 60,
};

export const BOTTOM_STAGE_3: Blueprint = {
  ...BOTTOM_STAGE_1,
  evolutionStage: 3,
  score: TOP_STAGE_2.score * 2,
};

export const TOP_STAGE_3: Blueprint = {
  ...BOTTOM_STAGE_3,
  upgradeLevel: 71,
  score: BOTTOM_STAGE_3.score + (BOTTOM_STAGE_3.score / 10) * 70,
};

export const BLUEPRINT_LIBRARY: Blueprint[] = [
  { ...TOP_STAGE_3, productName: 'Wood' },
  { ...BOTTOM_STAGE_1, productName: 'Club', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Club' },
  { ...BOTTOM_STAGE_1, productName: 'Club' },
  { ...BOTTOM_STAGE_1, productName: 'Club' },
  { ...BOTTOM_STAGE_1, productName: 'Arrows', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Arrows' },
  { ...BOTTOM_STAGE_1, productName: 'Arrows' },
  { ...BOTTOM_STAGE_1, productName: 'Arrows' },
  { ...BOTTOM_STAGE_1, productName: 'Bow', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Bow' },
  { ...BOTTOM_STAGE_1, productName: 'Bow' },
  { ...BOTTOM_STAGE_1, productName: 'Bow' },
  { ...BOTTOM_STAGE_3, productName: 'Rawhide', upgradeLevel: 51, score: 10080 },
  { ...BOTTOM_STAGE_1, productName: 'Leather', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Leather' },
  { ...BOTTOM_STAGE_1, productName: 'Leather' },
  { ...BOTTOM_STAGE_1, productName: 'Leather' },
  { ...BOTTOM_STAGE_1, productName: 'Boots', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Boots' },
  { ...BOTTOM_STAGE_1, productName: 'Boots' },
  { ...BOTTOM_STAGE_1, productName: 'Boots' },
  { ...BOTTOM_STAGE_1, productName: 'Hilt', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Hilt' },
  { ...BOTTOM_STAGE_1, productName: 'Hilt' },
  { ...BOTTOM_STAGE_1, productName: 'Hilt' },
  { ...BOTTOM_STAGE_1, productName: 'Leather Armor', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Leather Armor' },
  { ...BOTTOM_STAGE_2, productName: 'Copper Ore' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Ore' },
  { ...BOTTOM_STAGE_2, productName: 'Copper Ingots', upgradeLevel: 51, score: 720 },
  { ...BOTTOM_STAGE_1, productName: 'Copper Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Ingots' },
  { ...BOTTOM_STAGE_2, productName: 'Copper Axe', upgradeLevel: 51, score: 720 },
  { ...BOTTOM_STAGE_1, productName: 'Copper Axe' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Axe' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Axe' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Axe' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Axe' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Axe' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Blades', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Copper Blades' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Blades' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Blades' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Knife', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Copper Knife' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Knife' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Knife' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Dagger', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Copper Dagger' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Dagger' },
  { ...BOTTOM_STAGE_1, productName: 'Copper Dagger' },
  { ...BOTTOM_STAGE_2, productName: 'Tin Ore', upgradeLevel: 51, score: 720 },
  { ...TOP_STAGE_1, productName: 'Bronze Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Ingots' },
  { ...TOP_STAGE_1, productName: 'Bronze Spear' },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Spear' },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Shield', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Shield' },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Blades', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Blades' },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Dagger', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Dagger' },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Sword', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Sword' },
  { ...BOTTOM_STAGE_2, productName: 'Coal', upgradeLevel: 41, score: 600 },
  { ...BOTTOM_STAGE_2, productName: 'Coal' },
  { ...BOTTOM_STAGE_1, productName: 'Coal' },
  { ...BOTTOM_STAGE_1, productName: 'Coal' },
  { ...BOTTOM_STAGE_1, productName: 'Coal' },
  { ...BOTTOM_STAGE_1, productName: 'Coal' },
  { ...BOTTOM_STAGE_2, productName: 'Iron Ore', upgradeLevel: 41, score: 600 },
  { ...BOTTOM_STAGE_2, productName: 'Iron Ore' },
  { ...BOTTOM_STAGE_2, productName: 'Iron Ore' },
  { ...BOTTOM_STAGE_2, productName: 'Iron Ore' },
  { ...BOTTOM_STAGE_2, productName: 'Iron Ore' },
  { ...BOTTOM_STAGE_2, productName: 'Iron Ore' },
  { ...BOTTOM_STAGE_2, productName: 'Iron Ore' },
  { ...TOP_STAGE_1, productName: 'Iron Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Chisel', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Mace', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Mace' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Mace' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Mace' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Rivets', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Rivets' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Rivets' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Rivets' },
  { ...BOTTOM_STAGE_1, productName: 'Shovel', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Lump Hammer', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Helmet', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Helmet' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Helmet' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Helmet' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Plates', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Plates' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Plates' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Plates' },
  { ...TOP_STAGE_1, productName: 'Imp. Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Imp. Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Imp. Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Imp. Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Imp. Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Imp. Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Blades', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Blades' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Sword', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Sword' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Sword' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Sword' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Armor', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Claymore', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Claymore' },
  { ...BOTTOM_STAGE_2, productName: 'Gold Ore', upgradeLevel: 41, score: 600 },
  { ...BOTTOM_STAGE_1, productName: 'Gold Ore' },
  { ...BOTTOM_STAGE_2, productName: 'Gold Ingots', upgradeLevel: 41, score: 600 },
  { ...BOTTOM_STAGE_1, productName: 'Gold Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Gold Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Gold Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Gold Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Gold Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Gold Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Gold Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Uncut Emerald' },
  { ...TOP_STAGE_1, productName: 'Gold Ring' },
  { ...BOTTOM_STAGE_1, productName: 'Gold Necklace' },
  { ...BOTTOM_STAGE_1, productName: 'Steel' },
  { ...BOTTOM_STAGE_1, productName: 'Pickaxe', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'War Hammer' },
  { ...BOTTOM_STAGE_1, productName: 'Steel Blades' },
  { ...BOTTOM_STAGE_1, productName: 'Map', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Katana' },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Bow' },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Hilt' },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Hammer' },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Sword' },
  { ...BOTTOM_STAGE_1, productName: 'Uncut Sapphire' },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Armor' },
  { ...BOTTOM_STAGE_2, productName: 'Mechanical Parts', upgradeLevel: 11, score: 240 },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Crossbow', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Sulfur', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Bongos', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Cut Sapphire' },
  { ...BOTTOM_STAGE_1, productName: 'Microscope', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Compass', upgradeLevel: 61, score: 70 },
  { ...BOTTOM_STAGE_1, productName: 'Clockwork', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Saltpeter', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Gunpowder', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Saxophone', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Electro Magnet', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Machine Parts', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Camera', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Stethoscope', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Musket', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Motor Unit', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Hedge Trimmer', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Steam Engine', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Telephone', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Steam Boat', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Locomotive', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Tiki Torch', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Combustion Engine', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_2, productName: 'Antenna', upgradeLevel: 11, score: 240 },
  { ...BOTTOM_STAGE_1, productName: 'Car', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Truck', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'X-Ray Machine', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Flashlight', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Movie Projector', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Electric Motor', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Monitor' },
  { ...BOTTOM_STAGE_1, productName: 'Lawn Mower', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Defibrillator', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Space Probe', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'TV Set' },
  { ...BOTTOM_STAGE_1, productName: 'Rocket', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Microchip' },
  { ...BOTTOM_STAGE_1, productName: 'PC' },
];

// for BPs without all details in MainWorkshop.txt, maps name to upgrade cost of when at lvl 1
export const BUILD_COST_OF_BPS_WITHOUT_DETAILS = new Map<string, number>([
  ['Hedge Trimmer', 117],
  ['Tiki Torch', 122],
  ['Lawn Mower', 127],
  ['Stethoscope', 113],
  ['X-Ray Machine', 125],
]);

// TODO: only merge if there are excess blueprints for that product. for now, hardcode ones the algo wants that i don't have
export const BPS_WITHOUT_DUPES = ['Chisel', 'Map', 'Compass'];
