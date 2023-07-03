import { importProducts } from '../src/importEventProducts';
import { ProductDetails } from '../src/types/Product';

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

  test('Vital Science', () => {
    const products: ProductDetails[] = importProducts('Vital Science');
    expect(products.length).toBe(22);
  });

  test('A Car is Born', () => {
    const products: ProductDetails[] = importProducts('A Car is Born');
    expect(products.length).toBe(22);
  });

  test('Craft For Freedom', () => {
    const products: ProductDetails[] = importProducts('Craft For Freedom');
    expect(products.length).toBe(25);
  });
});
