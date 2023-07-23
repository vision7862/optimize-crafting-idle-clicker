export type Blueprint = Readonly<{
  productName: string;
  evolutionStage: number; // TODO: nice to have: stage as string roman numeral, converted in the code
  upgradeLevel: number;
  score: number;
  scoreChangePerLevel: number; // the difference between score and upgraded score
}>;
