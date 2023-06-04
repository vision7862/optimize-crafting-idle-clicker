import { maxLevelShouldBe } from "../src/maxLevelShouldBe";
import { DEFAULT_PRODUCT } from "./helpers";

describe('maxLevelShouldBe', () => {
    test('should return 15 for this case', () => {
        const product: Product = {
            ...DEFAULT_PRODUCT,
            revenue: 1e12,
            buildCost: 1e14,
        }
        expect(maxLevelShouldBe(1e16, product)).toBe(21);
    });

    test('should return 4 for this case', () => {
        const product: Product = {
            ...DEFAULT_PRODUCT,
            revenue: 1e12,
            buildCost: 162e12,
        }
        expect(maxLevelShouldBe(1e15, product)).toBe(3);
    });

    test('find out', () => {
        const product: Product = {
            ...DEFAULT_PRODUCT,
            outputCount: 5,
            revenue: 3e6,
            buildCost: 20e6,
        }
        expect(maxLevelShouldBe(300e6, product)).toBe(7);
    });
});