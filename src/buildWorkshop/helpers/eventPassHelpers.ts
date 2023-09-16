import { FREE_PASS, MINMAXER_PASS, SUPPORTER_PASS } from '../constants/EventPassMultipliers';
import { EventPass, EventPassName } from '../types/EventPass';

export function getCurrentEventPassMultipliers(name: EventPassName): EventPass {
  switch (name) {
    case EventPassName.free:
      return FREE_PASS;
    case EventPassName.supporter:
      return SUPPORTER_PASS;
    case EventPassName.minmaxer:
      return MINMAXER_PASS;
  }
}
