import { input } from '@inquirer/prompts';
import { bottomUpToMoney } from '../../buildWorkshop/computeIdealLevelsForEvent';
import { getCostOfScientistsFromSome } from '../../buildWorkshop/helpers/ResearchHelpers';
import { printInfo } from '../../buildWorkshop/helpers/printResults';
import { WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

async function optimizeForScientists(workshopStatus: Partial<WorkshopStatus>): Promise<void> {
  const desiredScientists = await input({
    message: 'how many scientists do you want?',
  });
  const target = getCostOfScientistsFromSome(workshopStatus.scientists ?? 0, Number(desiredScientists));
  printInfo(bottomUpToMoney(target, workshopStatus), target);
}

export const scientistsGoal: GoalType = {
  name: 'scientists',
  description: 'buy a specified number of scientists',
  shouldShow: (_workshopStatus: WorkshopStatus) => true,
  selectOptionAndGetInput: async (workshopStatus: WorkshopStatus) => {
    await optimizeForScientists(workshopStatus);
  },
};
