import { maxLevelShouldBe } from '../src/maxLevelShouldBe';
import { DEFAULT_PRODUCT, getWorkshop } from './helpers';

describe('maxLevelShouldBe', () => {
  test('should return 15 for this case', () => {
    const product: Product = {
      ...DEFAULT_PRODUCT,
      revenue: 1e12,
      buildCost: 1e14,
    };
    const workshop = getWorkshop(product, 1);
    expect(maxLevelShouldBe(1e16, product, workshop)).toBe(22);
  });

  test('should return 4 for this case', () => {
    const product: Product = {
      ...DEFAULT_PRODUCT,
      revenue: 1e12,
      buildCost: 162e12,
    };
    const workshop = getWorkshop(product, 1);
    expect(maxLevelShouldBe(1e15, product, workshop)).toBe(4);
  });
});
