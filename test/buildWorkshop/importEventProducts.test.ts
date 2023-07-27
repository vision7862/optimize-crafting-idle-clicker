import { importProducts } from '../../src/buildWorkshop/importEventProducts';
import { ProductDetails } from '../../src/buildWorkshop/types/Product';

describe('importProducts', () => {
  test('should import costs and relationship correctly', () => {
    const products: ProductDetails[] = Array.from(importProducts('FromDustTillLawn').values());
    expect(products.length).toBe(18);
  });

  test('Wind it up', () => {
    const products: ProductDetails[] = Array.from(importProducts('Wind it up').values());
    expect(products.length).toBe(20);
  });

  test('Idle Flicker', () => {
    const products: ProductDetails[] = Array.from(importProducts('Idle Flicker').values());
    expect(products.length).toBe(20);
  });

  test('Space Craft', () => {
    const products: ProductDetails[] = Array.from(importProducts('Space Craft').values());
    expect(products.length).toBe(25);
  });

  test('Vital Science', () => {
    const products: ProductDetails[] = Array.from(importProducts('Vital Science').values());
    expect(products.length).toBe(22);
  });

  test('A Car is Born', () => {
    const products: ProductDetails[] = Array.from(importProducts('A Car is Born').values());
    expect(products.length).toBe(22);
  });

  test('Craft For Freedom', () => {
    const products: ProductDetails[] = Array.from(importProducts('Craft For Freedom').values());
    expect(products.length).toBe(25);
  });

  test('Hammer Time', () => {
    const products: ProductDetails[] = Array.from(importProducts('Hammer Time').values());
    expect(products.length).toBe(23);
  });

  test('The New World', () => {
    const products: ProductDetails[] = Array.from(importProducts('The New World').values());
    expect(products.length).toBe(25);
  });

  test('Product Cycle', () => {
    const products: ProductDetails[] = Array.from(importProducts('Product Cycle').values());
    expect(products.length).toBe(24);
  });
});
