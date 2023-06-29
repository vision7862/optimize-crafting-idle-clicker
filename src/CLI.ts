import { input } from '@inquirer/prompts';

export async function runCLI(): Promise<void> {
  const fame = Number(await input({ message: 'what is your fame target?' }));
  const level = Number(await input({ message: 'what level is your workshop?' }));

  console.log('getting optimized settings for  ' + fame.toString() + ' fame at level ' + level.toString());
}
