import { importProducts } from "../src/importProducts";

describe('importProducts', () => {
    test('should import costs and relationship correctly', () => {
        const products: Product[] = importProducts('FromDustTillLawn');
        expect(products.length).toBe(18);
    });
});