import { input, select } from '@inquirer/prompts';
import * as fs from 'fs';
import * as path from 'path';
import { printFameTime } from './helpers/printResults';
import { WorkshopStatus } from './types/Workshop';

export async function runCLI(): Promise<void> {
  const fame = Number(await input({ message: 'what is your fame target?' }));
  const configOptions = await input({
    message: 'if you have a config object, enter it here. otherwise, just hit enter.',
  });
  if (configOptions !== '') {
    printFameTime(fame, JSON.parse(configOptions));
    console.log('your config options are: ' + JSON.stringify(JSON.parse(configOptions)));
  } else {
    const workshopStatusFromUser = await getWorkshopStatusFromUser();
    printFameTime(fame, workshopStatusFromUser);
    console.log('your config options are: ' + JSON.stringify(workshopStatusFromUser));
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
