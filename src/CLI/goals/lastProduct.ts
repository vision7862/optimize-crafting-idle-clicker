import { bottomUpToLastItem } from '../../buildWorkshop/computeIdealLevelsForEvent';
import { isEvent } from '../../buildWorkshop/helpers/WorkshopHelpers';
import { printInfo } from '../../buildWorkshop/helpers/printResults';
import { WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

function optimizeForLastProduct(workshopStatus: Partial<WorkshopStatus>): void {
  const targetInfo = bottomUpToLastItem(workshopStatus);
  printInfo(targetInfo.upgradeInfo, targetInfo.target);
}

export const lastProductGoal: GoalType = {
  name: 'last product',
  description: 'print the final product of the event for the gold medal',
  shouldShow: (workshopStatus: WorkshopStatus) => isEvent(workshopStatus),
  selectOption: (workshopStatus: WorkshopStatus) => {
    optimizeForLastProduct(workshopStatus);
  },
};
