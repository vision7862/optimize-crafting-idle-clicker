import { lorePerSecond } from '../../buildWorkshop/computeIdealLevelsForEvent';
import { isEvent } from '../../buildWorkshop/helpers/WorkshopHelpers';
import { printInfo } from '../../buildWorkshop/helpers/printResults';
import { WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType, booleanChoice } from '../CLI';

async function optimizeForLorePerTime(workshopStatus: Partial<WorkshopStatus>): Promise<void> {
  const barHasToken = await booleanChoice('is there a blueprint token or pack in the "easy" slot?');
  const targetInfo = lorePerSecond(workshopStatus, barHasToken);
  printInfo(targetInfo);
}

export const mostLoreGoal: GoalType = {
  name: 'most lore',
  description: 'most efficient lore over time',
  shouldShow: (workshopStatus: WorkshopStatus) => !isEvent(workshopStatus),
  selectOptionAndGetInput: async (workshopStatus: WorkshopStatus) => {
    await optimizeForLorePerTime(workshopStatus);
  },
};
