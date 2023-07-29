import { input, select } from '@inquirer/prompts';
import * as fs from 'fs';
import * as path from 'path';
import {
  bestGemChance,
  bottomUpToMoney,
  fastestFamePerSecond,
  quickestNewLevel,
} from './buildWorkshop/computeIdealLevelsForEvent';
import {
  DAILY_DYNASTY_FRIEND_BONUS_ORE,
  PROMOTION_BONUS_CLICK_OUTPUT,
  PROMOTION_BONUS_INCOME,
  PROMOTION_BONUS_MERCHANT,
} from './buildWorkshop/config/BoostMultipliers';
import {
  MAIN_WORKSHOP_MERCHANT_CAPACITY,
  MWS_MONEY_ACHIEVE_OFFLINE_MULTIPLIER,
} from './buildWorkshop/constants/Achievements';
import { getCostOfScientistsFromSome, getResearchMultiplier } from './buildWorkshop/helpers/ResearchHelpers';
import { isEvent } from './buildWorkshop/helpers/WorkshopHelpers';
import {
  getMainWorkshopIncomeMultiplier,
  getMainWorkshopMerchantMultiplier,
} from './buildWorkshop/helpers/getWorkshopIncomeMultiplier';
import { printFameTime, printInfo } from './buildWorkshop/helpers/printResults';
import { computeTargetFromFame, getSecondsPerCycle } from './buildWorkshop/helpers/targetHelpers';
import {
  DEFAULT_WORKSHOP_STATUS_EVENT,
  DEFAULT_WORKSHOP_STATUS_MAIN,
  WorkshopStatus,
} from './buildWorkshop/types/Workshop';
import { SetMultiplierType } from './upgradeBlueprints/constants/BlueprintSets';
import { getSpecifiedMultiplierFromLibrary } from './upgradeBlueprints/helpers/blueprintScoreHelpers';

enum Goal {
  LevelUp,
  DoubleLore,
  Gems,
  Scientists,
  Fame,
  FastestFame,
  AuditMultipliers,
}

export async function runCLI(): Promise<void> {
  const workshopStatus = await getWorkshopStatus();

  const choices = [{ value: Goal.LevelUp, name: 'level up', description: 'get to next level quickly' }];
  if (!isEvent(workshopStatus)) {
    choices.push(
      {
        value: Goal.DoubleLore,
        name: 'double lore',
        description: 'guaranteed double lore (12 fame)',
      },
      {
        value: Goal.Gems,
        name: 'gems',
        description: 'most efficient time per gem percentage of 14 vs 15 fame',
      },
    );
  }

  choices.push(
    { value: Goal.Scientists, name: 'scientists', description: 'buy a specified number of scientists' },
    { value: Goal.Fame, name: 'fame', description: 'a specific fame number' },
    { value: Goal.FastestFame, name: 'fastest fame', description: 'most efficient fame over time' },
    {
      value: Goal.AuditMultipliers,
      name: 'audit multipliers',
      description: 'cross-check the multipliers the program is using vs your game',
    },
  );
  const goal: Goal = await select<Goal>({
    message: 'what is your goal?',
    choices,
  });
  switch (goal) {
    case Goal.LevelUp:
      optimizeForLevelUp(workshopStatus);
      break;
    case Goal.Gems:
      optimizeForGems(workshopStatus);
      break;
    case Goal.DoubleLore:
      optimizeForDoubleLore(workshopStatus);
      break;
    case Goal.Scientists:
      await optimizeForScientists(workshopStatus);
      break;
    case Goal.Fame:
      await optimizeForFame(workshopStatus);
      break;
    case Goal.FastestFame:
      optimizeForFastestFame(workshopStatus);
      break;
    case Goal.AuditMultipliers:
      auditMultipliers(workshopStatus);
      break;
  }

  console.log('your workshop status is: ' + JSON.stringify(workshopStatus));
}

function optimizeForLevelUp(workshopStatus: Partial<WorkshopStatus>): void {
  const targetInfo = quickestNewLevel(workshopStatus);
  printInfo(targetInfo);
}

async function optimizeForFame(workshopStatus: Partial<WorkshopStatus>): Promise<void> {
  const desiredFame = await input({
    message: 'how much fame do you want?',
  });
  printFameTime(Number(desiredFame), workshopStatus);
}

function optimizeForGems(workshopStatus: Partial<WorkshopStatus>): void {
  const targetInfo = bestGemChance(workshopStatus);
  printInfo(
    targetInfo.upgradeInfo,
    computeTargetFromFame(targetInfo.fame, targetInfo.upgradeInfo.workshop.workshopStatus.level),
  );
}

function optimizeForDoubleLore(workshopStatus: Partial<WorkshopStatus>): void {
  printFameTime(Number(12), workshopStatus);
}

async function optimizeForScientists(workshopStatus: Partial<WorkshopStatus>): Promise<void> {
  const desiredScientists = await input({
    message: 'how many scientists do you want?',
  });
  const target = getCostOfScientistsFromSome(workshopStatus.scientists ?? 0, Number(desiredScientists));
  printInfo(bottomUpToMoney(target, workshopStatus), target);
}

function optimizeForFastestFame(workshopStatus: Partial<WorkshopStatus>): void {
  const targetInfo = fastestFamePerSecond(workshopStatus);
  printInfo(targetInfo);
}

function auditMultipliers(partialWorkshopStatus: Partial<WorkshopStatus>): void {
  const workshopStatus: WorkshopStatus = {
    ...(isEvent(partialWorkshopStatus) ? DEFAULT_WORKSHOP_STATUS_EVENT : DEFAULT_WORKSHOP_STATUS_MAIN),
    ...partialWorkshopStatus,
  };
  console.log(
    `Income: x${Intl.NumberFormat('en-US', { notation: 'engineering', maximumFractionDigits: 1 }).format(
      getMainWorkshopIncomeMultiplier(workshopStatus.level),
    )}`,
  );
  console.log(
    `Click Output: ${Math.round(
      100 * getSpecifiedMultiplierFromLibrary(SetMultiplierType.ClickOutput) * PROMOTION_BONUS_CLICK_OUTPUT,
    )}%`,
  );
  console.log(
    `Offline Production: ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
      40 *
        MWS_MONEY_ACHIEVE_OFFLINE_MULTIPLIER *
        getSpecifiedMultiplierFromLibrary(SetMultiplierType.OfflineProduction) *
        PROMOTION_BONUS_INCOME,
    )}%`,
  );
  console.log(
    `Ore Output: ${Math.round(
      getSpecifiedMultiplierFromLibrary(SetMultiplierType.Ore) * DAILY_DYNASTY_FRIEND_BONUS_ORE * 100,
    )}%`,
  );
  console.log(
    `Research Production: ${Intl.NumberFormat('en-US').format(getResearchMultiplier(workshopStatus) * 100)}%`,
  );
  console.log(
    `Merchant Revenue: ${Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
      getMainWorkshopMerchantMultiplier() * 100,
    )}%`,
  );
  console.log(`Merchant Capacity: ${MAIN_WORKSHOP_MERCHANT_CAPACITY * PROMOTION_BONUS_MERCHANT}`);
  console.log(`Speed: ${(10 / getSecondsPerCycle(workshopStatus.speedBoostActive)) * 100}%`);
}

async function getWorkshopStatus(): Promise<Partial<WorkshopStatus>> {
  const configOptions = await input({
    message: 'if you have a workshop status object, enter it here. otherwise, just hit enter.',
  });
  return configOptions !== '' ? JSON.parse(configOptions) : await getWorkshopStatusFromUser();
}

async function getWorkshopStatusFromUser(): Promise<Partial<WorkshopStatus>> {
  const isEvent = Boolean(
    await select({
      message: 'are you optimizing the main workshop or an event?',
      choices: [
        { value: false, name: 'main workshop' },
        { value: true, name: 'event' },
      ],
    }),
  );
  let eventName: string | undefined;
  if (isEvent) {
    eventName = await select({
      message: 'which event do you want to optimize?',
      choices: getEventFileNames(),
    });
  }
  const level = Number(await input({ message: 'what level is your workshop?' }));
  const scientists = Number(await input({ message: 'how many scientists do you have?' }));

  const clickBoostActive: boolean = await booleanChoice('is the click boost active?');
  const researchBoostActive: boolean = await booleanChoice('is the research boost active?');
  const merchantBoostActive: boolean = await booleanChoice('is the merchant boost active?');

  return {
    level,
    scientists,
    clickBoostActive,
    researchBoostActive,
    merchantBoostActive,
    eventName,
  };
}

async function booleanChoice(message: string): Promise<boolean> {
  return Boolean(
    await select({
      message,
      choices: [
        { value: true, name: 'yes' },
        { value: false, name: 'no' },
      ],
    }),
  );
}

export function getEventFileNames(): Array<{ value: string }> {
  const extraStepUpForDist = __dirname.includes('dist') ? '../' : '';
  const blueprintPath = path.join(__dirname, extraStepUpForDist + `../products`);
  const names = fs
    .readdirSync(blueprintPath)
    .filter((file) => !file.includes('Main'))
    .filter((file) => !file.includes('MWS'))
    .map((file) => {
      return {
        value: file
          .replace(/([A-Z])/g, ' $1')
          .replace(/(\.txt)/g, '')
          .trimStart(),
      };
    });
  return names;
}
