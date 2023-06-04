import { maxLevelShouldBe } from "../src/maxLevelShouldBe";

describe('maxLevelShouldBe', () => {
    test('should return 15 for this case', () => {
        expect(maxLevelShouldBe(1e16,1,1e12,1e14)).toBe(20);
    });

    test('should return 4 for this case', () => {
        expect(maxLevelShouldBe(1e15,1,1e12,162e12)).toBe(3);
    });

    test('find out', () => {
        expect(maxLevelShouldBe(300e6,5,3e6,20e6*1.08)).toBe(7);
    });
});