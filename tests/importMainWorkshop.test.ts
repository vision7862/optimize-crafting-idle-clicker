import { importMainWorkshop } from '../src/importMainWorkshop';

describe('importProducts', () => {
  test('Main Workshop Wiki Vers', () => {
    expect(() => importMainWorkshop()).not.toThrowError();
  });
});
