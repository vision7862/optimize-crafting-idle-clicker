import { getUpgradedWorkshopIfBetter } from '../../src/optimizeBuildingWorkshop/shouldUpgrade';
import { Product } from '../../src/types/Product';
import { DEFAULT_PRODUCT, DEFAULT_PRODUCT_DETAILS, getWorkshop } from '../helpers/testHelpers';

describe('should Upgrade', () => {
  test('should return true when it will take fewer cycles with upgrade', () => {
    const product: Product = {
      ...DEFAULT_PRODUCT,
      details: {
        ...DEFAULT_PRODUCT_DETAILS,
        buildCost: 7.78e22,
        revenue: 5.97e20,
      },
    };
    const workshop = getWorkshop(product.details, 5);
    expect(getUpgradedWorkshopIfBetter(7e23, product.details.name, workshop, 1)).not.toBeNull();
  });

  test('should return false when it will take more cycles with upgrade', () => {
    const product: Product = {
      ...DEFAULT_PRODUCT,
      details: {
        ...DEFAULT_PRODUCT_DETAILS,
        buildCost: 7.78e22,
        revenue: 5.97e20,
      },
    };
    const workshop = getWorkshop(product.details, 6);
    expect(getUpgradedWorkshopIfBetter(7e23, product.details.name, workshop, 1)).toBeNull();
  });
});
