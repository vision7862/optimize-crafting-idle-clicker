import { input } from '@inquirer/prompts';
import { clickTopAndInputs } from '../../buildWorkshop/computeIdealLevelsForEvent';
import { getCostOfScientistsFromSome } from '../../buildWorkshop/helpers/ResearchHelpers';
import { isEvent } from '../../buildWorkshop/helpers/WorkshopHelpers';
import { printInfo } from '../../buildWorkshop/helpers/printResults';
import { DEFAULT_WORKSHOP_STATUS_EVENT, WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

async function optimizeForClickingTopAndItsInputs(partialWorkshopStatus: Partial<WorkshopStatus>): Promise<void> {
  const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_EVENT, ...partialWorkshopStatus };
  const desiredScientists = await input({
    message: 'how many scientists do you want?',
  });
  const target = getCostOfScientistsFromSome(workshopStatus.scientists ?? 0, Number(desiredScientists));
  const targetInfo = clickTopAndInputs(target, workshopStatus);
  printInfo(targetInfo, target);
}

export const clickTopInputsGoal: GoalType = {
  name: 'click top product and its inputs',
  description: 'helpful on level 10 of events: account for click bonus and extra speed of clicks',
  shouldShow: (workshopStatus: WorkshopStatus) => isEvent(workshopStatus),
  selectOptionAndGetInput: async (workshopStatus: WorkshopStatus) => {
    await optimizeForClickingTopAndItsInputs(workshopStatus);
  },
};
