import { bottomUpToMoney } from '../../src/computeIdealLevelsForEvent';
import { computeTargetFromFame } from '../../src/helpers/targetHelpers';
import { DEFAULT_WORKSHOP_STATUS_MAIN, WorkshopStatus } from '../../src/types/Workshop';
import {
  computeResearchTimeForWorkshop,
  getCostOfScientists,
  getResearchPerSecond,
} from '../../src/helpers/ResearchHelpers';

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

  describe('computeResearchTimeForWorkshop', () => {
    it.skip('should calculate research time in seconds', () => {
      // crop main workshop after coal beacuse manually timed about 2.5 minutes
      const workshop = bottomUpToMoney(computeTargetFromFame(12, 21), { scientists: 520, level: 21 }).workshop;
      const researchTime = computeResearchTimeForWorkshop(workshop);
      expect(researchTime).toBeGreaterThan(150);
      expect(researchTime).toBeLessThan(180);
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
      expect(getResearchPerSecond(workshopStatus)).toBe(1519);
    });

    it('should account for boost running', () => {
      const workshopStatus: WorkshopStatus = {
        ...DEFAULT_WORKSHOP_STATUS_MAIN,
        level: 17,
        scientists: 422,
        researchBoostActive: true,
      };
      expect(getResearchPerSecond(workshopStatus)).toBe(15192);
    });
  });
});
