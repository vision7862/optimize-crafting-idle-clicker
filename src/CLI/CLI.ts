import { input, select } from '@inquirer/prompts';
import * as fs from 'fs';
import * as path from 'path';
import { WorkshopStatus } from '../buildWorkshop/types/Workshop';
import { auditMultipliersGoal } from './goals/auditMultipliers';
import { doubleLoreGoal } from './goals/doubleLore';
import { fastestFameGoal } from './goals/fastestFame';
import { gemsGoal } from './goals/gems';
import { levelUpGoal } from './goals/levelUp';
import { scientistsGoal } from './goals/scientists';
import { fameGoal } from './goals/specificFame';

export type GoalType = Readonly<{
  name: string;
  description: string;
  shouldShow: (workshopStatus: Partial<WorkshopStatus>) => boolean;
  selectOption?: (workshopStatus: Partial<WorkshopStatus>) => void;
  selectOptionAndGetInput?: (workshopStatus: Partial<WorkshopStatus>) => Promise<void>;
}>;

const goals: Map<string, GoalType> = new Map<string, GoalType>([
  [levelUpGoal.name, levelUpGoal],
  [doubleLoreGoal.name, doubleLoreGoal],
  [gemsGoal.name, gemsGoal],
  [scientistsGoal.name, scientistsGoal],
  [fameGoal.name, fameGoal],
  [fastestFameGoal.name, fastestFameGoal],
  [auditMultipliersGoal.name, auditMultipliersGoal],
]);

export async function runCLI(): Promise<void> {
  const workshopStatus = await getWorkshopStatus();

  const choices: Array<{ value: string; name: string; description: string }> = [];
  let index = 1;
  goals.forEach((goal: GoalType, goalName: string) => {
    if (goal.shouldShow(workshopStatus)) {
      choices.push({ value: goalName, name: `(${index}) ${goalName}`, description: goal.description });
      index++;
    }
  });

  const goalName: string = await select({
    message: 'what is your goal?',
    choices,
  });

  const selectOption = goals.get(goalName)?.selectOption;
  if (selectOption !== undefined) {
    selectOption(workshopStatus);
  } else {
    const selectOptionAndGetInput = goals.get(goalName)?.selectOptionAndGetInput;
    if (selectOptionAndGetInput !== undefined) {
      await selectOptionAndGetInput(workshopStatus);
    }

    console.log('your workshop status is: ' + JSON.stringify(workshopStatus));
  }
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
