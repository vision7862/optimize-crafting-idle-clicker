import { input, select } from '@inquirer/prompts';
import * as fs from 'fs';
import * as path from 'path';
import { bestGemChance, quickestNewLevel } from './computeIdealLevelsForEvent';
import { printFameTime, printInfo } from './helpers/printResults';
import { WorkshopStatus } from './types/Workshop';

export async function runCLI(): Promise<void> {
  const workshopStatus = await getWorkshopStatus();
  const desireGems = await booleanChoice('are you shooting for gems?');
  if (desireGems) {
    const targetInfo = bestGemChance(workshopStatus);
    printInfo(targetInfo);
  } else {
    const desiredFame = await input({
      message:
        'if you have a Fame target in mind, enter it here. otherwise, hit enter to calculate the fastest way to level up.',
    });
    if (desiredFame !== '') {
      printFameTime(Number(desiredFame), workshopStatus);
    } else {
      const targetInfo = quickestNewLevel(workshopStatus);
      printInfo(targetInfo);
    }
  }
  console.log('your workshop status is: ' + JSON.stringify(workshopStatus));
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
