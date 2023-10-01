export type GameStatus = Readonly<{
  boostMultipliers: BoostMultipliers;
  dynastyMultipliers: DynastyMultipliers;
  premiumBonuses: PremiumBonuses;
  highestEverAchievements: HighestEverAchievements;
  lppWithoutPremium: number;
}>;

export type BoostMultipliers = Readonly<{
  click: number;
  offline: number;
  research: number;
  merchant: number;
}>;

export type DynastyMultipliers = Readonly<{
  income: number;
  ore: number;
  merchant: number;
}>;

export type PremiumBonuses = Readonly<{
  income: number;
  merchant: number;
  research: number;
  click: number;
  speed: number;
  LPP: number;
}>;

export type HighestEverAchievements = Readonly<{
  passiveIncome: number;
  tradeAgreements: number;
  scientificMethod: number;
  idleClickerAddict: number;
  eventCompletionist: number;
}>;
