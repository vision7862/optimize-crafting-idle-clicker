import memoize from 'fast-memoize';
import { SetMultiplierType } from '../../upgradeBlueprints/constants/BlueprintSets';
import { getSpecifiedMultiplierFromLibrary } from '../../upgradeBlueprints/helpers/blueprintScoreHelpers';
import {
  MAIN_WORKSHOP_MERCHANT_CAPACITY_ACHIEVEMENT_MULTIPLIER,
  MWS_EVENT_ACHIEVE_INCOME_MULTIPLIER,
  MWS_LOYALTY_ACHIEVE_MERCHANT_MULTIPLIER,
} from '../constants/Achievements';
import { PromoEvent } from '../types/PromoEvent';
import { WorkshopStatus } from '../types/Workshop';
import { isEvent } from './WorkshopHelpers';
import { getCurrentEventPassMultipliers } from './eventPassHelpers';
import { getGameStatus } from './otherMultiplierHelpers';

export function getWorkshopTotalIncomeMultiplier(workshopStatus: WorkshopStatus): number {
  return getIncomeMultiplier(workshopStatus) * getMerchantMultiplier(workshopStatus);
}

export const getIncomeMultiplier = memoize((workshopStatus: WorkshopStatus): number => {
  return (
    getLevelAchievementMultiplier(workshopStatus.level, isEvent(workshopStatus)) *
    (isEvent(workshopStatus)
      ? 1
      : getSpecifiedMultiplierFromLibrary(SetMultiplierType.Income) *
        MWS_EVENT_ACHIEVE_INCOME_MULTIPLIER *
        getGameStatus().dynastyMultipliers.income *
        (workshopStatus.currentPromo === PromoEvent.Income
          ? getGameStatus().premiumBonuses.income + 1
          : getGameStatus().premiumBonuses.income))
  );
});

export const getMerchantMultiplier = memoize((workshopStatus: WorkshopStatus) => {
  return (
    (workshopStatus.merchantBoostActive ? getGameStatus().boostMultipliers.merchant : 1) *
    (isEvent(workshopStatus)
      ? getCurrentEventPassMultipliers(workshopStatus.eventPass).merchantMultiplier
      : MWS_LOYALTY_ACHIEVE_MERCHANT_MULTIPLIER *
        getSpecifiedMultiplierFromLibrary(SetMultiplierType.MerchantRevenue) *
        getGameStatus().dynastyMultipliers.merchant *
        (workshopStatus.currentPromo === PromoEvent.Merchant
          ? getGameStatus().premiumBonuses.merchant + 1
          : getGameStatus().premiumBonuses.merchant))
  );
});

const LEVEL_INCOME_MULTIPLIER_MAPPING = new Map<number, number>([
  [1, 1],
  [2, 2],
  [3, 4],
  [4, 8],
  [5, 16],
  [6, 32],
  [7, 64],
  [8, 128],
  [9, 256],
  [10, 512],
  [11, 2000],
  [12, 4000],
  [13, 8000],
  [14, 16000],
  [15, 32000],
  [16, 64000],
  [17, 128000],
  [18, 256000],
  [19, 512000],
  [20, 1.0e6],
  [21, 4.0e6],
  [22, 8.0e6],
  [23, 16.0e6],
  [24, 32.0e6],
  [25, 64.0e6],
  [26, 128.0e6],
  [27, 256.0e6],
  [28, 512.0e6],
  [29, 1.0e9],
  [30, 2.0e9],
  [31, 10.0e9],
  [32, 20.0e9],
  [33, 40.0e9],
  [34, 80.0e9],
  [35, 160.0e9],
  [36, 320.0e9],
  [37, 640.0e9],
  [38, 1.3e12],
  [39, 2.6e12],
  [40, 5.1e12],
  [41, 20.0e12],
  [42, 40.0e12],
  [43, 80.0e12],
  [44, 160.0e12],
  [45, 320.0e12],
  [46, 640.0e12],
  [47, 1.3e15],
  [48, 2.6e15],
  [49, 5.1e15],
  [50, 10.2e15],
  [51, 40.0e15],
  [52, 80.0e15],
  [53, 160.0e15],
  [54, 320.0e15],
  [55, 640.0e15],
  [56, 1.3e18],
  [57, 2.6e18],
  [58, 5.1e18],
  [59, 10.2e18],
  [60, 20.5e18],
]);
function getLevelAchievementMultiplier(level: number, isEvent: boolean): number {
  const maxLevel = isEvent ? 10 : 60;
  return level <= maxLevel
    ? LEVEL_INCOME_MULTIPLIER_MAPPING.get(level) ?? 1
    : LEVEL_INCOME_MULTIPLIER_MAPPING.get(maxLevel) ?? 1;
}

export function getMerchantCapacity(workshopStatus: WorkshopStatus): number {
  return isEvent(workshopStatus)
    ? 10
    : 4 * MAIN_WORKSHOP_MERCHANT_CAPACITY_ACHIEVEMENT_MULTIPLIER * getGameStatus().premiumBonuses.merchant;
}
