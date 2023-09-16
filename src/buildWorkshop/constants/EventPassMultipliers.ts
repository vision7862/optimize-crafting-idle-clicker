import { EventPass } from '../types/EventPass';

export const FREE_PASS: EventPass = {
  speedMultiplier: 1,
  merchantMultiplier: 1,
  offlineMultiplier: 1,
  maximumLevel: 100,
  eventTokensEachXLevel: 4,
};

export const SUPPORTER_PASS: EventPass = {
  speedMultiplier: 1.3333,
  merchantMultiplier: 1.25,
  offlineMultiplier: 3,
  maximumLevel: 120,
  eventTokensEachXLevel: 3,
};

export const MINMAXER_PASS: EventPass = {
  speedMultiplier: 2,
  merchantMultiplier: 1.5,
  offlineMultiplier: 4,
  maximumLevel: 130,
  eventTokensEachXLevel: 2,
};
