import { importMainWorkshop } from '../../src/buildWorkshop/importMainWorkshop';

describe('importProducts', () => {
  test('Main Workshop Wiki Vers', () => {
    expect(() => importMainWorkshop(true)).not.toThrowError();
  });
});
