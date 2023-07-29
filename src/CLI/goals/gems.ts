import { bestGemChance } from '../../buildWorkshop/computeIdealLevelsForEvent';
import { isEvent } from '../../buildWorkshop/helpers/WorkshopHelpers';
import { printInfo } from '../../buildWorkshop/helpers/printResults';
import { computeTargetFromFame } from '../../buildWorkshop/helpers/targetHelpers';
import { WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

function optimizeForGems(workshopStatus: Partial<WorkshopStatus>): void {
  const targetInfo = bestGemChance(workshopStatus);
  printInfo(
    targetInfo.upgradeInfo,
    computeTargetFromFame(targetInfo.fame, targetInfo.upgradeInfo.workshop.workshopStatus.level),
  );
}

export const gemsGoal: GoalType = {
  name: 'gems',
  description: 'most efficient time per gem percentage of 14 vs 15 fame',
  shouldShow: (workshopStatus: WorkshopStatus) => !isEvent(workshopStatus),
  selectOption: (workshopStatus: WorkshopStatus) => {
    optimizeForGems(workshopStatus);
  },
};
