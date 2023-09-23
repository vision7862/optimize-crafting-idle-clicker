import { FREE_PASS, MINMAXER_PASS, SUPPORTER_PASS } from '../constants/EventPassMultipliers';
import { EventPass, EventPassName } from '../types/EventPass';

const passMap = new Map<EventPassName, EventPass>([
  [EventPassName.free, FREE_PASS],
  [EventPassName.supporter, SUPPORTER_PASS],
  [EventPassName.minmaxer, MINMAXER_PASS],
]);
export function getCurrentEventPassMultipliers(name: EventPassName): EventPass {
  const passMultipliers: EventPass | undefined = passMap.get(name);
  if (passMultipliers === undefined) {
    throw new Error(`event pass "${name}" does not exist. create a new workshop status object.`);
  }
  return passMultipliers;
}
