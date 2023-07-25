#!/usr/bin/env node

import { input } from '@inquirer/prompts';

const answer = await input({ message: 'do you want to optimize an event?' });

console.log('boo! ' + answer);
