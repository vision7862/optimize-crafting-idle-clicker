import { bottomUpToMoney } from '../computeIdealLevelsForEvent';
import { WorkshopUpgradeInfo } from '../shouldUpgrade';
import { DEFAULT_WORKSHOP_STATUS_MAIN, WorkshopStatus } from '../types/Workshop';
import { computeResearchTimeForWorkshop, getFinalNumScientistsCanAfford } from './ResearchHelpers';
import { getStatusMap } from './WorkshopHelpers';
import { computeBuildTimeForWorkshop, computeTargetFromFame, filterOutSkipped } from './targetHelpers';

export function printFameTime(fame: number, partialWorkshopStatus: Partial<WorkshopStatus>): void {
  const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
  const target = computeTargetFromFame(fame, workshopStatus.level);
  const targetInfo = bottomUpToMoney(target, workshopStatus);
  printInfo(targetInfo, target);
}

export function printInfo(targetInfo: WorkshopUpgradeInfo, target?: number): void {
  console.log(filterOutSkipped(getStatusMap(targetInfo.workshop)));
  // const speedBoost = targetInfo.workshop.workshopStatus.speedBoostActive ? 2 : 1;
  // console.log('fully idle: ' + toTime((targetInfo.cyclesToTarget * 10) / speedBoost));
  // console.log('aggro: ' + toTime((targetInfo.cyclesToTarget * 3) / speedBoost));
  // console.log('cycles: ', targetInfo.cyclesToTarget);
  console.log('more accurate time: ' + toTime(computeBuildTimeForWorkshop(targetInfo.workshop, target ?? 0)));
  // console.log('fully idle accurate cycles ' + toTime(computeBuildTimeForWorkshop(targetInfo.workshop) * 10));
  console.log('research time minimum: ' + toTime(computeResearchTimeForWorkshop(targetInfo.workshop)));
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
