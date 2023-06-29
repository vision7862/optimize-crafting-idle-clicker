import { input } from '@inquirer/prompts';
import { printFameTime } from './helpers/printResults';

export async function runCLI(): Promise<void> {
  const fame = Number(await input({ message: 'what is your fame target?' }));
  const level = Number(await input({ message: 'what level is your workshop?' }));

  printFameTime(fame, { level });
}
