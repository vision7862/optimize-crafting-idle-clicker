import { shouldUpgrade } from '../src/shouldUpgrade';

describe('should Upgrade', () => {
    test('should return true when it will take fewer cycles with upgrade', () => {
        expect(shouldUpgrade(1e16,11,1,true,1e12,true,3.5e14)).toBe(true);
    });
    test('should return false when it will take more cycles with upgrade', () => {
        expect(shouldUpgrade(1e16,30,1,true,1e12,true,3.5e14)).toBe(false);
    });
});