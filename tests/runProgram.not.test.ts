import { oneByOneToLastItemWithTime, oneByOneToTargetAtEventLevel, oneByOneToTargetAtEventLevelWithTime, oneByOneToTargetAtWorkshopLevel, oneByOneToTargetAtWorkshopLevelWithTime, type TargetWorkshopInfo } from '../src/computeIdealLevelsForEvent';
import { computeTargetFromFame, filterOutSkipped, getCostOfScientists, getCostOfScientistsFromSome } from '../src/targetHelpers';
import { type ProductStatus } from '../src/types/Workshop';

describe.only('runProgram', () => {
  function toTime(seconds): string {
    const date = new Date(+0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  describe('events', () => {
    const eventName = 'Idle flicker';
    function getFame(fame: number, level: number): Map<string, ProductStatus> {
      return oneByOneToTargetAtEventLevel(eventName, computeTargetFromFame(fame, level), level);
    }

    function printFameTime(fame: number, level: number): void {
      const targetInfo = oneByOneToTargetAtEventLevelWithTime(eventName, computeTargetFromFame(fame, level), level);
      console.log(targetInfo.statuses);
      console.log('fully idle: ' + toTime(targetInfo.cyclesToTarget * 10));
      console.log('aggro: ' + toTime(targetInfo.cyclesToTarget * 3));
    }

    describe('leveling', () => {
      test('2 fame level 1', () => {
        printFameTime(2, 1);
      });

      test('3 fame level 2', () => {
        console.log(getFame(3, 2));
      });

      test('5 fame level 3', () => {
        console.log(getFame(5, 3));
      });

      test('6 fame level 3', () => {
        console.log(getFame(6, 3));
      });

      test('6 fame level 4', () => {
        console.log(getFame(6, 4));
      });

      test('6 fame level 5', () => {
        console.log(getFame(6, 5));
      });

      test('2 fame level 5', () => {
        console.log(getFame(2, 5));
      });

      test('6 fame level 6', () => {
        console.log(getFame(6, 6));
      });

      test('6 fame level 7', () => {
        console.log(getFame(6, 7));
      });

      test('6 fame level 8', () => {
        console.log(getFame(6, 8));
      });

      test('6 fame level 9', () => {
        console.log(getFame(6, 9));
      });

      test('5 fame level 9', () => {
        console.log(getFame(5, 9));
      });

      test('3 fame level 9', () => {
        console.log(getFame(3, 9));
      });
    });

    describe('10+', () => {
      test('last product level 10', () => {
        const targetInfo = oneByOneToLastItemWithTime(eventName);
        console.log(targetInfo.statuses);
        console.log('fully idle: ' + toTime(targetInfo.cyclesToTarget * 10));
        console.log('aggro: ' + toTime(targetInfo.cyclesToTarget * 3));
      });

      describe('scientists', () => {
        beforeEach(() => {
          console.log(expect.getState().currentTestName);
        });

        function testNumScientists(numScientists: number): void {
          const targetInfo = oneByOneToTargetAtEventLevelWithTime(eventName, getCostOfScientists(numScientists), 10);
          console.log(targetInfo.statuses);
          console.log('fully idle: ' + toTime(targetInfo.cyclesToTarget * 10));
          console.log('aggro: ' + toTime(targetInfo.cyclesToTarget * 3));
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
    function printFameTime(fame: number, level: number): void {
      const targetInfo = oneByOneToTargetAtWorkshopLevelWithTime(computeTargetFromFame(fame, level), level);
      console.log(filterOutSkipped(targetInfo.statuses));
      console.log('fully idle: ' + toTime(targetInfo.cyclesToTarget * 10));
      console.log('aggro: ' + toTime(targetInfo.cyclesToTarget * 3));
    }

    test('import Everything, fame 15 lvl 19', () => {
      console.log(oneByOneToTargetAtWorkshopLevel(computeTargetFromFame(15, 19), 19));
    });

    test('import Everything, fame 14 lvl 19', () => {
      console.log(oneByOneToTargetAtWorkshopLevel(computeTargetFromFame(14, 19), 19));
    });

    test('5 fame lvl 7', () => {
      console.log(oneByOneToTargetAtWorkshopLevel(computeTargetFromFame(5, 7), 7));
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

    describe('time-based goals', () => {
      function maximizeTypeInTime(thingMaxing: string, minutes: number, level: number, startingAmount: number, getTarget: (testingAmount: number) => number): void {
        const targetTimeInSeconds = minutes * 60;
        let withinTimeTargetInfo: TargetWorkshopInfo | null = null;
        let withinTimeAmount = 0;
        for (let amount = startingAmount; amount < 1000; amount++) {
          const targetInfo = oneByOneToTargetAtWorkshopLevelWithTime(getTarget(amount), level);
          const semiActiveTime = targetInfo.cyclesToTarget * 5;
          if (semiActiveTime < targetTimeInSeconds) {
            withinTimeTargetInfo = targetInfo;
            withinTimeAmount = amount;
          } else break;
        }
        if (withinTimeTargetInfo !== null) {
          console.log(filterOutSkipped(withinTimeTargetInfo.statuses));
          console.log('getting ' + withinTimeAmount.toString() + ' total ' + thingMaxing);
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
    });
  });
});
