import { input } from '@inquirer/prompts';
import { bottomUpToMoney } from '../../buildWorkshop/computeIdealLevelsForEvent';
import { printInfo } from '../../buildWorkshop/helpers/printResults';
import { WorkshopStatus } from '../../buildWorkshop/types/Workshop';
import { GoalType } from '../CLI';

export function getCostOfMerchantsFromSome(startingMerchants: number, finalMerchants: number): number {
  let cost = 0;
  for (let i = Math.max(4, startingMerchants + 1); i <= finalMerchants; i++) {
    cost += 1000 * 3 ** (i - 1);
  }
  return cost;
}

async function optimizeForMerchants(workshopStatus: Partial<WorkshopStatus>): Promise<void> {
  const ownedMerchants = await input({
    message: 'how many merchants do you have?',
  });
  const desiredMerchants = await input({
    message: 'how many merchants do you want?',
  });
  const target = getCostOfMerchantsFromSome(Number(ownedMerchants), Number(desiredMerchants));
  printInfo(bottomUpToMoney(target, workshopStatus), target);
}

export const merchantsGoal: GoalType = {
  name: 'merchants',
  description: 'buy a specified number of merchants',
  shouldShow: (_workshopStatus: WorkshopStatus) => true,
  selectOptionAndGetInput: async (workshopStatus: WorkshopStatus) => {
    await optimizeForMerchants(workshopStatus);
  },
};
