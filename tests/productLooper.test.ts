import { optimizeEachProductToTarget } from '../src/productLooper';
import { DEFAULT_WORKSHOP } from './testHelpers';

describe('productLooper', () => {
  test('should do stuff', () => {
    expect(() => optimizeEachProductToTarget(12, DEFAULT_WORKSHOP)).not.toThrowError();
  });
});
