import { shouldUpgrade } from '../src/shouldUpgrade';
import { DEFAULT_PRODUCT } from './helpers';

describe('should Upgrade', () => {
    test('should return true when it will take fewer cycles with upgrade', () => {
        const product: Product = {
            ...DEFAULT_PRODUCT,
            buildCost: 7.78e22,
            revenue: 5.97e20,
        }
        expect(shouldUpgrade(7e23, 5, false, false, product)).toBe(true);
    });

    test('should return false when it will take more cycles with upgrade', () => {
        const product: Product = {
            ...DEFAULT_PRODUCT,
            buildCost: 7.78e22,
            revenue: 5.97e20,
        }
        expect(shouldUpgrade(7e23, 6, false, false, product)).toBe(false);
    });
});