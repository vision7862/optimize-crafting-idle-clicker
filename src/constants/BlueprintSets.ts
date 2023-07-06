export enum SetMultiplier {
  Income,
  Ore,
  Research,
  FreeGems,
  OfflineProduction,
  ClickOutput,
  MerchantRevenue,
}

export type BlueprintSet = Readonly<{
  setName: string;
  multiplierType: SetMultiplier;
  blueprints: string[];
  scoreBoundaries?: number[]; // TODO: fill in score boundaries for other sets
  multiplierAmountPerRank?: number | null; // null if the ranks are not fully even // TODO: fill in multiplier amount for other sets
}>;

export const BLUEPRINT_SETS: BlueprintSet[] = [
  {
    setName: 'Wood',
    multiplierType: SetMultiplier.Income,
    blueprints: ['Wood', 'Club', 'Arrows', 'Bow', 'Copper Axe', 'Bronze Spear'],
    scoreBoundaries: [
      96, 180, 435, 750, 1470, 2100, 4350, 7500, 14700, 21000, 43500, 75000, 147000, 210000, 435000, 750000, 1500000,
      2100000, 4400000, 7500000, 12700000, 20200000, 27700000, 35200000, 42700000,
    ],
    multiplierAmountPerRank: 0.2,
  },
  {
    setName: 'Leather',
    multiplierType: SetMultiplier.Income,
    blueprints: ['Rawhide', 'Leather', 'Boots', 'Hilt', 'Leather Armor', 'Imp. Leather Armor'],
  },
  {
    setName: 'Copper',
    multiplierType: SetMultiplier.Income,
    blueprints: ['Copper Ore', 'Copper Ingots', 'Copper Axe', 'Copper Blades', 'Copper Knife', 'Copper Dagger'],
  },
  {
    setName: 'Bronze',
    multiplierType: SetMultiplier.Income,
    blueprints: [
      'Tin Ore',
      'Bronze Ingots',
      'Bronze Spear',
      'Bronze Shield',
      'Bronze Blades',
      'Bronze Dagger',
      'Bronze Sword',
    ],
  },
  {
    setName: 'Iron',
    multiplierType: SetMultiplier.Income,
    blueprints: [
      'Coal',
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
    ],
  },
  {
    setName: 'Precious',
    multiplierType: SetMultiplier.Income,
    blueprints: [
      'Gold Ore',
      'Gold Ingots',
      'Gold Ring',
      'Gold Necklace',
      'Steel',
      'Steel Blades',
      'Katana',
      'Magnificent Hilt',
      'Magnificent Sword',
      'Magnificent Armor',
    ],
  },
  {
    setName: 'Renaissance',
    multiplierType: SetMultiplier.Income,
    blueprints: [
      'Mechanical Parts',
      'Magnificent Crossbow',
      'Sulfur',
      'Halberd',
      'Compass',
      'Saltpeter',
      'Gunpowder',
      'Weapon Parts',
      'Pistol',
      'Musket',
    ],
  },
  {
    setName: 'Industrial',
    multiplierType: SetMultiplier.Income,
    blueprints: [
      'Microscope',
      'Clockwork',
      'Clock',
      'Electro Magnet',
      'Machine Parts',
      'Camera',
      'Electrical Parts',
      'Motor Unit',
      'Steam Engine',
      'Telephone',
      'Steam Boat',
      'Locomotive',
    ],
  },
  {
    setName: 'Mining Tools',
    multiplierType: SetMultiplier.Ore,
    blueprints: ['Shovel', 'Lump Hammer', 'Pickaxe', 'Gunpowder'],
  },
  {
    setName: 'Science Tools',
    multiplierType: SetMultiplier.Research,
    blueprints: ['Sickle', 'Chisel', 'Mechanical Parts', 'Compass'],
  },
  {
    setName: 'Exploration',
    multiplierType: SetMultiplier.Research,
    blueprints: ['Paper', 'Paper Sheets', 'Map', 'Book', 'Rowboat', 'Spyglass', 'Compass'],
  },
  {
    setName: 'Modern Exploration',
    multiplierType: SetMultiplier.Research,
    blueprints: ['Entrenching Tool', 'Tent', 'Backpack', 'Diving Gear', 'Electric Motor', 'Submarine'],
  },
  {
    setName: 'Cut Gems',
    multiplierType: SetMultiplier.FreeGems,
    blueprints: ['Cut Emerald', 'Cut Ruby', 'Cut Sapphire', 'Cut Onyx'],
  },
  {
    setName: 'Emerald',
    multiplierType: SetMultiplier.OfflineProduction,
    blueprints: ['Uncut Emerald', 'Cut Emerald', 'Emerald Ring'],
  },
  {
    setName: 'Ruby',
    multiplierType: SetMultiplier.OfflineProduction,
    blueprints: ['Uncut Ruby', 'Cut Ruby', 'Ruby Ring'],
  },
  {
    setName: 'Sapphire',
    multiplierType: SetMultiplier.OfflineProduction,
    blueprints: ['Uncut Sapphire', 'Cut Sapphire', 'Sapphire Ring'],
  },
  {
    setName: 'Onyx',
    multiplierType: SetMultiplier.OfflineProduction,
    blueprints: ['Uncut Onyx', 'Cut Onyx', 'Onyx Ring'],
  },
  {
    setName: 'Hammer',
    multiplierType: SetMultiplier.ClickOutput,
    blueprints: ['Lump Hammer', 'War Hammer', 'Magnificent Hammer'],
  },
  {
    setName: 'Knife',
    multiplierType: SetMultiplier.MerchantRevenue,
    blueprints: ['Sickle', 'Magnificent Dagger'],
  },
  {
    setName: 'Modern Weapons',
    multiplierType: SetMultiplier.MerchantRevenue,
    blueprints: [
      'Magnificent Bow',
      'Mortar',
      'Caplock Pistol',
      'Derringer',
      'Rocket Launcher',
      'Lever Action Rifle',
      'Cannon',
      'Revolver',
      'Bolt Action Rifle',
    ],
  },
  {
    setName: 'Music Instruments',
    multiplierType: SetMultiplier.MerchantRevenue,
    blueprints: ['Flute', 'Bongos', 'Harp', 'Tambourine', 'Trumpet', 'Viola', 'Harpsichord', 'Snare Drum', 'Saxophone'],
  },
  {
    setName: 'Vehicles',
    multiplierType: SetMultiplier.Income,
    blueprints: ['Bicycle', 'Glider', 'Combustion Engine', 'Motorcycle', 'Car', 'Truck', 'Airplane'],
  },
];
