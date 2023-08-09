import { importWorkshop } from '../../src/buildWorkshop/importWorkshop';
import { ProductDetails } from '../../src/buildWorkshop/types/Product';

describe('importWorkshop', () => {
  test('Main Workshop Wiki Vers', () => {
    expect(() => importWorkshop(true)).not.toThrowError();
  });

  test('From Dust Till Lawn', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'FromDustTillLawn').values());
    expect(products.length).toBe(18);
  });

  test('Wind it up', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'Wind it up').values());
    expect(products.length).toBe(20);
  });

  test('Idle Flicker', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'Idle Flicker').values());
    expect(products.length).toBe(20);
  });

  test('Space Craft', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'Space Craft').values());
    expect(products.length).toBe(25);
  });

  test('Vital Science', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'Vital Science').values());
    expect(products.length).toBe(22);
  });

  test('A Car is Born', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'A Car is Born').values());
    expect(products.length).toBe(22);
  });

  test('Craft For Freedom', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'Craft For Freedom').values());
    expect(products.length).toBe(25);
  });

  test('Hammer Time', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'Hammer Time').values());
    expect(products.length).toBe(23);
  });

  test('The New World', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'The New World').values());
    expect(products.length).toBe(25);
  });

  test('Product Cycle', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'Product Cycle').values());
    expect(products.length).toBe(24);
  });

  test('Lock N Load', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'Lock N Load').values());
    expect(products.length).toBe(20);
  });

  test('Radio Activity', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'Radio Activity').values());
    expect(products.length).toBe(20);
  });

  test('Trained to Ship', () => {
    const products: ProductDetails[] = Array.from(importWorkshop(true, 'Trained to Ship').values());
    expect(products.length).toBe(22);
  });
});
