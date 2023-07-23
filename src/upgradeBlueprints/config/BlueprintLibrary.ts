import { Blueprint } from '../types/Blueprint';

// these defaults are for the 51+10 strategy
export const BOTTOM_STAGE_1: Blueprint = {
  productName: 'productName',
  evolutionStage: 1,
  upgradeLevel: 1,
  score: 10,
  scoreChangePerLevel: 1,
};

export const TOP_STAGE_1: Blueprint = {
  ...BOTTOM_STAGE_1,
  upgradeLevel: 51,
  score: BOTTOM_STAGE_1.score + (BOTTOM_STAGE_1.score / 10) * 50,
};

export const BOTTOM_STAGE_2: Blueprint = {
  ...BOTTOM_STAGE_1,
  evolutionStage: 2,
  score: (BOTTOM_STAGE_1.score + (BOTTOM_STAGE_1.score / 10) * 50) * 2,
  scoreChangePerLevel:
    ((BOTTOM_STAGE_1.scoreChangePerLevel * (BOTTOM_STAGE_1.score + (BOTTOM_STAGE_1.score / 10) * 50)) / 10) * 2,
};

export const TOP_STAGE_2: Blueprint = {
  ...BOTTOM_STAGE_2,
  upgradeLevel: 61,
  score: BOTTOM_STAGE_2.score + (BOTTOM_STAGE_2.score / 10) * 60,
};

export const BOTTOM_STAGE_3: Blueprint = {
  ...BOTTOM_STAGE_1,
  evolutionStage: 3,
  score: (BOTTOM_STAGE_2.score + (BOTTOM_STAGE_2.score / 10) * 60) * 2,
  scoreChangePerLevel: BOTTOM_STAGE_2.scoreChangePerLevel * 14,
};

export const TOP_STAGE_3: Blueprint = {
  ...BOTTOM_STAGE_3,
  upgradeLevel: 71,
  score: BOTTOM_STAGE_3.score + (BOTTOM_STAGE_3.score / 10) * 70,
};

export function getBottomOfStageBP(evolutionStage: number, strategy: number): Blueprint {
  const topStage1Score = BOTTOM_STAGE_1.score + (BOTTOM_STAGE_1.score / 10) * (strategy - 1);
  const topStage2Score = topStage1Score * 2 + ((topStage1Score * 2) / 10) * (strategy - 1 + 10);
  const topStage3Score = topStage2Score * 2 + ((topStage2Score * 2) / 10) * (strategy - 1 + 20);
  const topStage4Score = topStage3Score * 2 + ((topStage3Score * 2) / 10) * (strategy - 1 + 30);
  const topStage5Score = topStage4Score * 2 + ((topStage4Score * 2) / 10) * (strategy - 1 + 40);
  const topStage6Score = topStage5Score * 2 + ((topStage5Score * 2) / 10) * (strategy - 1 + 50);
  const topStage7Score = topStage6Score * 2 + ((topStage6Score * 2) / 10) * (strategy - 1 + 60);
  const topStage8Score = topStage7Score * 2 + ((topStage7Score * 2) / 10) * (strategy - 1 + 70);
  const topStage9Score = topStage8Score * 2 + ((topStage8Score * 2) / 10) * (strategy - 1 + 80);
  const topStage10Score = topStage9Score * 2 + ((topStage9Score * 2) / 10) * (strategy - 1 + 90);

  // stage to top score
  const topStageScores = new Map<number, number>([
    [1, topStage1Score],
    [2, topStage2Score],
    [3, topStage3Score],
    [4, topStage4Score],
    [5, topStage5Score],
    [6, topStage6Score],
    [7, topStage7Score],
    [8, topStage8Score],
    [9, topStage9Score],
    [10, topStage10Score],
  ]);
  if (evolutionStage === 1) {
    return BOTTOM_STAGE_1;
  } else {
    return {
      ...BOTTOM_STAGE_1,
      evolutionStage: evolutionStage + 1,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      score: topStageScores.get(evolutionStage)! * 2,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      scoreChangePerLevel: (topStageScores.get(evolutionStage)! / 10) * 2,
    };
  }
}

export const BLUEPRINT_LIBRARY: Blueprint[] = [
  { ...TOP_STAGE_3, productName: 'Wood' },
  { ...BOTTOM_STAGE_1, productName: 'Club', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Arrows', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Bow', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_3, productName: 'Rawhide', upgradeLevel: 51, score: 10080 },
  { ...BOTTOM_STAGE_1, productName: 'Leather', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Boots', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Hilt', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Leather Armor', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_2, productName: 'Copper Ore', upgradeLevel: 51, score: 720, scoreChangePerLevel: 12 },
  { ...BOTTOM_STAGE_2, productName: 'Copper Ingots', upgradeLevel: 51, score: 720 },
  { ...BOTTOM_STAGE_3, productName: 'Copper Axe', upgradeLevel: 11, score: 720, scoreChangePerLevel: 36 },
  { ...BOTTOM_STAGE_1, productName: 'Copper Blades', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_3, productName: 'Copper Knife', upgradeLevel: 1, score: 480, scoreChangePerLevel: 48 },
  { ...BOTTOM_STAGE_1, productName: 'Copper Dagger', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_2, productName: 'Tin Ore', upgradeLevel: 51, score: 720 },
  { ...TOP_STAGE_1, productName: 'Bronze Ingots' },
  { ...TOP_STAGE_1, productName: 'Bronze Spear' },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Shield', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Blades', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Dagger', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Bronze Sword', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_2, productName: 'Coal', upgradeLevel: 41, score: 600 },
  { ...BOTTOM_STAGE_2, productName: 'Coal' },
  { ...BOTTOM_STAGE_2, productName: 'Iron Ore', upgradeLevel: 41, score: 600 },
  { ...TOP_STAGE_1, productName: 'Iron Ingots' },
  { ...BOTTOM_STAGE_1, productName: 'Chisel', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Mace', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Rivets', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Shovel', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Lump Hammer', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Helmet', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Plates', upgradeLevel: 11, score: 20 },
  { ...TOP_STAGE_1, productName: 'Imp. Leather Armor' },
  { ...BOTTOM_STAGE_1, productName: 'Iron Blades', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Sword', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Armor', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Iron Claymore', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_2, productName: 'Gold Ore', upgradeLevel: 41, score: 600 },
  { ...BOTTOM_STAGE_2, productName: 'Gold Ingots', upgradeLevel: 41, score: 600 },
  { ...BOTTOM_STAGE_1, productName: 'Uncut Emerald' },
  { ...TOP_STAGE_1, productName: 'Gold Ring' },
  { ...BOTTOM_STAGE_1, productName: 'Gold Necklace' },
  { ...BOTTOM_STAGE_1, productName: 'Steel' },
  { ...BOTTOM_STAGE_1, productName: 'Pickaxe', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'War Hammer' },
  { ...BOTTOM_STAGE_1, productName: 'Steel Blades' },
  { ...BOTTOM_STAGE_1, productName: 'Map', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Katana' },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Bow', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Hilt' },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Hammer' },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Sword' },
  { ...BOTTOM_STAGE_1, productName: 'Uncut Sapphire' },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Armor' },
  { ...BOTTOM_STAGE_2, productName: 'Mechanical Parts', upgradeLevel: 31, score: 480 },
  { ...BOTTOM_STAGE_1, productName: 'Magnificent Crossbow', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Sulfur', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Bongos', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Cut Sapphire' },
  { ...BOTTOM_STAGE_1, productName: 'Microscope', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Compass', upgradeLevel: 61, score: 70 },
  { ...BOTTOM_STAGE_1, productName: 'Clockwork', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Saltpeter', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Gunpowder', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Saxophone', upgradeLevel: 41, score: 50 },
  { ...BOTTOM_STAGE_1, productName: 'Electro Magnet', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Machine Parts', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Camera', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Mortar', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Stethoscope', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Musket', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Motor Unit', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Hedge Trimmer', upgradeLevel: 31, score: 40 },
  { ...BOTTOM_STAGE_1, productName: 'Steam Engine', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Rocket Launcher', upgradeLevel: 11, score: 20 },
  { ...BOTTOM_STAGE_1, productName: 'Telephone', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Steam Boat', upgradeLevel: 21, score: 30 },
  { ...BOTTOM_STAGE_1, productName: 'Cannon', upgradeLevel: 11, score: 20 },
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

// TODO: GH-4: only merge if there are excess blueprints for that product. for now, hardcode ones the algo wants that i don't have
export const BPS_WITHOUT_DUPES = ['Chisel', 'Map', 'Bongos', 'Copper Axe'];

// some blueprints should not use 51+10 strategy. they should use x+10 instead, map product name to x
export const NON_51_PLUS_10_STRATEGY = new Map<string, number>([
  ['Compass', 71],
  ['Club', 21],
  ['Arrows', 21],
  ['Bow', 21],
  ['Boots', 21],
  ['Hilt', 21],
  ['Leather Armor', 21],
  ['Copper Ingot', 21],
  ['Copper Axe', 21],
  ['Copper Blades', 21],
  ['Copper Knife', 21],
  ['Copper Dagger', 21],
  ['Bronze Spear', 21],
  ['Bronze Shield', 21],
  ['Bronze Blades', 21],
  ['Bronze Dagger', 21],
  ['Bronze Sword', 21],
  ['Chisel', 21],
  ['Iron Mace', 21],
  ['Iron Helmet', 21],
  ['Iron Plates', 21],
  ['Imp. Leather Armor', 21],
  ['Iron Blades', 21],
  ['Iron Sword', 21],
  ['Iron Armor', 21],
  ['Iron Claymore', 21],
]);
