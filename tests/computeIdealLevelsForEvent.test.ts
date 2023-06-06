import { computeIdealLevelsForEvent, oneByOneToLastItem, optimizeBuildingLastItem, oneByOneToTarget } from '../src/computeIdealLevelsForEvent';

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

  test('oneByOneToLastItem cropped', () => {
    console.log(oneByOneToLastItem('BoilerAlertCropped'));
  });

  test('oneByOneToTarget', () => {
    console.log(oneByOneToTarget('BoilerAlertCropped', 1e12));
  });
});
