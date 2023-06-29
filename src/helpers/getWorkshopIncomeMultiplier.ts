import memoize from 'fast-memoize';
import { WorkshopStatus } from '../types/Workshop';
import { isEvent } from './WorkshopHelpers';

const MERCHANT_BOOST_MULTIPLIER = 3;

export function getWorkshopIncomeMultiplier(workshopStatus: WorkshopStatus): number {
  return (
    (workshopStatus.merchantBoostActive ? MERCHANT_BOOST_MULTIPLIER : 1) *
    (!isEvent(workshopStatus) ? getMainWorkshopIncomeMultiplier(workshopStatus.level) : 1)
  );
}

const MWS_MERCHANT_MULTIPLIER = 7;
const getMainWorkshopIncomeMultiplier = memoize(getMainWorkshopIncomeMultiplierNonMemo);

function getMainWorkshopIncomeMultiplierNonMemo(level: number): number {
  return (
    MWS_MERCHANT_MULTIPLIER *
    getMWSLevelAchievementMultiplier(level) *
    1.4 * // wood
    1.4 * // leather
    1.4 * // copper
    1.4 * // bronze
    1.4 * // iron
    1.2 * // precious
    1 * // renaissance
    1 * // industrial
    1 * // vehicles
    1 * // entertainment
    3.5 * // event
    30 // TEMPORARY dynasty friend bonus
  );
}

// only applies to main workshop because the events are imported with revenue relative to their level
function getMWSLevelAchievementMultiplier(level: number): number {
  switch (level) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 4;
    case 4:
      return 8;
    case 5:
      return 16;
    case 6:
      return 32;
    case 7:
      return 64;
    case 8:
      return 128;
    case 9:
      return 256;
    case 10:
      return 512;
    case 11:
      return 2000;
    case 12:
      return 4000;
    case 13:
      return 8000;
    case 14:
      return 16000;
    case 15:
      return 32000;
    case 16:
      return 64000;
    case 17:
      return 128000;
    case 18:
      return 256000;
    case 19:
      return 512000;
    case 20:
      return 1.0e6;
    case 21:
      return 4.0e6;
    case 22:
      return 8.0e6;
    case 23:
      return 1.6e7;
    case 24:
      return 3.2e7;
    case 25:
      return 6.4e7;
    case 26:
      return 1.28e8;
    case 27:
      return 2.56e8;
    case 28:
      return 5.12e8;
    case 29:
      return 1.0e9;
    case 30:
      return 2.0e9;
    case 31:
      return 1.0e10;
    case 32:
      return 2.0e10;
    case 33:
      return 4.0e10;
    case 34:
      return 8.0e10;
    case 35:
      return 1.6e11;
    case 36:
      return 3.2e11;
    case 37:
      return 6.4e11;
    case 38:
      return 1.3e12;
    case 39:
      return 2.6e12;
    case 40:
      return 5.1e12;
    case 41:
      return 2.0e13;
    case 42:
      return 4.0e13;
    case 43:
      return 8.0e13;
    case 44:
      return 1.6e14;
    case 45:
      return 3.2e14;
    case 46:
      return 6.4e14;
    case 47:
      return 1.3e15;
    case 48:
      return 2.6e15;
    case 49:
      return 5.1e15;
    case 50:
      return 1.02e16;
    case 51:
      return 4.0e16;
    case 52:
      return 8.0e16;
    case 53:
      return 1.6e17;
    case 54:
      return 3.2e17;
    case 55:
      return 6.4e17;
    case 56:
      return 1.3e18;
    case 57:
      return 2.6e18;
    case 58:
      return 5.1e18;
    case 59:
      return 1.02e19;
    case 60:
      return 2.05e19;
    default:
      return 1.05e19;
  }
}
