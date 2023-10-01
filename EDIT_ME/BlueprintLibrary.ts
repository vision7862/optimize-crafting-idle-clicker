import { BASE_BP } from '../src/upgradeBlueprints/helpers/blueprintObjectHelpers';
import { Blueprint, ProductName } from '../src/upgradeBlueprints/types/Blueprint';

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
  bVI: { ...BASE_BP, evolutionStage: 6, score: 9676800, scoreChangePerLevel: 967680 },
};

// strategy 61+10, bottom blueprint for stage 2, 3, 4, etc
const s61 = {
  bII: { ...BASE_BP, evolutionStage: 2, score: 140, scoreChangePerLevel: 14 },
  bIII: { ...BASE_BP, evolutionStage: 3, score: 2240, scoreChangePerLevel: 224 },
  bIV: { ...BASE_BP, evolutionStage: 4, score: 40320, scoreChangePerLevel: 4032 },
  bV: { ...BASE_BP, evolutionStage: 5, score: 806400, scoreChangePerLevel: 80640 },
  bVI: { ...BASE_BP, evolutionStage: 6, score: 17740800, scoreChangePerLevel: 1774080 },
};

// strategy 71+10
const s71 = {
  bII: { ...BASE_BP, evolutionStage: 2, score: 160, scoreChangePerLevel: 16 },
  bIII: { ...BASE_BP, evolutionStage: 3, score: 2880, scoreChangePerLevel: 288 },
  bIV: { ...BASE_BP, evolutionStage: 4, score: 57600, scoreChangePerLevel: 5760 },
  bV: { ...BASE_BP, evolutionStage: 5, score: 1267200, scoreChangePerLevel: 126720 },
  bVI: { ...BASE_BP, evolutionStage: 6, score: 30412800, scoreChangePerLevel: 3041280 },
};

// strategy 81+10
const s81 = {
  bII: { ...BASE_BP, evolutionStage: 2, score: 180, scoreChangePerLevel: 18 },
  bIII: { ...BASE_BP, evolutionStage: 3, score: 3600, scoreChangePerLevel: 360 },
  bIV: { ...BASE_BP, evolutionStage: 4, score: 79200, scoreChangePerLevel: 7920 },
  bV: { ...BASE_BP, evolutionStage: 5, score: 1900800, scoreChangePerLevel: 190080 },
};

// strategy 101+10
const s101 = {
  bII: { ...BASE_BP, evolutionStage: 2, score: 220, scoreChangePerLevel: 22 },
  bIII: { ...BASE_BP, evolutionStage: 3, score: 5280, scoreChangePerLevel: 528 },
  bIV: { ...BASE_BP, evolutionStage: 4, score: 137280, scoreChangePerLevel: 13728 },
  bV: { ...BASE_BP, evolutionStage: 5, score: 3843840, scoreChangePerLevel: 384384 },
  bVI: { ...BASE_BP, evolutionStage: 6, score: 115315200, scoreChangePerLevel: 11531520 },
};

// flat 51
const f51 = {
  bII: { ...BASE_BP, evolutionStage: 2, score: 120, scoreChangePerLevel: 12 },
  bIII: { ...BASE_BP, evolutionStage: 3, score: 1440, scoreChangePerLevel: 144 },
  bIV: { ...BASE_BP, evolutionStage: 4, score: 17280, scoreChangePerLevel: 1728 },
  bV: { ...BASE_BP, evolutionStage: 5, score: 207360, scoreChangePerLevel: 20736 },
};

// flat 101
const f101 = {
  bII: { ...BASE_BP, evolutionStage: 2, score: 220, scoreChangePerLevel: 22 },
  bIII: { ...BASE_BP, evolutionStage: 3, score: 4840, scoreChangePerLevel: 484 },
  bIV: { ...BASE_BP, evolutionStage: 4, score: 106480, scoreChangePerLevel: 10648 },
  bV: { ...BASE_BP, evolutionStage: 5, score: 2342560, scoreChangePerLevel: 234256 },
  bVI: { ...BASE_BP, evolutionStage: 6, score: 51536320, scoreChangePerLevel: 5153632 },
};

export const BLUEPRINT_LIBRARY: Blueprint[] = [
  { ...s51.bVI, productName: 'Wood', upgradeLevel: 91, score: 96768000 },
  { ...s21.bIV, productName: 'Club', upgradeLevel: 41, score: 24000 },
  { ...s21.bIV, productName: 'Arrows', upgradeLevel: 41, score: 21000, scoreChangePerLevel: 420 },
  { ...s21.bIV, productName: 'Bow', upgradeLevel: 41, score: 24000 },
  { ...s51.bV, productName: 'Rawhide', upgradeLevel: 91, score: 4838400 },
  { ...s51.bV, productName: 'Leather', upgradeLevel: 87, score: 4644864 },
  { ...s21.tIV, productName: 'Boots' },
  { ...s21.tIV, productName: 'Hilt' },
  { ...s21.tIV, productName: 'Leather Armor' },
  { ...s51.bVI, productName: 'Copper Ore' },
  { ...s21.bIV, productName: 'Copper Ingots', upgradeLevel: 51, score: 43200, scoreChangePerLevel: 720 },
  { productName: 'Copper Axe', evolutionStage: 4, upgradeLevel: 51, score: 37800, scoreChangePerLevel: 630 },
  { ...s21.tIV, productName: 'Copper Blades' },
  { ...s21.tIV, productName: 'Copper Knife' },
  { ...s21.bIV, productName: 'Copper Dagger', upgradeLevel: 51, score: 30000, scoreChangePerLevel: 500 },
  { ...s51.bVI, productName: 'Tin Ore', upgradeLevel: 11, score: 19353600 },
  { ...s21.bIV, productName: 'Bronze Ingots', upgradeLevel: 51, score: 38880, scoreChangePerLevel: 648 },
  { ...s21.bIV, productName: 'Bronze Spear', upgradeLevel: 51, score: 32400, scoreChangePerLevel: 540 },
  { ...s21.tIV, productName: 'Bronze Shield' },
  { ...s21.tIV, productName: 'Bronze Blades' },
  { ...s21.tIV, productName: 'Bronze Dagger' },
  { ...s21.bIV, productName: 'Bronze Sword', upgradeLevel: 41, score: 24000 },
  { ...s51.bV, productName: 'Sickle' },
  { ...s51.bVI, productName: 'Coal', upgradeLevel: 11, score: 19353600 },
  { ...s21.bIV, productName: 'Iron Ore', upgradeLevel: 51, score: 39600, scoreChangePerLevel: 660 },
  { ...s21.bIV, productName: 'Iron Ingots', upgradeLevel: 51, score: 32400, scoreChangePerLevel: 540 },
  { ...s51.bV, productName: 'Chisel' },
  { ...s21.tIV, productName: 'Iron Mace' },
  { ...s21.bIV, productName: 'Iron Rivets', upgradeLevel: 51, score: 26100, scoreChangePerLevel: 435 },
  { ...s51.bV, productName: 'Shovel' },
  { ...s51.bV, productName: 'Lump Hammer' },
  { ...s21.tIV, productName: 'Iron Helmet' },
  { ...s21.tIV, productName: 'Iron Plates' },
  { ...s21.bIV, productName: 'Imp. Leather Armor', upgradeLevel: 51, score: 32400, scoreChangePerLevel: 540 },
  { ...s21.bIV, productName: 'Iron Blades', upgradeLevel: 41, score: 24000 },
  { ...s21.bIV, productName: 'Iron Sword', upgradeLevel: 41, score: 25000, scoreChangePerLevel: 500 },
  { ...s21.bIV, productName: 'Iron Armor', upgradeLevel: 41, score: 24000 },
  { ...s21.bIV, productName: 'Iron Claymore', upgradeLevel: 41, score: 25000, scoreChangePerLevel: 500 },
  { ...s51.bIV, productName: 'Paper', upgradeLevel: 71, score: 215040 },
  { ...s51.bV, productName: 'Gold Ore', upgradeLevel: 91, score: 4838400 },
  { ...f51.bV, productName: 'Gold Ingots', upgradeLevel: 31, score: 1059840, scoreChangePerLevel: 26496 },
  { ...s51.bVI, productName: 'Uncut Emerald' },
  { ...f51.bV, productName: 'Gold Ring', upgradeLevel: 31, score: 829440 },
  { ...s51.bV, productName: 'Cut Emerald', upgradeLevel: 91, score: 4838400 },
  { ...f51.bV, productName: 'Gold Necklace', upgradeLevel: 31, score: 829440 },
  { ...s51.bVI, productName: 'Emerald Ring' },
  { ...s51.bVI, productName: 'Uncut Ruby', upgradeLevel: 101, score: 106444800 },
  { ...s51.bIV, productName: 'Paper Sheets', upgradeLevel: 71, score: 215040 },
  { ...f51.bV, productName: 'Steel', upgradeLevel: 31, score: 829440 },
  { ...s51.bV, productName: 'Pickaxe' },
  { ...s51.bIV, productName: 'War Hammer', upgradeLevel: 81, score: 241920 },
  { ...f51.bV, productName: 'Steel Blades', upgradeLevel: 31, score: 829440 },
  { ...s51.bV, productName: 'Cut Ruby' },
  { ...s51.bIV, productName: 'Map' },
  { ...s51.bV, productName: 'Ruby Ring' },
  { ...s51.bIV, productName: 'Book', upgradeLevel: 61, score: 188160 },
  { ...BASE_BP, productName: 'Tent' },
  { ...f51.bV, productName: 'Katana', upgradeLevel: 31, score: 829440 },
  { ...s81.bV, productName: 'Magnificent Bow', upgradeLevel: 121, score: 24710400 },
  { ...f51.bV, productName: 'Magnificent Hilt', upgradeLevel: 31, score: 829440 },
  { ...s71.bV, productName: 'Magnificent Hammer', upgradeLevel: 71, score: 10137600 },
  { ...s71.bV, productName: 'Magnificent Dagger', upgradeLevel: 41, score: 6336000 },
  { ...s51.bV, productName: 'Magnificent Sword', upgradeLevel: 31, score: 864000, scoreChangePerLevel: 21600 }, // intended to be f51 so score change needs to be included
  { ...s51.bIV, productName: 'Rowboat' },
  { ...s71.bIV, productName: 'Uncut Sapphire' },
  { ...f51.bV, productName: 'Magnificent Armor', upgradeLevel: 21, score: 622080 },
  { ...s51.bVI, productName: 'Mechanical Parts', upgradeLevel: 101, score: 106444800 },
  { ...s51.bIII, productName: 'Spyglass', upgradeLevel: 71, score: 13440 },
  { ...s51.bVI, productName: 'Magnificent Crossbow' },
  { ...s51.bV, productName: 'Sulfur' },
  { ...s51.bIII, productName: 'Bongos', upgradeLevel: 71, score: 13440 },
  { ...s101.bIII, productName: 'Petroleum', upgradeLevel: 101, score: 580080 },
  { ...s51.bIII, productName: 'Cut Sapphire', upgradeLevel: 71, score: 13440 },
  { ...s51.bV, productName: 'Halberd', upgradeLevel: 11, score: 967680 },
  { ...s51.bIV, productName: 'Microscope', upgradeLevel: 81, score: 241920 },
  { ...s71.bVI, productName: 'Compass', upgradeLevel: 121, score: 395366400 },
  { ...s81.bIII, productName: 'Cloth', upgradeLevel: 91, score: 36000 },
  { ...s51.bIV, productName: 'Clockwork', upgradeLevel: 71, score: 215040 },
  { ...s51.bIII, productName: 'Harp', upgradeLevel: 71, score: 13440 },
  { ...s51.bV, productName: 'Saltpeter', upgradeLevel: 81, score: 4354560 },
  { ...s81.bIV, productName: 'Tambourine', upgradeLevel: 71, score: 633600 },
  { ...s61.bIII, productName: 'Chlorine' },
  { ...s51.bIII, productName: 'Sapphire Ring' },
  { ...s51.bII, productName: 'Titanium Chloride', upgradeLevel: 21, score: 360 },
  { ...s51.bIV, productName: 'Clock', upgradeLevel: 71, score: 215040 },
  { ...s101.bIII, productName: 'Ilmenite', upgradeLevel: 71, score: 42240 },
  { ...s51.bII, productName: 'Viola', upgradeLevel: 51, score: 720 },
  { ...s71.bVI, productName: 'Gunpowder', upgradeLevel: 91, score: 304128000 },
  { ...s61.bIII, productName: 'Ethylene' },
  { ...s71.bIII, productName: 'Uncut Onyx', upgradeLevel: 91, score: 28800 },
  { ...s61.bIII, productName: 'Borax' },
  { ...s51.bII, productName: 'Harpsichord', upgradeLevel: 61, score: 840 },
  { ...s51.bV, productName: 'Weapon Parts', upgradeLevel: 91, score: 4838400 },
  { ...s81.bIII, productName: 'Canvas', upgradeLevel: 91, score: 36000 },
  { ...s51.bII, productName: 'Snare Drum' },
  { ...s51.bIII, productName: 'Cut Onyx' },
  { ...s51.bII, productName: 'Saxophone', upgradeLevel: 61, score: 840 },
  { ...s51.bIII, productName: 'Electro Magnet', upgradeLevel: 51, score: 10080 },
  { ...s101.bIII, productName: 'Titanium', upgradeLevel: 101, score: 58080 },
  { ...BASE_BP, productName: 'Kettle Grill', upgradeLevel: 51, score: 60 },
  { ...s51.bV, productName: 'Pistol', upgradeLevel: 91, score: 4838400 },
  { ...s51.bII, productName: 'Bicycle', upgradeLevel: 71, score: 960 }, // want to move this to s71
  { ...s51.bIII, productName: 'Machine Parts', upgradeLevel: 71, score: 13440 },
  { ...s51.bIV, productName: 'Camera' },
  { ...s51.bII, productName: 'Onyx Ring', upgradeLevel: 61, score: 840 },
  { ...s51.bII, productName: 'Sapphire Ring', upgradeLevel: 61, score: 840 },
  { ...s51.bII, productName: 'Mortar', upgradeLevel: 61, score: 840 },
  { ...s81.bIV, productName: 'Electrical Parts', upgradeLevel: 101, score: 871200 },
  { ...s51.bII, productName: 'Stethoscope', upgradeLevel: 61, score: 840 },
  { ...s51.bV, productName: 'Musket', upgradeLevel: 91, score: 4838400 },
  { ...s51.bIII, productName: 'Motor Unit', upgradeLevel: 51, score: 10080 },
  { ...s71.bII, productName: 'Glider', upgradeLevel: 61, score: 1120 },
  { ...s51.bIII, productName: 'Caplock Pistol' },
  { ...BASE_BP, productName: 'Hedge Trimmer', upgradeLevel: 31, score: 40 },
  { ...s81.bII, productName: 'Light Bulb', upgradeLevel: 61, score: 1260 },
  { ...s101.bII, productName: 'Gasoline', upgradeLevel: 51, score: 1320 },
  { ...s51.bIII, productName: 'Steam Engine', upgradeLevel: 71, score: 13440 },
  { ...s51.bIII, productName: 'Derringer' },
  { ...s51.bII, productName: 'Lamp', upgradeLevel: 61, score: 840 },
  { ...s51.bII, productName: 'Rocket Launcher', upgradeLevel: 31, score: 480 },
  { ...s51.bIV, productName: 'Telephone' },
  { ...s51.bIII, productName: 'Lever Action Rifle' },
  { ...s51.bIV, productName: 'Steam Boat', upgradeLevel: 81, score: 241920 },
  { ...s51.bII, productName: 'Cannon' },
  { ...s51.bII, productName: 'Refrigerator', upgradeLevel: 61, score: 840 },
  { ...s51.bIV, productName: 'Locomotive', upgradeLevel: 71, score: 215040 },
  { ...s51.bIII, productName: 'Combat Boots', upgradeLevel: 41, score: 8400 },
  { ...s51.bIII, productName: 'Revolver' },
  { ...BASE_BP, productName: 'Tiki Torch', upgradeLevel: 51, score: 60 },
  { ...s101.bIII, productName: 'Diesel', upgradeLevel: 111, score: 63360 },
  { ...s51.bII, productName: 'Bolt Action Rifle' },
  { ...s71.bII, productName: 'Diving Gear' },
  { ...BASE_BP, productName: 'Stove', upgradeLevel: 21, score: 30 },
  { ...s81.bIII, productName: 'Combustion Engine', upgradeLevel: 101, score: 39600 },
  { ...BASE_BP, productName: 'Motorcycle', upgradeLevel: 51, score: 60 },
  { ...BASE_BP, productName: 'Plastic' },
  { ...s81.bIII, productName: 'Antenna', upgradeLevel: 101, score: 39600 },
  { ...BASE_BP, productName: 'Car', upgradeLevel: 51, score: 60 },
  { ...BASE_BP, productName: 'Radio', upgradeLevel: 21, score: 30 },
  { ...s51.bII, productName: 'Truck', upgradeLevel: 71, score: 960 }, // want to move this to s71
  { ...s51.bII, productName: 'X-ray Machine', upgradeLevel: 61, score: 840 },
  { ...s51.bII, productName: 'Flashlight', upgradeLevel: 51, score: 720 },
  { ...BASE_BP, productName: 'Military Tent' },
  { ...BASE_BP, productName: 'Airplane', upgradeLevel: 21, score: 30 },
  { ...s71.bII, productName: 'Movie Projector', upgradeLevel: 31, score: 640 },
  { ...s71.bIII, productName: 'Electric Motor', upgradeLevel: 61, score: 20160 },
  { ...BASE_BP, productName: 'Monitor', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Submarine' },
  { ...BASE_BP, productName: 'Lawn Mower', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Defibrillator', upgradeLevel: 21, score: 30 },
  { ...s71.bII, productName: 'Walkie Talkie', upgradeLevel: 31, score: 640 },
  { ...BASE_BP, productName: 'Space Probe', upgradeLevel: 11, score: 20 },
  { ...s71.bII, productName: 'TV Set', upgradeLevel: 31, score: 640 },
  { ...s71.bII, productName: 'Rocket' },
  { ...s101.bII, productName: 'Nylon', upgradeLevel: 111, score: 2640 },
  { ...s71.bII, productName: 'Microchip' },
  { ...BASE_BP, productName: 'PC', upgradeLevel: 21, score: 30 },
  { ...BASE_BP, productName: 'Kevlar' },
  { ...BASE_BP, productName: 'Headset' },
  { ...BASE_BP, productName: 'Parachute' },
];

export enum UnmergeableBps {
  All, // Algorithm will allow no merging
  EventOnly, // Allow no merging of BPs not found in the main workshop
  NotInMWSPacks, // Allow no merging of BPs not found in main workshop packs (Renaissance, Master, Expert, etc)
  None, // Assume there are enough of any bp to merge to the next tier
}

export const UnmergeableStrategy: UnmergeableBps = UnmergeableBps.NotInMWSPacks;

// in addition to the above strategy, the below blueprints will be considered unmergeable
export const BPS_WITHOUT_DUPES: ProductName[] = [];

// in addition to the above strategy and specified blueprints, if a bp is listed in the below packs it will be considered unmergeable
export const EXCLUDE_PACKS = ['Expert', 'Master', 'Grandmaster', 'Paragon', 'Renaissance'];
