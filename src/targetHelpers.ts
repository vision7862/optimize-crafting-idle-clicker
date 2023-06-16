import memoize from 'fast-memoize';
import { type ProductStatus } from './types/Workshop';

export function computeTargetFromFame(fame: number, level: number): number {
  return 10 ** (fame + level - 1);
}

export function getCostOfScientists(numScientists: number): number {
  let cost = 0;
  for (let i = 2; i <= numScientists; i++) {
    cost += Math.round(50 * (1.15 ** (i - 2)));
  }
  return cost;
}

export function filterOutSkipped(statuses: Map<string, ProductStatus>): Map<string, ProductStatus> {
  const filteredStatuses = new Map<string, ProductStatus>(statuses);
  for (const [productName, status] of filteredStatuses.entries()) {
    if (status.level === 0) {
      filteredStatuses.delete(productName);
    }
  };
  return filteredStatuses;
}

export const getMainWorkshopIncomeMultiplier = memoize(getMainWorkshopIncomeMultiplierNonMemo);

function getMainWorkshopIncomeMultiplierNonMemo(level: number): number {
  return getLevelAchievementMultiplier(level) *
        1.2 * // wood
        1.2 * // leather
        1.4 * // copper
        1.2 * // bronze
        1.4 * // iron
        1 * // precious
        1 * // renessance
        1 * // industrial
        1 * // vehicles
        1 * // entertainment
        2.6; // event
}

export function getLevelAchievementMultiplier(level: number): number {
  switch (level) {
    case 1: return 1;
    case 2: return 2;
    case 3: return 4;
    case 4: return 8;
    case 5: return 16;
    case 6: return 32;
    case 7: return 64;
    case 8: return 128;
    case 9: return 256;
    case 10: return 512;
    case 11: return 2000;
    case 12: return 4000;
    case 13: return 8000;
    case 14: return 16000;
    case 15: return 32000;
    case 16: return 64000;
    case 17: return 128000;
    case 18: return 256000;
    case 19: return 512000;
    case 20: return 1.00E+06;
    case 21: return 4.00E+06;
    case 22: return 8.00E+06;
    case 23: return 1.60E+07;
    case 24: return 3.20E+07;
    case 25: return 6.40E+07;
    case 26: return 1.28E+08;
    case 27: return 2.56E+08;
    case 28: return 5.12E+08;
    case 29: return 1.00E+09;
    case 30: return 2.00E+09;
    case 31: return 1.00E+10;
    case 32: return 2.00E+10;
    case 33: return 4.00E+10;
    case 34: return 8.00E+10;
    case 35: return 1.60E+11;
    case 36: return 3.20E+11;
    case 37: return 6.40E+11;
    case 38: return 1.30E+12;
    case 39: return 2.60E+12;
    case 40: return 5.10E+12;
    case 41: return 2.00E+13;
    case 42: return 4.00E+13;
    case 43: return 8.00E+13;
    case 44: return 1.60E+14;
    case 45: return 3.20E+14;
    case 46: return 6.40E+14;
    case 47: return 1.30E+15;
    case 48: return 2.60E+15;
    case 49: return 5.10E+15;
    case 50: return 1.02E+16;
    case 51: return 4.00E+16;
    case 52: return 8.00E+16;
    case 53: return 1.60E+17;
    case 54: return 3.20E+17;
    case 55: return 6.40E+17;
    case 56: return 1.30E+18;
    case 57: return 2.60E+18;
    case 58: return 5.10E+18;
    case 59: return 1.02E+19;
    case 60: return 2.05E+19;
    default: return 1.05e19;
  }
}
