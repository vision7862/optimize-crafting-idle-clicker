import { oneByOneToLastItem, oneByOneToTarget, oneByOneToTargetAtEventLevel, oneByOneToTargetAtWorkshopLevel } from '../src/computeIdealLevelsForEvent';
import { getMainWorkshopIncomeMultiplier } from '../src/shouldUpgrade';
import { computeTargetFromFame, getCostOfScientists } from '../src/targetHelpers';
import { type ProductStatus } from '../src/types/Workshop';

describe.only('runProgram', () => {
  describe('events', () => {
    const eventName = 'Idle flicker';
    function getFame(fame: number, level: number): Map<string, ProductStatus> {
      return oneByOneToTargetAtEventLevel(eventName, computeTargetFromFame(fame, level), level);
    }

    test('2 fame level 1', () => {
      console.log(getFame(2, 1));
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

    test('last product level 10', () => {
      console.log(oneByOneToLastItem(eventName));
    });

    test('280 scientists', () => {
      console.log(oneByOneToTarget(eventName, 2.85e19));
    });

    test('290 scientists', () => {
      console.log('290 scientists (' + getCostOfScientists(290).toString() + ')');
      console.log(oneByOneToTarget(eventName, 1.17e20));
    });

    test('300 scientists', () => {
      console.log('300 scientists (' + getCostOfScientists(300).toString() + ') vs estimate of ' + 5.61e20.toString());
      console.log(oneByOneToTarget(eventName, 5.61e20));
    });

    test('300 scientists but from 250', () => {
      console.log(oneByOneToTarget(eventName, 469e18)); // actual number from game
    });

    test('6 fame level 10+', () => {
      console.log(getFame(6, 10));
    });

    test('7 fame level 10+', () => {
      console.log(getFame(7, 10));
    });

    test('5 fame level 10+', () => {
      console.log(getFame(6, 10));
    });

    test('4 fame level 10+', () => {
      console.log(getFame(4, 10));
    });

    test('3 fame level 10+', () => {
      console.log(getFame(6, 10));
    });
  });

  describe('main workshop', () => {
    test.skip('uhhhh', () => {
      console.log(oneByOneToLastItem('Main Workshop'));
    });

    test.skip('income multiplier', () => {
      expect(getMainWorkshopIncomeMultiplier(19)).toBe(4e6);
    });

    test('import Everything, fame 15 lvl 19', () => {
      console.log(oneByOneToTargetAtWorkshopLevel(computeTargetFromFame(15, 19), 19));
    });

    test('import Everything, fame 14 lvl 19', () => {
      console.log(oneByOneToTargetAtWorkshopLevel(computeTargetFromFame(14, 19), 19));
    });
  });
});
