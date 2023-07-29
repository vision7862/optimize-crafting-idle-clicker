import { fastestFamePerSecond } from '../../buildWorkshop/computeIdealLevelsForEvent';
import { printInfo } from '../../buildWorkshop/helpers/printResults';
import { WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

function optimizeForFastestFame(workshopStatus: Partial<WorkshopStatus>): void {
  const targetInfo = fastestFamePerSecond(workshopStatus);
  printInfo(targetInfo);
}

export const fastestFameGoal: GoalType = {
  name: 'fastest fame',
  description: 'most efficient fame over time',
  shouldShow: (_workshopStatus: WorkshopStatus) => true,
  selectOption: (workshopStatus: WorkshopStatus) => {
    optimizeForFastestFame(workshopStatus);
  },
};
