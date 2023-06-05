import { computeIdealLevelsForEvent, optimizeBuildingLastItem } from '../src/computeIdealLevelsForEvent';

describe('idealLevels', () => {
  test('yo', () => {
    console.log(computeIdealLevelsForEvent('From Dust Till Lawn'));
  });

  test('max optimizer', () => {
    console.log(optimizeBuildingLastItem('From Dust Till Lawn'));
  });
});
