type EventPass = Readonly<{
  speedMultiplier: number;
  merchantMultiplier: number;
  offlineMultiplier: number;
  maximumLevel: number;
  eventTokensEachXLevel: number;
}>;

const FREE_PASS: EventPass = {
  speedMultiplier: 1,
  merchantMultiplier: 1,
  offlineMultiplier: 1,
  maximumLevel: 100,
  eventTokensEachXLevel: 4,
};

const SUPPORTER_PASS: EventPass = {
  speedMultiplier: 1.3333,
  merchantMultiplier: 1.25,
  offlineMultiplier: 3,
  maximumLevel: 120,
  eventTokensEachXLevel: 3,
};

const MINMAXER_PASS: EventPass = {
  speedMultiplier: 2,
  merchantMultiplier: 1.5,
  offlineMultiplier: 4,
  maximumLevel: 130,
  eventTokensEachXLevel: 2,
};

export const CURRENT_EVENT_PASS = SUPPORTER_PASS;
