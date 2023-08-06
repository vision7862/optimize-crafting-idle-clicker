import {
  DAILY_DYNASTY_FRIEND_BONUS_ORE,
  MERCHANT_BOOST_MULTIPLIER,
  PROMOTION_BONUS_CLICK_OUTPUT,
  PROMOTION_BONUS_INCOME,
  PROMOTION_BONUS_MERCHANT_REVENUE_AND_CAPACITY,
} from '../../buildWorkshop/config/BoostMultipliers';
import {
  MAIN_WORKSHOP_MERCHANT_CAPACITY,
  MWS_MONEY_ACHIEVE_OFFLINE_MULTIPLIER,
} from '../../buildWorkshop/constants/Achievements';
import { getResearchMultiplier } from '../../buildWorkshop/helpers/ResearchHelpers';
import { isEvent } from '../../buildWorkshop/helpers/WorkshopHelpers';
import {
  getMainWorkshopIncomeMultiplier,
  getMainWorkshopMerchantMultiplier,
} from '../../buildWorkshop/helpers/getWorkshopIncomeMultiplier';
import { getSecondsPerCycle } from '../../buildWorkshop/helpers/targetHelpers';
import {
  DEFAULT_WORKSHOP_STATUS_EVENT,
  DEFAULT_WORKSHOP_STATUS_MAIN,
  WorkshopStatus,
} from '../../buildWorkshop/types/Workshop';
import { SetMultiplierType } from '../../upgradeBlueprints/constants/BlueprintSets';
import { getSpecifiedMultiplierFromLibrary } from '../../upgradeBlueprints/helpers/blueprintScoreHelpers';
import { GoalType } from '../CLI';

function printMultipliers(partialWorkshopStatus: Partial<WorkshopStatus>): void {
  const workshopStatus: WorkshopStatus = {
    ...(isEvent(partialWorkshopStatus) ? DEFAULT_WORKSHOP_STATUS_EVENT : DEFAULT_WORKSHOP_STATUS_MAIN),
    ...partialWorkshopStatus,
  };
  console.log(
    `Income: x${Intl.NumberFormat('en-US', { notation: 'engineering', maximumFractionDigits: 1 }).format(
      getMainWorkshopIncomeMultiplier(workshopStatus.level),
    )}`,
  );
  console.log(
    `Click Output: ${Math.round(
      100 * getSpecifiedMultiplierFromLibrary(SetMultiplierType.ClickOutput) * PROMOTION_BONUS_CLICK_OUTPUT,
    )}%`,
  );
  console.log(
    `Offline Production: ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
      40 *
        MWS_MONEY_ACHIEVE_OFFLINE_MULTIPLIER *
        getSpecifiedMultiplierFromLibrary(SetMultiplierType.OfflineProduction) *
        PROMOTION_BONUS_INCOME,
    )}%`,
  );
  console.log(
    `Ore Output: ${Math.round(
      getSpecifiedMultiplierFromLibrary(SetMultiplierType.Ore) * DAILY_DYNASTY_FRIEND_BONUS_ORE * 100,
    )}%`,
  );
  console.log(
    `Research Production: ${Intl.NumberFormat('en-US').format(getResearchMultiplier(workshopStatus) * 100)}%`,
  );
  console.log(
    `Merchant Revenue: ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
      (workshopStatus.merchantBoostActive ? MERCHANT_BOOST_MULTIPLIER : 1) * getMainWorkshopMerchantMultiplier() * 100,
    )}%`,
  );
  console.log(`Merchant Capacity: ${MAIN_WORKSHOP_MERCHANT_CAPACITY * PROMOTION_BONUS_MERCHANT_REVENUE_AND_CAPACITY}`);
  console.log(`Speed: ${(10 / getSecondsPerCycle(workshopStatus.speedBoostActive)) * 100}%`);
}

export const auditMultipliersGoal: GoalType = {
  name: 'audit multipliers',
  description: 'cross-check the multipliers the program is using vs your game',
  shouldShow: (_workshopStatus: WorkshopStatus) => true,
  selectOption: (workshopStatus: WorkshopStatus) => {
    printMultipliers(workshopStatus);
  },
};
