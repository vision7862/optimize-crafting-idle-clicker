import { input, select } from '@inquirer/prompts';
import * as fs from 'fs';
import * as path from 'path';
import {
  bestGemChance,
  bottomUpToMoney,
  fastestFamePerSecond,
  quickestNewLevel,
} from './buildWorkshop/computeIdealLevelsForEvent';
import { getCostOfScientistsFromSome } from './buildWorkshop/helpers/ResearchHelpers';
import { isEvent } from './buildWorkshop/helpers/WorkshopHelpers';
import { printFameTime, printInfo } from './buildWorkshop/helpers/printResults';
import { computeTargetFromFame } from './buildWorkshop/helpers/targetHelpers';
import { WorkshopStatus } from './buildWorkshop/types/Workshop';

enum OptimizationGoal {
  LevelUp,
  DoubleLore,
  Gems,
  Scientists,
  Fame,
  FastestFame,
}

export async function runCLI(): Promise<void> {
  const workshopStatus = await getWorkshopStatus();

  const choices = [{ value: OptimizationGoal.LevelUp, name: 'level up', description: 'get to next level quickly' }];
  if (!isEvent(workshopStatus)) {
    choices.push(
      {
        value: OptimizationGoal.DoubleLore,
        name: 'double lore',
        description: 'guaranteed double lore (12 fame)',
      },
      {
        value: OptimizationGoal.Gems,
        name: 'gems',
        description: 'most efficient time per gem percentage of 14 vs 15 fame',
      },
    );
  }

  choices.push(
    { value: OptimizationGoal.Scientists, name: 'scientists', description: 'buy a specified number of scientists' },
    { value: OptimizationGoal.Fame, name: 'fame', description: 'a specific fame number' },
    { value: OptimizationGoal.FastestFame, name: 'fastest fame', description: 'most efficient fame over time' },
  );
  const goal: OptimizationGoal = await select<OptimizationGoal>({
    message: 'what is your goal?',
    choices,
  });
  switch (goal) {
    case OptimizationGoal.LevelUp:
      optimizeForLevelUp(workshopStatus);
      break;
    case OptimizationGoal.Gems:
      optimizeForGems(workshopStatus);
      break;
    case OptimizationGoal.DoubleLore:
      optimizeForDoubleLore(workshopStatus);
      break;
    case OptimizationGoal.Scientists:
      await optimizeForScientists(workshopStatus);
      break;
    case OptimizationGoal.Fame:
      await optimizeForFame(workshopStatus);
      break;
    case OptimizationGoal.FastestFame:
      optimizeForFastestFame(workshopStatus);
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
