import { getResearchMultiplier } from '../../buildWorkshop/helpers/ResearchHelpers';
import { isEvent } from '../../buildWorkshop/helpers/WorkshopHelpers';
import {
  getIncomeMultiplier,
  getMerchantCapacity,
  getMerchantMultiplier,
} from '../../buildWorkshop/helpers/getWorkshopIncomeMultiplier';
import {
  getClickOutputMultiplier,
  getOfflineMultiplier,
  getOreOutputMultiplier,
} from '../../buildWorkshop/helpers/otherMultiplierHelpers';
import { getSecondsPerCycle } from '../../buildWorkshop/helpers/targetHelpers';
import {
  DEFAULT_WORKSHOP_STATUS_EVENT,
  DEFAULT_WORKSHOP_STATUS_MAIN,
  WorkshopStatus,
} from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

function printMultipliers(partialWorkshopStatus: Partial<WorkshopStatus>): void {
  const eventBool = isEvent(partialWorkshopStatus);
  const workshopStatus: WorkshopStatus = {
    ...(eventBool ? DEFAULT_WORKSHOP_STATUS_EVENT : DEFAULT_WORKSHOP_STATUS_MAIN),
    ...partialWorkshopStatus,
  };
  console.log(
    `Income: x${Intl.NumberFormat('en-US', { notation: 'engineering', maximumFractionDigits: 1 }).format(
      getIncomeMultiplier(workshopStatus),
    )}`,
  );
  console.log(`Click Output: ${Math.round(100 * getClickOutputMultiplier(workshopStatus))}%`);
  console.log(
    `Offline Production: ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
      getOfflineMultiplier(workshopStatus),
    )}%`,
  );
  console.log(`Ore Output: ${Math.round(getOreOutputMultiplier(eventBool) * 100)}%`);
  console.log(
    `Research Production: ${Intl.NumberFormat('en-US').format(getResearchMultiplier(workshopStatus) * 100)}%`,
  );
  console.log(
    `Merchant Revenue: ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
      getMerchantMultiplier(workshopStatus) * 100,
    )}%`,
  );
  console.log(`Merchant Capacity: ${getMerchantCapacity(workshopStatus)}`);
  console.log(`Speed: ${(10 / getSecondsPerCycle(workshopStatus)) * 100}%`);
}

export const auditMultipliersGoal: GoalType = {
  name: 'audit multipliers',
  description: 'cross-check the multipliers the program is using vs your game',
  shouldShow: (_workshopStatus: WorkshopStatus) => true,
  selectOption: (workshopStatus: WorkshopStatus) => {
    printMultipliers(workshopStatus);
  },
};
