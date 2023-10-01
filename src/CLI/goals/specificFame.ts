import { input } from '@inquirer/prompts';
import { printFameTime } from '../../buildWorkshop/helpers/printResults';
import { WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

async function optimizeForFame(workshopStatus: Partial<WorkshopStatus>): Promise<void> {
  const desiredFame = await input({
    message: 'how much fame do you want?',
  });
  printFameTime(Number(desiredFame), workshopStatus);
}

export const fameGoal: GoalType = {
  name: 'fame',
  description: 'a specific fame number',
  shouldShow: (_workshopStatus: WorkshopStatus) => true,
  selectOptionAndGetInput: async (workshopStatus: WorkshopStatus) => {
    await optimizeForFame(workshopStatus);
  },
};
