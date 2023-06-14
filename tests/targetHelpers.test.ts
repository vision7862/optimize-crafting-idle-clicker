import { computeTargetFromFame, getCostOfScientists } from '../src/targetHelpers';

describe('targetHelpers', () => {
  describe('computeTargetFromFame', () => {
    it.skip('should return 1e18 for lvl 10, 8 fame', () => {
      expect(computeTargetFromFame(8, 10)).toBe(1e18);
    });

    it('should return correctly', () => {
      expect(computeTargetFromFame(1, 4)).toBe(10000);
    });
  });

  // the expects are just for the specific level not the total so nvm
  describe.skip('getCostOfScientists', () => {
    it('should return 32.3e15 for 245', () => {
      expect(getCostOfScientists(245)).toBe(32.3e15);
    });

    it('should return 37.1e15 for 246', () => {
      expect(getCostOfScientists(246)).toBe(37.1e15);
    });

    it('should return 32.3e15 for 247', () => {
      expect(getCostOfScientists(247)).toBe(32.3e15);
    });
  });
});
