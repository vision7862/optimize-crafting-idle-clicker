import { computeTargetFromFame, oneByOneToLastItem, oneByOneToTarget, oneByOneToTargetAtEventLevel } from '../src/computeIdealLevelsForEvent';
import { type ProductStatus } from '../src/types/Workshop';

describe.only('runProgram', () => {
  const eventName = 'Wind it up';
  function getFame(fame: number, level: number): Map<string, ProductStatus> {
    return oneByOneToTargetAtEventLevel(eventName, computeTargetFromFame(fame, level), level);
  }

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
    console.log(oneByOneToTarget(eventName, 3.4e19));
  });

  test('300 scientists', () => {
    console.log(oneByOneToTarget(eventName, 5.61e20));
  });

  test('6 fame level 10', () => {
    console.log(getFame(6, 10));
  });

  test('7 fame level 10', () => {
    console.log(getFame(6, 10));
  });

  test('5 fame level 10', () => {
    console.log(getFame(6, 10));
  });

  test('3 fame level 10', () => {
    console.log(getFame(6, 10));
  });
});
