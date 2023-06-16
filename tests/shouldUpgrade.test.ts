import { getUpgradedWorkshopIfBetter } from '../src/shouldUpgrade';
import { DEFAULT_PRODUCT_DETAILS, getWorkshop } from './testHelpers';

describe('should Upgrade', () => {
  test('should return true when it will take fewer cycles with upgrade', () => {
    const product: ProductDetails = {
      ...DEFAULT_PRODUCT_DETAILS,
      buildCost: 7.78e22,
      revenue: 5.97e20,
    };
    const workshop = getWorkshop(product, 5);
    expect(getUpgradedWorkshopIfBetter(7e23, false, false, product, workshop)).not.toBeNull();
  });

  test('should return false when it will take more cycles with upgrade', () => {
    const product: ProductDetails = {
      ...DEFAULT_PRODUCT_DETAILS,
      buildCost: 7.78e22,
      revenue: 5.97e20,
    };
    const workshop = getWorkshop(product, 6);
    expect(getUpgradedWorkshopIfBetter(7e23, false, false, product, workshop)).toBeNull();
  });
});
