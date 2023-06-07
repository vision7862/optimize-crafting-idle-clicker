import { computeIdealLevelsForEvent, oneByOneToLastItem, optimizeBuildingLastItem, oneByOneToTarget, oneByOneToTargetAtEventLevel } from '../src/computeIdealLevelsForEvent';

describe('idealLevels', () => {
  test.skip('yo', () => {
    console.log(computeIdealLevelsForEvent('From Dust Till Lawn'));
  });

  test('max optimizer', () => {
    console.log(optimizeBuildingLastItem('From Dust Till Lawn'));
  });

  test('oneByOneToLastItem', () => {
    console.log(oneByOneToLastItem('From Dust Till Lawn'));
  });

  test('oneByOneToTarget', () => {
    console.log(oneByOneToTarget('BoilerAlert', 100e12));
  });

  test.only('oneByOneToTargetAtEventLevel', () => {
    console.log(oneByOneToTargetAtEventLevel('BoilerAlert', 469e18, 10));
  });
});
