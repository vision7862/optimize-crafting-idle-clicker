import { importMainWorkshopAtLevel } from '../src/importMainWorkshop';

describe('importProducts', () => {
  test('Main Workshop Wiki Vers', () => {
    expect(() => importMainWorkshopAtLevel(19)).not.toThrowError();
  });
});
