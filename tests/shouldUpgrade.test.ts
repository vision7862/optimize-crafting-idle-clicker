import { shouldUpgrade } from '../src/shouldUpgrade';
import { DEFAULT_PRODUCT, getWorkshop } from './helpers';

describe('should Upgrade', () => {
    test('should return true when it will take fewer cycles with upgrade', () => {
        const product: Product = {
            ...DEFAULT_PRODUCT,
            buildCost: 7.78e22,
            revenue: 5.97e20,
        }
        const workshop = getWorkshop(product, 5);
        expect(shouldUpgrade(7e23, false, false, product, workshop)).toBe(true);
    });

    test('should return false when it will take more cycles with upgrade', () => {
        const product: Product = {
            ...DEFAULT_PRODUCT,
            buildCost: 7.78e22,
            revenue: 5.97e20,
        }
        const workshop = getWorkshop(product, 6);
        expect(shouldUpgrade(7e23, false, false, product, workshop)).toBe(false);
    });
});