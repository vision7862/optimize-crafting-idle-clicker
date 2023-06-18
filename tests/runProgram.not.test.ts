import { getStatusMap } from '../src/WorkshopHelpers';
import {
  oneByOneToLastItemWithTime,
  oneByOneToTargetAtEventLevelWithTime,
  oneByOneToTargetAtWorkshopLevelWithTime,
  type TargetWorkshopInfo,
} from '../src/computeIdealLevelsForEvent';
import {
  computeResearchTimeForWorkshop,
  computeTargetFromFame,
  filterOutSkipped,
  getCostOfScientists,
  getCostOfScientistsFromSome,
} from '../src/targetHelpers';
import { type WorkshopStatus } from '../src/types/Workshop';
import { DEFAULT_WORKSHOP_STATUS } from './testHelpers';

describe.only('runProgram', () => {
  function toTime(seconds): string {
    const date = new Date(+0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  function printInfo(targetInfo: TargetWorkshopInfo): void {
    console.log(filterOutSkipped(getStatusMap(targetInfo.workshop)));
    console.log('fully idle: ' + toTime(targetInfo.cyclesToTarget * 10));
    console.log('aggro: ' + toTime(targetInfo.cyclesToTarget * 3));
    console.log('research time minimum: ' + toTime(computeResearchTimeForWorkshop(targetInfo.workshop)));
  }

  describe('events', () => {
    const eventName = 'Space Craft';

    function printFameTime(fame: number, level: number): void {
      printInfo(oneByOneToTargetAtEventLevelWithTime(eventName, computeTargetFromFame(fame, level), level));
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

      test('6 fame level 5', () => {
        printFameTime(6, 5);
      });

      test('2 fame level 5', () => {
        printFameTime(2, 5);
      });

      test('6 fame level 6', () => {
        printFameTime(6, 6);
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
        printInfo(oneByOneToLastItemWithTime(eventName));
      });

      describe('scientists', () => {
        beforeEach(() => {
          console.log(expect.getState().currentTestName);
        });

        function testNumScientists(numScientists: number): void {
          printInfo(oneByOneToTargetAtEventLevelWithTime(eventName, getCostOfScientists(numScientists), 10));
        }

        test('280 scientists', () => {
          testNumScientists(280);
        });

        test('290 scientists', () => {
          testNumScientists(290);
        });

        test('300 scientists', () => {
          testNumScientists(300);
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
    function printFameTime(fame: number, level: number, scientists: number = 100): void {
      const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS;
      const targetInfo = oneByOneToTargetAtWorkshopLevelWithTime(computeTargetFromFame(fame, level), workshopStatus);
      printInfo(targetInfo);
    }

    test('import Everything, fame 15 lvl 19', () => {
      printFameTime(15, 19);
    });

    test('import Everything, fame 14 lvl 19', () => {
      printFameTime(14, 19);
    });

    test('15 fame lvl 6', () => {
      printFameTime(15, 6, 160);
    });

    test('5 fame lvl 7', () => {
      printFameTime(5, 7);
    });

    test('6 fame lvl 8', () => {
      printFameTime(6, 8);
    });

    test('6 fame lvl 9', () => {
      printFameTime(6, 9);
    });

    test('15 fame lvl 13', () => {
      printFameTime(15, 13);
    });

    test('15 fame lvl 14', () => {
      printFameTime(15, 14);
    });

    test('14 fame lvl 14', () => {
      printFameTime(14, 14);
    });

    test('15 fame lvl 15', () => {
      printFameTime(15, 15);
    });

    test('14 fame lvl 15', () => {
      printFameTime(14, 15);
    });

    test('13 fame lvl 15', () => {
      printFameTime(13, 15);
    });

    test('15 fame lvl 17', () => {
      printFameTime(15, 17);
    });

    describe('time-based goals', () => {
      function maximizeTypeInTime(thingMaxing: string, minutes: number, level: number, startingAmount: number, getTarget: (testingAmount: number) => number): void {
        const targetTimeInSeconds = minutes * 60;
        let withinTimeTargetInfo: TargetWorkshopInfo | null = null;
        let withinTimeAmount = 0;
        const workshopStatus: WorkshopStatus = DEFAULT_WORKSHOP_STATUS;
        for (let amount = startingAmount; amount < 1000; amount++) {
          const targetInfo = oneByOneToTargetAtWorkshopLevelWithTime(getTarget(amount), { ...workshopStatus, level });
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
          console.log('research time minimum: ' + toTime(computeResearchTimeForWorkshop(withinTimeTargetInfo.workshop)));
        } else {
          console.log('cannot get at any additional ' + thingMaxing + ' in 20 minutes');
        }
      }

      test('get as much fame as possible in semi-active 20 minutes at level 15', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 15);
        maximizeTypeInTime('fame', 10, 15, 5, getTarget);
      });

      test('get as many scientists as possible from 406 in 20 mintues at level 15', () => {
        const currentScientists = 411;
        const getTarget = (scientists: number): number => getCostOfScientistsFromSome(currentScientists, scientists);
        maximizeTypeInTime('scientists', 10, 15, currentScientists, getTarget);
      });

      test('get as much fame as possible in semi-active 30 minutes at level 16', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 16);
        maximizeTypeInTime('fame', 30, 16, 5, getTarget);
      });

      test('get as many scientists as possible from 422 in 20 mintues at level 16', () => {
        const currentScientists = 422;
        const getTarget = (scientists: number): number => getCostOfScientistsFromSome(currentScientists, scientists);
        maximizeTypeInTime('scientists', 10, 16, currentScientists, getTarget);
      });

      test('get as much fame as possible in semi-active 60 minutes at level 17', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 17);
        maximizeTypeInTime('fame', 60, 17, 12, getTarget);
      });
    });
  });
});
