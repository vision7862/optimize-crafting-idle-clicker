import { importProducts } from "../src/importProducts";

describe('importProducts', () => {
    test('should import costs and relationship correctly', () => {
        importProducts('FromDustTillLawn');
    });
});