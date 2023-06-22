import { computeTargetFromFame, getCostOfScientists, getResearchPerSecond } from '../../src/helpers/targetHelpers';
import { DEFAULT_WORKSHOP_STATUS_MAIN, WorkshopStatus } from '../../src/types/Workshop';

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

  describe('getResearchPerSecond', () => {
    it('should account for no boost running', () => {
      const workshopStatus: WorkshopStatus = {
        ...DEFAULT_WORKSHOP_STATUS_MAIN,
        level: 17,
        scientists: 422,
        researchBoostActive: false,
      };
      expect(getResearchPerSecond(workshopStatus)).toBe(1418);
    });

    it('should account for boost running', () => {
      const workshopStatus: WorkshopStatus = {
        ...DEFAULT_WORKSHOP_STATUS_MAIN,
        level: 17,
        scientists: 422,
        researchBoostActive: true,
      };
      expect(getResearchPerSecond(workshopStatus)).toBe(14179);
    });
  });
});
