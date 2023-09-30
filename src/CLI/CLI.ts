import { input, select } from '@inquirer/prompts';
import * as fs from 'fs';
import * as path from 'path';
import { isEvent, isNotEvent } from '../buildWorkshop/helpers/WorkshopHelpers';
import { EventPassName } from '../buildWorkshop/types/EventPass';
import { PromoEvent } from '../buildWorkshop/types/PromoEvent';
import { WorkshopStatus } from '../buildWorkshop/types/Workshop';
import { auditMultipliersGoal } from './goals/auditMultipliers';
import { clickTopInputsGoal } from './goals/clickTopAndInputs';
import { doubleLoreGoal } from './goals/doubleLore';
import { fastestFameGoal } from './goals/fastestFame';
import { gemsGoal } from './goals/gems';
import { lastProductGoal } from './goals/lastProduct';
import { levelUpGoal } from './goals/levelUp';
import { mostLoreGoal } from './goals/lore';
import { merchantsGoal } from './goals/merchants';
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
  [merchantsGoal.name, merchantsGoal],
  [fameGoal.name, fameGoal],
  [fastestFameGoal.name, fastestFameGoal],
  [lastProductGoal.name, lastProductGoal],
  [clickTopInputsGoal.name, clickTopInputsGoal],
  [mostLoreGoal.name, mostLoreGoal],
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
  }

  printWorkshopStatus(workshopStatus);
}

function printWorkshopStatus(workshopStatus: Partial<WorkshopStatus>): void {
  let eventPass: string | undefined;
  if (isEvent(workshopStatus) && workshopStatus.eventPass !== undefined) {
    eventPass = EventPassName[workshopStatus.eventPass];
  }
  let currentPromo: string | undefined;
  if (isNotEvent(workshopStatus) && workshopStatus.currentPromo !== undefined) {
    currentPromo = PromoEvent[workshopStatus.currentPromo];
  }
  console.log('your workshop status is: ' + JSON.stringify({ ...workshopStatus, eventPass, currentPromo }));
}

async function getWorkshopStatus(): Promise<Partial<WorkshopStatus>> {
  const configOptions = await input({
    message: 'if you have a workshop status object, enter it here. otherwise, just hit enter.',
  });

  if (configOptions !== '') {
    const parsed = JSON.parse(configOptions);
    let eventPass: EventPassName | undefined;
    if (parsed.eventPass !== undefined) {
      eventPass = EventPassName[parsed.eventPass as keyof typeof EventPassName];
    }
    let currentPromo: PromoEvent | undefined;
    if (parsed.currentPromo !== undefined) {
      currentPromo = PromoEvent[parsed.currentPromo as keyof typeof PromoEvent];
    }
    return { ...parsed, eventPass, currentPromo };
  } else {
    return await getWorkshopStatusFromUser();
  }
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
  let eventPass: EventPassName | undefined;
  let currentPromo: PromoEvent | undefined;
  if (isEvent) {
    eventName = await select({
      message: 'which event do you want to optimize?',
      choices: getEventFileNames(),
    });
    eventPass = await select({
      message: 'which event pass did you choose?',
      choices: [
        { value: EventPassName.free, name: 'free' },
        { value: EventPassName.supporter, name: 'supporter' },
        { value: EventPassName.minmaxer, name: 'minmaxer' },
      ],
    });
  } else {
    currentPromo = await select({
      message: 'is a premium boost event active?',
      choices: [
        { value: PromoEvent.None, name: 'no' },
        { value: PromoEvent.Income, name: 'Income' },
        { value: PromoEvent.Merchant, name: 'Merchant' },
        { value: PromoEvent.Research, name: 'Research' },
        { value: PromoEvent.Click, name: 'Click' },
        { value: PromoEvent.Speed, name: 'Speed' },
        { value: PromoEvent.LPP, name: 'LPP' },
      ],
    });
  }
  const level = Number(await input({ message: 'what level is your workshop?' }));
  const scientists = Number(await input({ message: 'how many scientists do you have?' }));

  const speedBoostActive: boolean = await booleanChoice('is the speed boost active?');
  const clickBoostActive: boolean = await booleanChoice('is the click boost active? (unused)');
  const offlineBoostActive: boolean = await booleanChoice('is the offline boost active? (unused)');
  const researchBoostActive: boolean = await booleanChoice('is the research boost active?');
  const merchantBoostActive: boolean = await booleanChoice('is the merchant boost active?');

  return {
    level,
    scientists,
    speedBoostActive,
    clickBoostActive,
    offlineBoostActive,
    researchBoostActive,
    merchantBoostActive,
    currentPromo,
    eventName,
    eventPass,
  };
}

export async function booleanChoice(message: string): Promise<boolean> {
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
  const extraStepUpForDist = __dirname.includes('dist') ? '../../' : '';
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
          .replace(/(\.ts)/g, '')
          .trimStart(),
      };
    });
  return names;
}
