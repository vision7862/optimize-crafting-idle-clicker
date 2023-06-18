import { importMainWorkshopAtLevel } from '../src/importMainWorkshop';

describe('importProducts', () => {
  test('Main Workshop Wiki Vers', () => {
    expect(() => importMainWorkshopAtLevel()).not.toThrowError();
  });
});
