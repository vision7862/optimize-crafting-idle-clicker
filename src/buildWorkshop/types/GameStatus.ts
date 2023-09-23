export type GameStatus = Readonly<{
  boostMultipliers: BoostMultipliers;
  dynastyMultipliers: DynastyMultipliers;
  premiumBonuses: PremiumBonuses;
  lpp: number;
}>;

export type BoostMultipliers = Readonly<{
  click: number;
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
