import { quickestNewLevel } from '../../buildWorkshop/computeIdealLevelsForEvent';
import { printInfo } from '../../buildWorkshop/helpers/printResults';
import { WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

function optimizeForLevelUp(workshopStatus: Partial<WorkshopStatus>): void {
  const targetInfo = quickestNewLevel(workshopStatus);
  printInfo(targetInfo);
}

export const levelUpGoal: GoalType = {
  name: 'level up',
  description: 'get to the next level quickly',
  shouldShow: (_workshopStatus: WorkshopStatus) => true,
  selectOption: (workshopStatus: WorkshopStatus) => {
    optimizeForLevelUp(workshopStatus);
  },
};
