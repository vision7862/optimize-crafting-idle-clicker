import { bestGemChance } from '../../buildWorkshop/computeIdealLevelsForEvent';
import { isEvent } from '../../buildWorkshop/helpers/WorkshopHelpers';
import { printFameTime, printInfo } from '../../buildWorkshop/helpers/printResults';
import { computeTargetFromFame } from '../../buildWorkshop/helpers/targetHelpers';
import { WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

function optimizeForGems(workshopStatus: Partial<WorkshopStatus>): void {
  if (isEvent(workshopStatus)) {
    printFameTime(9, workshopStatus);
  } else {
    const targetInfo = bestGemChance(workshopStatus);
    printInfo(
      targetInfo.upgradeInfo,
      computeTargetFromFame(
        targetInfo.fame,
        targetInfo.upgradeInfo.workshop.workshopStatus.level,
        isEvent(targetInfo.upgradeInfo.workshop.workshopStatus),
      ),
    );
  }
}

export const gemsGoal: GoalType = {
  name: 'gems',
  description: 'most efficient time per gem percentage of 14 vs 15 fame, or flat 9 fame if optimizing an event',
  shouldShow: (_workshopStatus: WorkshopStatus) => true,
  selectOption: (workshopStatus: WorkshopStatus) => {
    optimizeForGems(workshopStatus);
  },
};
