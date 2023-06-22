import { importProducts } from '../src/importEventProducts';
import { type ProductDetails } from '../src/types/Product';

describe('importProducts', () => {
  test('should import costs and relationship correctly', () => {
    const products: ProductDetails[] = importProducts('FromDustTillLawn');
    expect(products.length).toBe(18);
  });

  test('Wind it up', () => {
    const products: ProductDetails[] = importProducts('Wind it up');
    expect(products.length).toBe(20);
  });

  test('Idle Flicker', () => {
    const products: ProductDetails[] = importProducts('Idle Flicker');
    expect(products.length).toBe(20);
  });

  test('Space Craft', () => {
    const products: ProductDetails[] = importProducts('Space Craft');
    expect(products.length).toBe(25);
  });
});
