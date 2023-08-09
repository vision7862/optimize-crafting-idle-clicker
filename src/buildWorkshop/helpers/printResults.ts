import { bottomUpToMoney } from '../computeIdealLevelsForEvent';
import { WorkshopUpgradeInfo } from '../productLooper';
import { DEFAULT_WORKSHOP_STATUS_MAIN, Workshop, WorkshopStatus } from '../types/Workshop';
import { computeResearchTimeForWorkshop, getFinalNumScientistsCanAfford } from './ResearchHelpers';
import { getStatusMap, isEvent } from './WorkshopHelpers';
import {
  computeBuildTimeForWorkshop,
  computeTargetFromFame,
  filterOutSkipped,
  filterOutSkippedFullWorkshop,
} from './targetHelpers';

export function printFameTime(fame: number, partialWorkshopStatus: Partial<WorkshopStatus>): void {
  const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
  const target = computeTargetFromFame(fame, workshopStatus.level, isEvent(workshopStatus));
  const targetInfo = bottomUpToMoney(target, workshopStatus);
  printInfo(targetInfo, target);
}

export function printInfo(targetInfo: WorkshopUpgradeInfo, target?: number): void {
  console.log(filterOutSkipped(getStatusMap(targetInfo.workshop)));
  const onlyBuiltWorkshop: Workshop = filterOutSkippedFullWorkshop(targetInfo.workshop);
  console.log('research time: ' + toTime(computeResearchTimeForWorkshop(onlyBuiltWorkshop)));
  console.log('build time: ' + toTime(computeBuildTimeForWorkshop(onlyBuiltWorkshop, target ?? 0)));
  // console.log('fully idle accurate cycles ' + toTime(computeBuildTimeForWorkshop(targetInfo.workshop) * 10));
  if (target !== undefined) {
    const startingScientists = targetInfo.workshop.workshopStatus.scientists;
    const affordableScientists = getFinalNumScientistsCanAfford(startingScientists, target * 0.5);
    const additionalScientists = affordableScientists - startingScientists;
    if (additionalScientists > 0) {
      console.log(
        'can easily afford ' +
          affordableScientists.toString() +
          ' total scientists (' +
          additionalScientists.toString() +
          ' additional)',
      );
    }
  }
}

export function toTime(seconds: number): string {
  const date = new Date(+0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}
