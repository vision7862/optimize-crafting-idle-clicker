import { computeTargetFromFame, getCostOfScientists, getLevelAchievementMultiplier, getResearchPerSecond } from '../src/targetHelpers';
import { type WorkshopStatus } from '../src/types/Workshop';

describe('targetHelpers', () => {
  describe('computeTargetFromFame', () => {
    it.skip('should return 1e18 for lvl 10, 8 fame', () => {
      expect(computeTargetFromFame(8, 10)).toBe(1e18);
    });

    it('should return correctly', () => {
      expect(computeTargetFromFame(1, 4)).toBe(10000);
    });
  });

  describe('getCostOfScientists', () => {
    it('should return x for y', () => {
      expect(getCostOfScientists(1)).toBe(0);
    });

    it('should return x for y', () => {
      expect(getCostOfScientists(2)).toBe(50);
    });

    it('should return x for y', () => {
      expect(getCostOfScientists(3)).toBe(107);
    });

    it('should return x for y', () => {
      expect(getCostOfScientists(4)).toBe(173);
    });
  });

  describe('getLevelAchievementMultiplier', () => {
    test('should return correctly', () => {
      expect(getLevelAchievementMultiplier(14)).toBe(16000);
    });

    test('should return correctly', () => {
      expect(getLevelAchievementMultiplier(7)).toBe(64);
    });

    test('should return correctly', () => {
      expect(getLevelAchievementMultiplier(10)).toBe(512);
    });

    test('should return correctly', () => {
      expect(getLevelAchievementMultiplier(11)).toBe(2000);
    });

    test('should return correctly', () => {
      expect(getLevelAchievementMultiplier(20)).toBe(1e6);
    });

    test('should return correctly', () => {
      expect(getLevelAchievementMultiplier(55)).toBe(640.0e15);
    });
  });

  describe('getResearchPerSecond', () => {
    it('should account for no boost running', () => {
      const workshopStatus: WorkshopStatus = {
        event: false,
        level: 17,
        scientists: 422,
      };
      expect(getResearchPerSecond(workshopStatus, false)).toBe(1418);
    });

    it('should account for boost running', () => {
      const workshopStatus: WorkshopStatus = {
        event: false,
        level: 17,
        scientists: 422,
      };
      expect(getResearchPerSecond(workshopStatus, true)).toBe(14179);
    });
  });
});
