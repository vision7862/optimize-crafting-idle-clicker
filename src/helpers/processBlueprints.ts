enum SetMultiplier {
  Income,
  Ore,
  Research,
  FreeGems,
  OfflineProduction,
  ClickOutput,
  MerchantRevenue,
}

const blueprintSets: Array<{ setName: string; multiplier: SetMultiplier; blueprints: string[] }> = [
  {
    setName: 'Wood',
    multiplier: SetMultiplier.Income,
    blueprints: ['Wood', 'Club', 'Arrows', 'Bow', 'Copper Axe', 'Bronze Spear'],
  },
  {
    setName: 'Leather',
    multiplier: SetMultiplier.Income,
    blueprints: ['Rawhide', 'Leather', 'Boots', 'Hilt', 'Leather Armor', 'Imp. Leather Armor'],
  },
  {
    setName: 'Copper',
    multiplier: SetMultiplier.Income,
    blueprints: ['Copper Ore', 'Copper Ingots', 'Copper Axe', 'Copper Blades', 'Copper Knife', 'Copper Dagger'],
  },
  {
    setName: 'Bronze',
    multiplier: SetMultiplier.Income,
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
    multiplier: SetMultiplier.Income,
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
    multiplier: SetMultiplier.Income,
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
    multiplier: SetMultiplier.Income,
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
    multiplier: SetMultiplier.Income,
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
    multiplier: SetMultiplier.Ore,
    blueprints: ['Shovel', 'Lump Hammer', 'Pickaxe', 'Gunpowder'],
  },
  {
    setName: 'Science Tools',
    multiplier: SetMultiplier.Research,
    blueprints: ['Sickle', 'Chisel', 'Mechanical Parts', 'Compass'],
  },
  {
    setName: 'Exploration',
    multiplier: SetMultiplier.Research,
    blueprints: ['Paper', 'Paper Sheets', 'Map', 'Book', 'Rowboat', 'Spyglass', 'Compass'],
  },
  {
    setName: 'Modern Exploration',
    multiplier: SetMultiplier.Research,
    blueprints: ['Entrenching Tool', 'Tent', 'Backpack', 'Diving Gear', 'Electric Motor', 'Submarine'],
  },
  {
    setName: 'Cut Gems',
    multiplier: SetMultiplier.FreeGems,
    blueprints: ['Cut Emerald', 'Cut Ruby', 'Cut Sapphire', 'Cut Onyx'],
  },
  {
    setName: 'Emerald',
    multiplier: SetMultiplier.OfflineProduction,
    blueprints: ['Uncut Emerald', 'Cut Emerald', 'Emerald Ring'],
  },
  {
    setName: 'Ruby',
    multiplier: SetMultiplier.OfflineProduction,
    blueprints: ['Uncut Ruby', 'Cut Ruby', 'Ruby Ring'],
  },
  {
    setName: 'Sapphire',
    multiplier: SetMultiplier.OfflineProduction,
    blueprints: ['Uncut Sapphire', 'Cut Sapphire', 'Sapphire Ring'],
  },
  {
    setName: 'Onyx',
    multiplier: SetMultiplier.OfflineProduction,
    blueprints: ['Uncut Onyx', 'Cut Onyx', 'Onyx Ring'],
  },
  {
    setName: 'Hammer',
    multiplier: SetMultiplier.ClickOutput,
    blueprints: ['Lump Hammer', 'War Hammer', 'Magnificent Hammer'],
  },
  {
    setName: 'Knife',
    multiplier: SetMultiplier.MerchantRevenue,
    blueprints: ['Sickle', 'Magnificent Dagger'],
  },
  {
    setName: 'Modern Weapons',
    multiplier: SetMultiplier.MerchantRevenue,
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
    multiplier: SetMultiplier.MerchantRevenue,
    blueprints: ['Flute', 'Bongos', 'Harp', 'Tambourine', 'Trumpet', 'Viola', 'Harpsichord', 'Snare Drum', 'Saxophone'],
  },
  {
    setName: 'Vehicles',
    multiplier: SetMultiplier.Income,
    blueprints: ['Bicycle', 'Glider', 'Combustion Engine', 'Motorcycle', 'Car', 'Truck', 'Airplane'],
  },
];
console.log(blueprintSets);
