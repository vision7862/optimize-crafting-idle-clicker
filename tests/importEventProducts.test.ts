import { importProducts } from '../src/importEventProducts';

describe('importProducts', () => {
  test('should import costs and relationship correctly', () => {
    const products: Map<string, ProductDetails> = importProducts('FromDustTillLawn');
    expect(products.size).toBe(18);
  });

  test('Wind it up', () => {
    expect(() => importProducts('Wind it up')).not.toThrowError();
  });

  test('Idle Flicker', () => {
    expect(() => importProducts('Idle Flicker')).not.toThrowError();
  });
});
