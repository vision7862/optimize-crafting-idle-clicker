export type EventPass = Readonly<{
  speedMultiplier: number;
  merchantMultiplier: number;
  offlineMultiplier: number;
  maximumLevel: number;
  eventTokensEachXLevel: number;
}>;

export enum EventPassName {
  free,
  supporter,
  minmaxer,
}
