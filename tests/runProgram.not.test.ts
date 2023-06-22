import { bottomUpToLastItem, bottomUpToMoney } from '../src/computeIdealLevelsForEvent';
import {
  computeResearchTimeForWorkshop,
  getCostOfScientists,
  getCostOfScientistsFromSome,
  getFinalNumScientistsCanAfford,
} from '../src/helpers/ResearchHelpers';
import { getStatusMap } from '../src/helpers/WorkshopHelpers';
import { computeTargetFromFame, filterOutSkipped } from '../src/helpers/targetHelpers';
import { WorkshopUpgradeInfo } from '../src/shouldUpgrade';
import { DEFAULT_WORKSHOP_STATUS_EVENT, DEFAULT_WORKSHOP_STATUS_MAIN, WorkshopStatus } from '../src/types/Workshop';

describe.only('runProgram', () => {
  function toTime(seconds: number): string {
    const date = new Date(+0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  function printInfo(targetInfo: WorkshopUpgradeInfo, target?: number): void {
    console.log(filterOutSkipped(getStatusMap(targetInfo.workshop)));
    console.log('fully idle: ' + toTime(targetInfo.cyclesToTarget * 10));
    console.log('aggro: ' + toTime(targetInfo.cyclesToTarget * 3));
    console.log('research time minimum: ' + toTime(computeResearchTimeForWorkshop(targetInfo.workshop)));
    if (target !== undefined) {
      const startingScientists = targetInfo.workshop.workshopStatus.scientists;
      const affordableScientists = getFinalNumScientistsCanAfford(startingScientists, target * 0.01);
      console.log(
        'can easily afford ' +
          affordableScientists.toString() +
          ' total scientists (' +
          (affordableScientists - startingScientists).toString() +
          ' additional)',
      );
    }
  }

  describe('events', () => {
    const eventName = 'Space Craft';

    function printFameTime(fame: number, level: number): void {
      const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_EVENT, level: 10, eventName };
      const target = computeTargetFromFame(fame, level);
      printInfo(bottomUpToMoney(target, workshopStatus), target);
    }

    describe('leveling', () => {
      test('2 fame level 1', () => {
        printFameTime(2, 1);
      });

      test('3 fame level 2', () => {
        printFameTime(3, 2);
      });

      test('5 fame level 3', () => {
        printFameTime(5, 3);
      });

      test('6 fame level 3', () => {
        printFameTime(6, 3);
      });

      test('6 fame level 4', () => {
        printFameTime(6, 4);
      });

      test('5 fame level 4', () => {
        printFameTime(5, 4);
      });

      test('6 fame level 5', () => {
        printFameTime(6, 5);
      });

      test('5 fame level 5', () => {
        printFameTime(5, 5);
      });

      test('2 fame level 5', () => {
        printFameTime(2, 5);
      });

      test('6 fame level 6', () => {
        printFameTime(6, 6);
      });

      test('5 fame level 6', () => {
        printFameTime(5, 6);
      });

      test('6 fame level 7', () => {
        printFameTime(6, 7);
      });

      test('6 fame level 8', () => {
        printFameTime(6, 8);
      });

      test('6 fame level 9', () => {
        printFameTime(6, 9);
      });

      test('5 fame level 9', () => {
        printFameTime(5, 9);
      });

      test('3 fame level 9', () => {
        printFameTime(3, 9);
      });
    });

    describe('10+', () => {
      test('last product level 10', () => {
        printInfo(bottomUpToLastItem({ ...DEFAULT_WORKSHOP_STATUS_EVENT, eventName }));
      });

      describe('scientists', () => {
        beforeEach(() => {
          console.log(expect.getState().currentTestName);
        });

        function testNumScientists(numScientists: number): void {
          const workshopStatus: WorkshopStatus = {
            ...DEFAULT_WORKSHOP_STATUS_EVENT,
            level: 10,
            scientists: numScientists - 10,
            eventName,
          };
          const target = getCostOfScientists(numScientists);
          printInfo(bottomUpToMoney(target, workshopStatus), target);
        }

        test('280 scientists', () => {
          testNumScientists(280);
        });

        test('290 scientists', () => {
          testNumScientists(290);
        });

        test('295 scientists', () => {
          testNumScientists(295);
        });

        test('300 scientists', () => {
          testNumScientists(300);
        });

        test('305 scientists', () => {
          testNumScientists(305);
        });

        test('310 scientists', () => {
          testNumScientists(310);
        });

        test('320 scientists', () => {
          testNumScientists(320);
        });
      });

      test('6 fame level 10+', () => {
        printFameTime(6, 10);
      });

      test('7 fame level 10+', () => {
        printFameTime(7, 10);
      });

      test('5 fame level 10+', () => {
        printFameTime(5, 10);
      });

      test('4 fame level 10+', () => {
        printFameTime(4, 10);
      });

      test('3 fame level 10+', () => {
        printFameTime(6, 10);
      });
    });
  });

  describe('main workshop', () => {
    function printFameTime(fame: number, partialWorkshopStatus: Partial<WorkshopStatus>): void {
      const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
      const target = computeTargetFromFame(fame, workshopStatus.level);
      const targetInfo = bottomUpToMoney(target, workshopStatus);
      printInfo(targetInfo, target);
    }

    describe('shooting for half the required fame', () => {
      test('5 fame lvl 7', () => {
        printFameTime(5, { level: 7 });
      });

      test('6 fame lvl 8', () => {
        printFameTime(6, { level: 8 });
      });

      test('6 fame lvl 9', () => {
        printFameTime(6, { level: 9 });
      });

      test('7 fame lvl 11', () => {
        printFameTime(7, { level: 11 });
      });

      test('8 fame lvl 12', () => {
        printFameTime(8, { level: 12 });
      });

      test('10 fame lvl 13', () => {
        printFameTime(10, { level: 13 });
      });

      test('10 fame lvl 14', () => {
        printFameTime(10, { level: 14 });
      });

      test('12 fame lvl 16', () => {
        printFameTime(12, { level: 16 });
      });

      test('11 fame lvl 18', () => {
        printFameTime(11, { level: 18 });
      });

      test('11 fame lvl 19', () => {
        printFameTime(11, { level: 19 });
      });

      test('12 fame lvl 21', () => {
        printFameTime(12, { level: 21, scientists: 520, researchBoostActive: true });
      });

      test('13 fame lvl 22', () => {
        printFameTime(13, { level: 22, scientists: 520, researchBoostActive: true });
      });
    });

    describe('shooting for gems', () => {
      describe('8% chance', () => {
        function getGemsLowChance(partialWorkshopStatus: Partial<WorkshopStatus>): void {
          printFameTime(14, partialWorkshopStatus);
        }

        test('lvl 6', () => {
          getGemsLowChance({ level: 6, scientists: 160 });
        });

        test('lvl 7', () => {
          getGemsLowChance({ level: 7 });
        });

        test('lvl 8', () => {
          getGemsLowChance({ level: 8 });
        });

        test('lvl 9', () => {
          getGemsLowChance({ level: 9 });
        });

        test('lvl 10', () => {
          getGemsLowChance({ level: 10 });
        });

        test('lvl 11', () => {
          getGemsLowChance({ level: 11 });
        });

        test('lvl 12', () => {
          getGemsLowChance({ level: 12 });
        });

        test('lvl 13', () => {
          getGemsLowChance({ level: 13 });
        });

        test('lvl 14', () => {
          getGemsLowChance({ level: 14 });
        });

        test('lvl 15', () => {
          getGemsLowChance({ level: 15 });
        });

        test('lvl 16', () => {
          getGemsLowChance({ level: 16 });
        });

        test('lvl 17', () => {
          getGemsLowChance({ level: 17 });
        });

        test('lvl 18', () => {
          getGemsLowChance({ level: 18 });
        });

        test('lvl 19', () => {
          getGemsLowChance({ level: 19 });
        });

        test('lvl 20', () => {
          getGemsLowChance({ level: 20 });
        });

        test('lvl 22', () => {
          getGemsLowChance({ level: 22, scientists: 520, researchBoostActive: true });
        });
      });

      describe('12% chance', () => {
        function getGemsHighChance(partialWorkshopStatus: Partial<WorkshopStatus>): void {
          printFameTime(15, partialWorkshopStatus);
        }

        test('lvl 6', () => {
          getGemsHighChance({ level: 6, scientists: 160 });
        });

        test('lvl 7', () => {
          getGemsHighChance({ level: 7 });
        });

        test('lvl 8', () => {
          getGemsHighChance({ level: 8 });
        });

        test('lvl 9', () => {
          getGemsHighChance({ level: 9 });
        });

        test('lvl 10', () => {
          getGemsHighChance({ level: 10 });
        });

        test('lvl 11', () => {
          getGemsHighChance({ level: 11 });
        });

        test('lvl 12', () => {
          getGemsHighChance({ level: 12 });
        });

        test('lvl 13', () => {
          getGemsHighChance({ level: 13 });
        });

        test('lvl 14', () => {
          getGemsHighChance({ level: 14 });
        });

        test('lvl 15', () => {
          getGemsHighChance({ level: 15 });
        });

        test('lvl 16', () => {
          getGemsHighChance({ level: 16 });
        });

        test('lvl 17', () => {
          getGemsHighChance({ level: 17 });
        });

        test('lvl 18', () => {
          getGemsHighChance({ level: 18 });
        });

        test('lvl 19', () => {
          getGemsHighChance({ level: 19 });
        });

        test('lvl 20', () => {
          getGemsHighChance({ level: 20 });
        });

        test('lvl 22', () => {
          getGemsHighChance({ level: 22, scientists: 520 });
        });
      });
    });

    describe('time-based goals', () => {
      function maximizeTypeInTime(
        thingMaxing: string,
        minutes: number,
        level: number,
        startingAmount: number,
        getTarget: (testingAmount: number) => number,
      ): void {
        const targetTimeInSeconds = minutes * 60;
        let withinTimeTargetInfo: WorkshopUpgradeInfo | null = null;
        let withinTimeAmount = 0;
        const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS_MAIN;
        for (let amount = startingAmount; amount < 1000; amount++) {
          const targetInfo = bottomUpToMoney(getTarget(amount), { ...workshopStatus, level });
          const semiActiveTime = targetInfo.cyclesToTarget * 5;
          if (semiActiveTime < targetTimeInSeconds) {
            withinTimeTargetInfo = targetInfo;
            withinTimeAmount = amount;
          } else break;
        }
        if (withinTimeTargetInfo !== null) {
          console.log(filterOutSkipped(getStatusMap(withinTimeTargetInfo.workshop)));
          console.log('getting ' + withinTimeAmount.toString() + ' total ' + thingMaxing);
          console.log('semi-active: ' + toTime(withinTimeTargetInfo.cyclesToTarget * 5));
          console.log(
            'research time minimum: ' + toTime(computeResearchTimeForWorkshop(withinTimeTargetInfo.workshop)),
          );
        } else {
          console.log('cannot get at any additional ' + thingMaxing + ' in 20 minutes');
        }
      }

      test('get as much fame as possible in semi-active 20 minutes at level 15', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 15);
        maximizeTypeInTime('fame', 10, 15, 5, getTarget);
      });

      test('get as many scientists as possible from 406 in 20 minutes at level 15', () => {
        const currentScientists = 411;
        const getTarget = (scientists: number): number => getCostOfScientistsFromSome(currentScientists, scientists);
        maximizeTypeInTime('scientists', 10, 15, currentScientists, getTarget);
      });

      test('get as much fame as possible in semi-active 30 minutes at level 16', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 16);
        maximizeTypeInTime('fame', 30, 16, 5, getTarget);
      });

      test('get as many scientists as possible from 422 in 20 minutes at level 16', () => {
        const currentScientists = 422;
        const getTarget = (scientists: number): number => getCostOfScientistsFromSome(currentScientists, scientists);
        maximizeTypeInTime('scientists', 10, 16, currentScientists, getTarget);
      });

      test('get as much fame as possible in semi-active 60 minutes at level 17', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 17);
        maximizeTypeInTime('fame', 60, 17, 12, getTarget);
      });

      test('get as much fame as possible in semi-active 10 minutes at level 9', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 9);
        maximizeTypeInTime('fame', 10, 9, 8, getTarget);
      });
    });
  });
});
