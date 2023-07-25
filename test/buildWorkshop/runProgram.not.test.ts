import {
  bestGemChance,
  bottomUpToLastItem,
  bottomUpToMoney,
  productDownUpToMoney,
  quickestNewLevel,
} from '../../src/buildWorkshop/computeIdealLevelsForEvent';
import {
  computeResearchTimeForWorkshop,
  getCostOfScientists,
  getCostOfScientistsFromSome,
  getFinalNumScientistsCanAfford,
} from '../../src/buildWorkshop/helpers/ResearchHelpers';
import { getStatusMap } from '../../src/buildWorkshop/helpers/WorkshopHelpers';
import { printFameTime, printInfo, toTime } from '../../src/buildWorkshop/helpers/printResults';
import { computeTargetFromFame, filterOutSkipped } from '../../src/buildWorkshop/helpers/targetHelpers';
import { WorkshopUpgradeInfo } from '../../src/buildWorkshop/shouldUpgrade';
import {
  DEFAULT_WORKSHOP_STATUS_EVENT,
  DEFAULT_WORKSHOP_STATUS_MAIN,
  WorkshopStatus,
} from '../../src/buildWorkshop/types/Workshop';

describe.only('runProgram', () => {
  describe('events', () => {
    const eventName = 'Hammer Time';
    function printFameTimeEvent(fame: number, partialWorkshopStatus: Partial<WorkshopStatus>): void {
      printFameTime(fame, { ...DEFAULT_WORKSHOP_STATUS_EVENT, ...partialWorkshopStatus, eventName });
    }
    describe('leveling', () => {
      test('2 fame level 1', () => {
        printFameTimeEvent(2, { level: 1 });
      });

      test('3 fame level 2', () => {
        printFameTimeEvent(3, { level: 2 });
      });

      test('5 fame level 3', () => {
        printFameTimeEvent(5, { level: 3, scientists: 1 });
      });

      test('6 fame level 3', () => {
        printFameTimeEvent(6, { level: 3 });
      });

      test('6 fame level 4', () => {
        printFameTimeEvent(6, { level: 4, scientists: 16 });
      });

      test('5 fame level 4', () => {
        printFameTimeEvent(5, { level: 4 });
      });

      test('6 fame level 5', () => {
        printFameTimeEvent(6, { level: 5, scientists: 78 });
      });

      test('2 fame level 5', () => {
        printFameTimeEvent(2, { level: 5, scientists: 92 });
      });

      test('6 fame level 6', () => {
        printFameTimeEvent(6, { level: 6, scientists: 92 });
      });

      test('5 fame level 6', () => {
        printFameTimeEvent(5, { level: 6 });
      });

      test('3 fame level 6', () => {
        printFameTimeEvent(3, { level: 6 });
      });

      test('6 fame level 7', () => {
        printFameTimeEvent(6, { level: 7, scientists: 108 });
      });

      test('4 fame level 7', () => {
        printFameTimeEvent(4, { level: 7 });
      });

      test('6 fame level 8', () => {
        printFameTimeEvent(6, { level: 8, scientists: 124 });
      });

      test('5 fame level 9', () => {
        printFameTimeEvent(5, { level: 8, scientists: 164 });
      });

      test('6 fame level 9', () => {
        printFameTimeEvent(6, { level: 9, scientists: 164, clickBoostActive: false });
      });

      test('5 fame level 9', () => {
        printFameTimeEvent(5, { level: 9 });
      });

      test('3 fame level 9', () => {
        printFameTimeEvent(3, { level: 9 });
      });

      test('6 fame level 10', () => {
        printFameTimeEvent(6, { level: 10, clickBoostActive: false, speedBoostActive: true });
      });
    });

    describe('10+', () => {
      test('last product level 10', () => {
        printInfo(bottomUpToLastItem({ ...DEFAULT_WORKSHOP_STATUS_EVENT, eventName, scientists: 169 }));
      });

      describe('scientists', () => {
        function printTimeToScientist(): void {
          for (let numScientists = 255; numScientists < 261; numScientists++) {
            const workshopStatus: WorkshopStatus = {
              ...DEFAULT_WORKSHOP_STATUS_EVENT,
              level: 10,
              scientists: numScientists - 10,
              eventName,
            };
            const target = getCostOfScientists(numScientists);
            printInfo(bottomUpToMoney(target, workshopStatus), target);
          }
        }
        it('test time altogether', () => {
          printTimeToScientist();
        });
        beforeEach(() => {
          console.log(expect.getState().currentTestName);
        });

        function testNumScientists(numScientists: number): void {
          const workshopStatus: WorkshopStatus = {
            ...DEFAULT_WORKSHOP_STATUS_EVENT,
            level: 10,
            scientists: numScientists - 10,
            eventName,
            speedBoostActive: true,
            clickBoostActive: false,
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

        test.skip('300 top down', () => {
          const workshopStatus: WorkshopStatus = {
            ...DEFAULT_WORKSHOP_STATUS_EVENT,
            level: 10,
            scientists: 293,
            eventName: 'A Car is Born Click Last Three',
          };
          const target = getCostOfScientists(300);
          printInfo(productDownUpToMoney(workshopStatus, target, 'Truck'), target);
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
        printFameTimeEvent(6, { level: 10, scientists: 300 });
      });

      test('6 fame level 10+ no clicking', () => {
        printFameTimeEvent(6, { level: 10, scientists: 306, clickBoostActive: false, speedBoostActive: true });
      });

      test('6 fame level 10+ no boosts', () => {
        printFameTimeEvent(6, {
          level: 10,
          scientists: 300,
          clickBoostActive: false,
          researchBoostActive: false,
          merchantBoostActive: false,
        });
      });

      test('7 fame level 10+', () => {
        printFameTimeEvent(7, { level: 10 });
      });

      test('5 fame level 10+', () => {
        printFameTimeEvent(5, { level: 10, scientists: 306, clickBoostActive: false, speedBoostActive: true });
      });

      test('4 fame level 10+', () => {
        printFameTimeEvent(4, { level: 10, scientists: 306, clickBoostActive: false, speedBoostActive: true });
      });

      test('3 fame level 10+', () => {
        printFameTimeEvent(6, { level: 10 });
      });
    });
  });

  describe('main workshop', () => {
    describe('shooting for half required/specific fame', () => {
      test('6 fame lvl 2', () => {
        printFameTime(6, { level: 2 });
      });

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

      test('12 fame lvl 20', () => {
        printFameTime(12, { level: 20, scientists: 501, researchBoostActive: true, merchantBoostActive: true });
      });

      test('12 fame lvl 21', () => {
        printFameTime(12, { level: 21, scientists: 520, researchBoostActive: true, merchantBoostActive: true });
      });

      test('8 fame lvl 21', () => {
        printFameTime(8, { level: 21, scientists: 504, researchBoostActive: true, merchantBoostActive: true });
      });

      test('13 fame lvl 22', () => {
        printFameTime(13, { level: 22, scientists: 520, researchBoostActive: true });
      });

      test('9 fame lvl 22', () => {
        printFameTime(9, { level: 22, scientists: 504, researchBoostActive: true, merchantBoostActive: true });
      });

      test('13 fame lvl 23', () => {
        printFameTime(13, { level: 23, scientists: 520, researchBoostActive: true });
      });

      test('9 fame lvl 23', () => {
        printFameTime(9, { level: 23, scientists: 520, researchBoostActive: true });
      });

      test('12 fame lvl 43', () => {
        printFameTime(12, { level: 43, scientists: 914, researchBoostActive: true, speedBoostActive: true });
      });

      test('20 fame lvl 43', () => {
        printFameTime(20, { level: 43, scientists: 1001, researchBoostActive: true });
      });
    });

    describe('shooting for gems', () => {
      function getGems(partialWorkshopStatus: Partial<WorkshopStatus>): void {
        const ret = bestGemChance(partialWorkshopStatus);
        const target = computeTargetFromFame(ret.fame, ret.upgradeInfo.workshop.workshopStatus.level);
        printInfo(ret.upgradeInfo, target);
      }

      test('lvl 6', () => {
        getGems({ level: 6, scientists: 160 });
      });

      test('lvl 7', () => {
        getGems({ level: 7 });
      });

      test('lvl 8', () => {
        getGems({ level: 8, scientists: 174 });
      });

      test('lvl 9', () => {
        getGems({ level: 9, scientists: 274, researchBoostActive: true });
      });

      test('lvl 10', () => {
        getGems({ level: 10, scientists: 274, researchBoostActive: true });
      });

      test('lvl 11', () => {
        getGems({ level: 11 });
      });

      test('lvl 12', () => {
        getGems({ level: 12 });
      });

      test('lvl 13', () => {
        getGems({ level: 13 });
      });

      test('lvl 14', () => {
        getGems({ level: 14 });
      });

      test('lvl 15', () => {
        getGems({ level: 15 });
      });

      test('lvl 16', () => {
        getGems({ level: 16 });
      });

      test('lvl 17', () => {
        getGems({ level: 17 });
      });

      test('lvl 18', () => {
        getGems({ level: 18 });
      });

      test('lvl 19', () => {
        getGems({ level: 19 });
      });

      test('lvl 19, boosts', () => {
        getGems({
          level: 19,
          clickBoostActive: true,
          researchBoostActive: true,
          merchantBoostActive: true,
        });
      });

      test('lvl 20', () => {
        getGems({ level: 20, researchBoostActive: true, merchantBoostActive: true });
      });

      test('lvl 21, boosts', () => {
        getGems({
          level: 21,
          clickBoostActive: false,
          researchBoostActive: true,
          merchantBoostActive: true,
        });
      });

      test('lvl 22', () => {
        getGems({ level: 22, scientists: 520, researchBoostActive: true });
      });

      test('lvl 24', () => {
        getGems({
          level: 24,
          scientists: 564,
          researchBoostActive: true,
          merchantBoostActive: true,
          speedBoostActive: true,
        });
      });

      test('lvl 31', () => {
        getGems({ level: 31, scientists: 700, researchBoostActive: true });
      });

      test('lvl 32', () => {
        getGems({ level: 32, scientists: 700, researchBoostActive: true });
      });

      test('lvl 37', () => {
        getGems({
          level: 37,
          scientists: 792,
          speedBoostActive: true,
          merchantBoostActive: true,
          researchBoostActive: true,
        });
      });

      test('lvl 37', () => {
        getGems({
          level: 38,
          scientists: 807,
          clickBoostActive: false,
          researchBoostActive: true,
          merchantBoostActive: true,
          speedBoostActive: true,
        });
      });
    });

    describe('time-based goals', () => {
      function maximizeTypeInTime(
        thingMaxing: string,
        minutes: number,
        startingAmount: number,
        partialWorkshopStatus: Partial<WorkshopStatus>,
        getTarget: (testingAmount: number) => number,
      ): void {
        const targetTimeInSeconds = minutes * 60;
        let withinTimeTargetInfo: WorkshopUpgradeInfo | null = null;
        let withinTimeAmount = 0;
        const workshopStatus: WorkshopStatus = { ...DEFAULT_WORKSHOP_STATUS_MAIN, ...partialWorkshopStatus };
        for (let amount = startingAmount; amount < 1000; amount++) {
          const targetInfo = bottomUpToMoney(getTarget(amount), workshopStatus);
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
          const startingScientists = withinTimeTargetInfo.workshop.workshopStatus.scientists;
          const affordableScientists = getFinalNumScientistsCanAfford(
            startingScientists,
            getTarget(withinTimeAmount) * 0.01,
          );
          console.log(
            'can easily afford ' +
              affordableScientists.toString() +
              ' total scientists (' +
              (affordableScientists - startingScientists).toString() +
              ' additional)',
          );
        } else {
          console.log('cannot get at any additional ' + thingMaxing + ' in 20 minutes');
        }
      }

      test('get as much fame as possible in semi-active 20 minutes at level 15', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 15);
        maximizeTypeInTime('fame', 10, 5, { level: 15 }, getTarget);
      });

      test('get as many scientists as possible from 406 in 20 minutes at level 15', () => {
        const currentScientists = 411;
        const getTarget = (scientists: number): number => getCostOfScientistsFromSome(currentScientists, scientists);
        maximizeTypeInTime(
          'scientists',
          10,
          currentScientists,
          { level: 15, scientists: currentScientists },
          getTarget,
        );
      });

      test('get as much fame as possible in semi-active 30 minutes at level 16', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 16);
        maximizeTypeInTime('fame', 30, 5, { level: 16 }, getTarget);
      });

      test('get as many scientists as possible from 422 in 20 minutes at level 16', () => {
        const currentScientists = 422;
        const getTarget = (scientists: number): number => getCostOfScientistsFromSome(currentScientists, scientists);
        maximizeTypeInTime(
          'scientists',
          10,
          currentScientists,
          { level: 16, scientists: currentScientists },
          getTarget,
        );
      });

      test('get as much fame as possible in semi-active 60 minutes at level 17', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 17);
        maximizeTypeInTime('fame', 60, 12, { level: 17 }, getTarget);
      });

      test('get as much fame as possible in semi-active 10 minutes at level 9', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 9);
        maximizeTypeInTime('fame', 10, 8, { level: 9 }, getTarget);
      });

      test('get as much fame as possible in semi-active 10 minutes at level 2', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 2);
        maximizeTypeInTime('fame', 10, 0, { level: 2, scientists: 98 }, getTarget);
      });

      test('get as much fame as possible in semi-active 10 minutes at level 3', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 3);
        maximizeTypeInTime('fame', 10, 0, { level: 3, scientists: 150, researchBoostActive: true }, getTarget);
      });

      test('get as much fame as possible in semi-active 5 minutes at level 3', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 3);
        maximizeTypeInTime('fame', 5, 0, { level: 3, scientists: 150, researchBoostActive: true }, getTarget);
      });

      test('get as much fame as possible in semi-active 5 minutes at level 4', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 4);
        maximizeTypeInTime('fame', 5, 0, { level: 4, scientists: 150, researchBoostActive: true }, getTarget);
      });

      test('get as much fame as possible in semi-active 5 minutes at level 5', () => {
        const getTarget = (fame: number): number => computeTargetFromFame(fame, 5);
        maximizeTypeInTime('fame', 5, 0, { level: 5, scientists: 173, researchBoostActive: true }, getTarget);
      });

      test('get as many scientists in event as possible from 169 in 60 minutes at level 10', () => {
        const currentScientists = 169;
        const getTarget = (scientists: number): number => getCostOfScientistsFromSome(currentScientists, scientists);
        maximizeTypeInTime(
          'scientists',
          60,
          currentScientists,
          { level: 10, scientists: currentScientists, eventName: 'Hammer Time' },
          getTarget,
        );
      });
    });

    describe('fastest level up', () => {
      function quick(partialWorkshopStatus: Partial<WorkshopStatus>): void {
        const moreWorkshopStatus = {
          clickBoostActive: false,
          researchBoostActive: true,
          merchantBoostActive: false,
          ...partialWorkshopStatus,
        };
        const targetInfo = quickestNewLevel(moreWorkshopStatus);
        printInfo(targetInfo);
      }

      it('lvl 1 event', () => {
        quick({
          level: 1,
          scientists: 1,
          eventName: 'Game Changer',
          merchantBoostActive: true,
          speedBoostActive: true,
        });
      });

      it('lvl 24', () => {
        quick({
          level: 23,
          scientists: 546,
        });
      });

      it('lvl 25', () => {
        quick({
          level: 25,
          scientists: 546,
        });
      });

      it('lvl 26', () => {
        quick({
          level: 26,
          scientists: 600,
        });
      });

      it('lvl 27', () => {
        quick({
          level: 27,
          scientists: 600,
        });
      });

      it('lvl 28', () => {
        quick({
          level: 28,
          scientists: 600,
        });
      });

      it('lvl 29', () => {
        quick({
          level: 29,
          scientists: 600,
        });
      });

      it('lvl 30', () => {
        quick({
          level: 30,
          scientists: 700,
        });
      });

      it('lvl 35', () => {
        quick({
          level: 35,
          scientists: 777,
          speedBoostActive: true,
          merchantBoostActive: true,
          researchBoostActive: true,
        });
      });

      it('lvl 36', () => {
        quick({
          level: 36,
          scientists: 780,
          speedBoostActive: true,
          merchantBoostActive: true,
          researchBoostActive: true,
        });
      });

      it('lvl 37', () => {
        quick({
          level: 37,
          scientists: 792,
          speedBoostActive: true,
          merchantBoostActive: true,
          researchBoostActive: true,
        });
      });
    });
  });
});
