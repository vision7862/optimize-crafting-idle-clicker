export enum SetMultiplierType {
  Income,
  Ore,
  Research,
  FreeGems,
  OfflineProduction,
  ClickOutput,
  MerchantRevenue,
  LPP,
  BlueprintCap,
}

export type BlueprintSet = Readonly<{
  setName: string;
  multiplierType: SetMultiplierType;
  achievementRanks: AchievementRank[]; // TODO: GH-5: fill in score boundaries for other sets
  isUnfinished?: boolean;
}>;

type AchievementRank = Readonly<{
  scoreBoundary: number;
  totalMultiplier: number;
}>;

const BEGINNER_SET_ACHIEVEMENT_RANKS = [
  { scoreBoundary: 96, totalMultiplier: 1.2 },
  { scoreBoundary: 180, totalMultiplier: 1.4 },
  { scoreBoundary: 435, totalMultiplier: 1.6 },
  { scoreBoundary: 750, totalMultiplier: 1.8 },
  { scoreBoundary: 1470, totalMultiplier: 2.0 },
  { scoreBoundary: 2100, totalMultiplier: 2.2 },
  { scoreBoundary: 4350, totalMultiplier: 2.4 },
  { scoreBoundary: 7500, totalMultiplier: 2.6 },
  { scoreBoundary: 14700, totalMultiplier: 2.8 },
  { scoreBoundary: 21000, totalMultiplier: 3.0 },
  { scoreBoundary: 43500, totalMultiplier: 3.2 },
  { scoreBoundary: 75000, totalMultiplier: 3.4 },
  { scoreBoundary: 147000, totalMultiplier: 3.6 },
  { scoreBoundary: 210000, totalMultiplier: 3.8 },
  { scoreBoundary: 435000, totalMultiplier: 4.0 },
  { scoreBoundary: 750000, totalMultiplier: 4.2 },
  { scoreBoundary: 1.5e6, totalMultiplier: 4.4 },
  { scoreBoundary: 2.1e6, totalMultiplier: 4.6 },
  { scoreBoundary: 4.4e6, totalMultiplier: 4.8 },
  { scoreBoundary: 7.5e6, totalMultiplier: 5.0 },
  { scoreBoundary: 1.27e7, totalMultiplier: 5.2 },
  { scoreBoundary: 2.02e7, totalMultiplier: 5.4 },
  { scoreBoundary: 2.77e7, totalMultiplier: 5.6 },
  { scoreBoundary: 3.52e7, totalMultiplier: 5.8 },
  { scoreBoundary: 4.27e7, totalMultiplier: 6.0 },
];

const MID_GAME_SET_ACHIEVEMENT_RANKS = [
  { scoreBoundary: 48, totalMultiplier: 1.02 },
  { scoreBoundary: 90, totalMultiplier: 1.04 },
  { scoreBoundary: 218, totalMultiplier: 1.06 },
  { scoreBoundary: 375, totalMultiplier: 1.08 },
  { scoreBoundary: 735, totalMultiplier: 1.1 },
  { scoreBoundary: 1050, totalMultiplier: 1.12 },
  { scoreBoundary: 2175, totalMultiplier: 1.14 },
  { scoreBoundary: 3750, totalMultiplier: 1.16 },
  { scoreBoundary: 7350, totalMultiplier: 1.18 },
  { scoreBoundary: 10500, totalMultiplier: 1.2 },
  { scoreBoundary: 21750, totalMultiplier: 1.22 },
  { scoreBoundary: 37500, totalMultiplier: 1.24 },
  { scoreBoundary: 73500, totalMultiplier: 1.26 },
  { scoreBoundary: 105000, totalMultiplier: 1.28 },
  { scoreBoundary: 217500, totalMultiplier: 1.3 },
  { scoreBoundary: 375000, totalMultiplier: 1.32 },
  { scoreBoundary: 7.35e5, totalMultiplier: 1.34 },
  { scoreBoundary: 1.1e6, totalMultiplier: 1.36 },
  { scoreBoundary: 2.2e6, totalMultiplier: 1.38 },
  { scoreBoundary: 3.8e6, totalMultiplier: 1.4 },
  { scoreBoundary: 6.4e6, totalMultiplier: 1.42 },
  { scoreBoundary: 1.01e7, totalMultiplier: 1.44 },
  { scoreBoundary: 1.39e7, totalMultiplier: 1.46 },
  { scoreBoundary: 1.76e7, totalMultiplier: 1.48 },
  { scoreBoundary: 2.14e7, totalMultiplier: 1.5 },
  { scoreBoundary: 200e6, totalMultiplier: 1.6 },
  { scoreBoundary: 4.0e9, totalMultiplier: 1.7 },
  { scoreBoundary: 80e9, totalMultiplier: 1.8 },
  { scoreBoundary: 2.0e12, totalMultiplier: 1.9 },
  { scoreBoundary: 100.0e12, totalMultiplier: 2 },
];

const LATE_GAME_SET_ACHIEVEMENTS = [
  { scoreBoundary: 100, totalMultiplier: 1.5 },
  { scoreBoundary: 300, totalMultiplier: 2.0 },
  { scoreBoundary: 1200, totalMultiplier: 2.5 },
  { scoreBoundary: 2000, totalMultiplier: 3.0 },
  { scoreBoundary: 4000, totalMultiplier: 3.5 },
  { scoreBoundary: 8000, totalMultiplier: 4.0 },
  { scoreBoundary: 20000, totalMultiplier: 4.5 },
  { scoreBoundary: 40000, totalMultiplier: 5.0 },
  { scoreBoundary: 60000, totalMultiplier: 5.5 },
  { scoreBoundary: 100000, totalMultiplier: 6.0 },
  { scoreBoundary: 200000, totalMultiplier: 6.5 },
  { scoreBoundary: 400000, totalMultiplier: 7.0 },
  { scoreBoundary: 600000, totalMultiplier: 7.5 },
  { scoreBoundary: 1000000, totalMultiplier: 8.0 },
  { scoreBoundary: 3000000, totalMultiplier: 8.5 },
  { scoreBoundary: 5000000, totalMultiplier: 9.0 },
  { scoreBoundary: 8.0e6, totalMultiplier: 9.5 },
  { scoreBoundary: 1.5e7, totalMultiplier: 10.0 },
  { scoreBoundary: 3.0e7, totalMultiplier: 10.5 },
  { scoreBoundary: 5.0e7, totalMultiplier: 11.0 },
  { scoreBoundary: 8.0e7, totalMultiplier: 11.5 },
  { scoreBoundary: 1.5e8, totalMultiplier: 12.0 },
  { scoreBoundary: 3.0e8, totalMultiplier: 12.5 },
  { scoreBoundary: 5.0e8, totalMultiplier: 13.0 },
  { scoreBoundary: 1.5e9, totalMultiplier: 14.0 },
  { scoreBoundary: 1.0e10, totalMultiplier: 15.0 },
  { scoreBoundary: 1.0e11, totalMultiplier: 16.0 },
  { scoreBoundary: 1.0e12, totalMultiplier: 17.0 },
  { scoreBoundary: 1.0e13, totalMultiplier: 18.0 },
  { scoreBoundary: 1.0e14, totalMultiplier: 19.0 },
];

const MINING_AND_SCIENCE_TOOLS_SET_ACHIEVEMENTS = [
  { scoreBoundary: 64, totalMultiplier: 1.2 },
  { scoreBoundary: 120, totalMultiplier: 1.4 },
  { scoreBoundary: 290, totalMultiplier: 1.6 },
  { scoreBoundary: 500, totalMultiplier: 1.8 },
  { scoreBoundary: 980, totalMultiplier: 2.0 },
  { scoreBoundary: 1400, totalMultiplier: 2.2 },
  { scoreBoundary: 2900, totalMultiplier: 2.4 },
  { scoreBoundary: 5000, totalMultiplier: 2.6 },
  { scoreBoundary: 9800, totalMultiplier: 2.8 },
  { scoreBoundary: 14000, totalMultiplier: 3.0 },
  { scoreBoundary: 29000, totalMultiplier: 3.2 },
  { scoreBoundary: 50000, totalMultiplier: 3.4 },
  { scoreBoundary: 98000, totalMultiplier: 3.6 },
  { scoreBoundary: 140000, totalMultiplier: 3.8 },
  { scoreBoundary: 290000, totalMultiplier: 4.0 },
  { scoreBoundary: 500000, totalMultiplier: 4.2 },
  { scoreBoundary: 980000, totalMultiplier: 4.4 },
  { scoreBoundary: 1.4e6, totalMultiplier: 4.6 },
  { scoreBoundary: 2.9e6, totalMultiplier: 4.8 },
  { scoreBoundary: 5.0e6, totalMultiplier: 5.0 },
  { scoreBoundary: 8.5e6, totalMultiplier: 5.2 },
  { scoreBoundary: 13.5e6, totalMultiplier: 5.4 },
  { scoreBoundary: 18.5e6, totalMultiplier: 5.6 },
  { scoreBoundary: 23.5e6, totalMultiplier: 5.8 },
  { scoreBoundary: 28.5e6, totalMultiplier: 6.0 },
];

export const BLUEPRINT_SETS: BlueprintSet[] = [
  {
    setName: 'Wood',
    multiplierType: SetMultiplierType.Income,
    achievementRanks: BEGINNER_SET_ACHIEVEMENT_RANKS,
  },
  {
    setName: 'Leather',
    multiplierType: SetMultiplierType.Income,
    achievementRanks: BEGINNER_SET_ACHIEVEMENT_RANKS,
  },
  {
    setName: 'Copper',
    multiplierType: SetMultiplierType.Income,
    achievementRanks: BEGINNER_SET_ACHIEVEMENT_RANKS,
  },
  {
    setName: 'Bronze',
    multiplierType: SetMultiplierType.Income,
    achievementRanks: [
      { scoreBoundary: 112, totalMultiplier: 1.2 },
      { scoreBoundary: 210, totalMultiplier: 1.4 },
      { scoreBoundary: 508, totalMultiplier: 1.6 },
      { scoreBoundary: 875, totalMultiplier: 1.8 },
      { scoreBoundary: 1715, totalMultiplier: 2.0 },
      { scoreBoundary: 2450, totalMultiplier: 2.2 },
      { scoreBoundary: 5075, totalMultiplier: 2.4 },
      { scoreBoundary: 8750, totalMultiplier: 2.6 },
      { scoreBoundary: 17150, totalMultiplier: 2.8 },
      { scoreBoundary: 24500, totalMultiplier: 3.0 },
      { scoreBoundary: 50750, totalMultiplier: 3.2 },
      { scoreBoundary: 87500, totalMultiplier: 3.4 },
      { scoreBoundary: 171500, totalMultiplier: 3.6 },
      { scoreBoundary: 245000, totalMultiplier: 3.8 },
      { scoreBoundary: 507500, totalMultiplier: 4.0 },
      { scoreBoundary: 875000, totalMultiplier: 4.2 },
      { scoreBoundary: 1.715e6, totalMultiplier: 4.4 },
      { scoreBoundary: 2.5e6, totalMultiplier: 4.6 },
      { scoreBoundary: 5.1e6, totalMultiplier: 4.8 },
      { scoreBoundary: 8.8e6, totalMultiplier: 5.0 },
      { scoreBoundary: 1.49e7, totalMultiplier: 5.2 },
      { scoreBoundary: 2.36e7, totalMultiplier: 5.4 },
      { scoreBoundary: 3.24e7, totalMultiplier: 5.6 },
      { scoreBoundary: 4.11e7, totalMultiplier: 5.8 },
      { scoreBoundary: 4.99e7, totalMultiplier: 6.0 },
    ],
  },
  {
    setName: 'Iron',
    multiplierType: SetMultiplierType.Income,
    achievementRanks: [
      { scoreBoundary: 192, totalMultiplier: 1.2 },
      { scoreBoundary: 360, totalMultiplier: 1.4 },
      { scoreBoundary: 870, totalMultiplier: 1.6 },
      { scoreBoundary: 1500, totalMultiplier: 1.8 },
      { scoreBoundary: 2940, totalMultiplier: 2.0 },
      { scoreBoundary: 4200, totalMultiplier: 2.2 },
      { scoreBoundary: 8700, totalMultiplier: 2.4 },
      { scoreBoundary: 15000, totalMultiplier: 2.6 },
      { scoreBoundary: 29400, totalMultiplier: 2.8 },
      { scoreBoundary: 42000, totalMultiplier: 3.0 },
      { scoreBoundary: 87000, totalMultiplier: 3.2 },
      { scoreBoundary: 150000, totalMultiplier: 3.4 },
      { scoreBoundary: 294000, totalMultiplier: 3.6 },
      { scoreBoundary: 420000, totalMultiplier: 3.8 },
      { scoreBoundary: 870000, totalMultiplier: 4.0 },
      { scoreBoundary: 1500000, totalMultiplier: 4.2 },
      { scoreBoundary: 2.9e6, totalMultiplier: 4.4 },
      { scoreBoundary: 4.2e6, totalMultiplier: 4.6 },
      { scoreBoundary: 8.7e6, totalMultiplier: 4.8 },
      { scoreBoundary: 1.5e7, totalMultiplier: 5.0 },
      { scoreBoundary: 2.55e7, totalMultiplier: 5.2 },
      { scoreBoundary: 4.05e7, totalMultiplier: 5.4 },
      { scoreBoundary: 5.55e7, totalMultiplier: 5.6 },
      { scoreBoundary: 7.05e7, totalMultiplier: 5.8 },
      { scoreBoundary: 8.55e7, totalMultiplier: 6.0 },
    ],
  },
  {
    setName: 'Precious',
    multiplierType: SetMultiplierType.Income,
    achievementRanks: [
      { scoreBoundary: 160, totalMultiplier: 1.2 },
      { scoreBoundary: 300, totalMultiplier: 1.4 },
      { scoreBoundary: 725, totalMultiplier: 1.6 },
      { scoreBoundary: 1250, totalMultiplier: 1.8 },
      { scoreBoundary: 2450, totalMultiplier: 2.0 },
      { scoreBoundary: 3500, totalMultiplier: 2.2 },
      { scoreBoundary: 7250, totalMultiplier: 2.4 },
      { scoreBoundary: 12500, totalMultiplier: 2.6 },
      { scoreBoundary: 24500, totalMultiplier: 2.8 },
      { scoreBoundary: 35000, totalMultiplier: 3.0 },
      { scoreBoundary: 72500, totalMultiplier: 3.2 },
      { scoreBoundary: 125000, totalMultiplier: 3.4 },
      { scoreBoundary: 245000, totalMultiplier: 3.6 },
      { scoreBoundary: 350000, totalMultiplier: 3.8 },
      { scoreBoundary: 725000, totalMultiplier: 4.0 },
      { scoreBoundary: 1300000, totalMultiplier: 4.2 },
      { scoreBoundary: 2.5e6, totalMultiplier: 4.4 },
      { scoreBoundary: 3.5e6, totalMultiplier: 4.6 },
      { scoreBoundary: 7.3e6, totalMultiplier: 4.8 },
      { scoreBoundary: 1.25e7, totalMultiplier: 5.0 },
      { scoreBoundary: 2.12e7, totalMultiplier: 5.2 },
      { scoreBoundary: 3.37e7, totalMultiplier: 5.4 },
      { scoreBoundary: 4.62e7, totalMultiplier: 5.6 },
      { scoreBoundary: 5.87e7, totalMultiplier: 5.8 },
      { scoreBoundary: 7.12e7, totalMultiplier: 6.0 },
    ],
  },
  {
    setName: 'Modern Resources',
    multiplierType: SetMultiplierType.OfflineProduction,
    achievementRanks: MINING_AND_SCIENCE_TOOLS_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Refined Modern Resources',
    multiplierType: SetMultiplierType.LPP, // not actually a multiplier
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS.slice(0, 25).map((val, index) => {
      return {
        scoreBoundary: val.scoreBoundary,
        totalMultiplier: (index + 1) * 2,
      };
    }),
  },
  {
    setName: 'Synthetic Materials',
    multiplierType: SetMultiplierType.MerchantRevenue,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS.slice(0, 25),
  },
  {
    setName: 'Military Gear',
    multiplierType: SetMultiplierType.BlueprintCap, // not actually a multiplier
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS.slice(0, 25).map((val, index) => {
      return {
        scoreBoundary: val.scoreBoundary,
        totalMultiplier: (index + 1) * 10,
      };
    }),
  },
  {
    setName: 'Gaming',
    multiplierType: SetMultiplierType.LPP, // not actually a multiplier
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS.slice(0, 25).map((val, index) => {
      return {
        scoreBoundary: val.scoreBoundary,
        totalMultiplier: (index + 1) * 2,
      };
    }),
  },
  {
    setName: 'Digital Revolution',
    multiplierType: SetMultiplierType.LPP, // not actually a multiplier
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS.slice(0, 25).map((val, index) => {
      return {
        scoreBoundary: val.scoreBoundary,
        totalMultiplier: (index + 1) * 2,
      };
    }),
  },
  {
    setName: 'Robotics',
    multiplierType: SetMultiplierType.BlueprintCap, // not actually a multiplier
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS.slice(0, 25).map((val, index) => {
      return {
        scoreBoundary: val.scoreBoundary,
        totalMultiplier: (index + 1) * 10,
      };
    }),
  },
  {
    setName: 'Renaissance',
    multiplierType: SetMultiplierType.Income,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Industrial',
    multiplierType: SetMultiplierType.Income,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Mining Tools',
    multiplierType: SetMultiplierType.Ore,
    achievementRanks: MINING_AND_SCIENCE_TOOLS_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Science Tools',
    multiplierType: SetMultiplierType.Research,
    achievementRanks: MINING_AND_SCIENCE_TOOLS_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Exploration',
    multiplierType: SetMultiplierType.Research,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Modern Exploration',
    multiplierType: SetMultiplierType.Research,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Modern Technology',
    multiplierType: SetMultiplierType.Research,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Cut Gems',
    multiplierType: SetMultiplierType.FreeGems, // not actually a multiplier
    achievementRanks: [
      { scoreBoundary: 75, totalMultiplier: 1 },
      { scoreBoundary: 300, totalMultiplier: 2 },
      { scoreBoundary: 800, totalMultiplier: 3 },
      { scoreBoundary: 2500, totalMultiplier: 4 },
      { scoreBoundary: 10000, totalMultiplier: 5 },
      { scoreBoundary: 40000, totalMultiplier: 6 },
      { scoreBoundary: 200000, totalMultiplier: 7 },
      { scoreBoundary: 1000000, totalMultiplier: 8 },
      { scoreBoundary: 4000000, totalMultiplier: 9 },
      { scoreBoundary: 15000000, totalMultiplier: 10 },
    ],
  },
  {
    setName: 'Emerald',
    multiplierType: SetMultiplierType.OfflineProduction,
    achievementRanks: MID_GAME_SET_ACHIEVEMENT_RANKS,
  },
  {
    setName: 'Ruby',
    multiplierType: SetMultiplierType.OfflineProduction,
    achievementRanks: MID_GAME_SET_ACHIEVEMENT_RANKS,
  },
  {
    setName: 'Sapphire',
    multiplierType: SetMultiplierType.OfflineProduction,
    achievementRanks: MID_GAME_SET_ACHIEVEMENT_RANKS,
  },
  {
    setName: 'Onyx',
    multiplierType: SetMultiplierType.OfflineProduction,
    achievementRanks: MID_GAME_SET_ACHIEVEMENT_RANKS,
  },
  {
    setName: 'Hammer',
    multiplierType: SetMultiplierType.ClickOutput,
    achievementRanks: MID_GAME_SET_ACHIEVEMENT_RANKS,
  },
  {
    setName: 'Knife',
    multiplierType: SetMultiplierType.MerchantRevenue,
    achievementRanks: MID_GAME_SET_ACHIEVEMENT_RANKS,
  },
  {
    setName: 'Modern Weapons',
    multiplierType: SetMultiplierType.MerchantRevenue,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Music Instruments',
    multiplierType: SetMultiplierType.MerchantRevenue,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Vehicles',
    multiplierType: SetMultiplierType.Income,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Entertainment',
    multiplierType: SetMultiplierType.Income,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS,
  },
  {
    setName: 'Botanic',
    multiplierType: SetMultiplierType.MerchantRevenue,
    achievementRanks: LATE_GAME_SET_ACHIEVEMENTS,
    isUnfinished: true,
  },
];
