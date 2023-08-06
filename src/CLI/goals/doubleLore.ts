import { isEvent } from '../../buildWorkshop/helpers/WorkshopHelpers';
import { printFameTime } from '../../buildWorkshop/helpers/printResults';
import { WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

function optimizeForDoubleLore(workshopStatus: Partial<WorkshopStatus>): void {
  printFameTime(12, workshopStatus);
}

export const doubleLoreGoal: GoalType = {
  name: 'double lore',
  description: 'guaranteed double lore (12 fame)',
  shouldShow: (workshopStatus: WorkshopStatus) => !isEvent(workshopStatus),
  selectOption: (workshopStatus: WorkshopStatus) => {
    optimizeForDoubleLore(workshopStatus);
  },
};
