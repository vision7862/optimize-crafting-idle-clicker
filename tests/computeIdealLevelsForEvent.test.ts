import { oneByOneToLastItem, oneByOneToTarget, oneByOneToTargetAtEventLevel, optimizeBuildingFromTargetProduct, optimizeBuildingLastItem } from '../src/computeIdealLevelsForEvent';

describe('idealLevels', () => {
  test('max optimizer', () => {
    console.log(optimizeBuildingLastItem('From Dust Till Lawn'));
  });

  test('oneByOneToLastItem', () => {
    console.log(oneByOneToLastItem('From Dust Till Lawn'));
  });

  test('oneByOneToTarget', () => {
    console.log(oneByOneToTarget('BoilerAlert', 100e12));
  });

  test('oneByOneToTargetAtEventLevel', () => {
    const statusMap = oneByOneToTargetAtEventLevel('BoilerAlert', 469e18, 10);
    console.log(JSON.stringify(Object.fromEntries(statusMap)));
  });

  // test('whatever', () => {
  //   const input = "{'Coal' => { level: 221, merchants: 0 }, 'Iron Ore' => { level: 94, merchants: 0 }, 'Iron Ingot' => { level: 83, merchants: 0 }, 'Water Tank' => { level: 9, merchants: 0 }, 'Cylinder' => { level: 19, merchants: 0 }, 'Iron Rivets' => { level: 38, merchants: 0 }, 'Boiler' => { level: 19, merchants: 0 }, 'Iron Pipes' => { level: 18, merchants: 0 }, 'Steel' => { level: 98, merchants: 0 }, 'Machine Parts' => { level: 20, merchants: 0 }, 'Piston' => { level: 19, merchants: 0 }, 'Water Pump' => { level: 9, merchants: 0 }, 'Motor Unit' => { level: 19, merchants: 0 }, 'Engine Components' => { level: 19, merchants: 0 }, 'Steam Engine' => { level: 1, merchants: 0 }, 'Steel Beam' => { level: 3, merchants: 0 }, 'Wheel' => { level: 4, merchants: 0 }, 'Balanced Beam' => { level: 1, merchants: 0 }, 'Beam Engine' => { level: 1, merchants: 0 }}";
  //   // const statuses: Map<string, ProductStatus> = Object.entries(input);
  //   const statuses = importStatus(input);
  //   const statusMap = optimizeToTargetFromStatus('BoilerAlert', statuses, 469e18);
  //   console.log(statusMap);
  // });

  test('6 fame', () => {
    console.log(oneByOneToTarget('BoilerAlert', 1e15));
  });

  test('7 fame', () => {
    console.log(oneByOneToTarget('BoilerAlert', 10e15));
  });

  test('5 fame', () => {
    console.log(oneByOneToTarget('BoilerAlert', 100e12));
  });

  test('top down 5 fame', () => {
    console.log(optimizeBuildingFromTargetProduct('BoilerAlert', 100e12, 'Engine Components'));
  });

  test('top down 5 fame from motor unit', () => {
    console.log(optimizeBuildingFromTargetProduct('BoilerAlert', 100e12, 'Motor Unit'));
  });
});

// function importStatus(statusString: string): Map<string, ProductStatus> {
//   const statuses = new Map<string, ProductStatus>();

//   for (const line of statusString.split('},')) {
//     const details = line.split('=');
//     const status: ProductStatus = {
//       level: +details[1].replace(',', '').split(' ')[3],
//       merchants: +details[1].replace(',', '').split(' ')[5],
//     };
//     statuses.set(details[0].split('\'')[1], status);
//   }
//   return statuses;
// }
