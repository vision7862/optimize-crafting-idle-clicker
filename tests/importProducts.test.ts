import { importProducts } from "../src/importProducts";

describe('importProducts', () => {
    test('should import costs and relationship correctly', () => {
        const products: Map<string, Product> = importProducts('FromDustTillLawn');
        expect(products.size).toBe(18);
    });
});