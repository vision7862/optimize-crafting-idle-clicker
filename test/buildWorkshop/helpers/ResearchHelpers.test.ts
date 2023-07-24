import { bottomUpToMoney } from '../../../src/buildWorkshop/computeIdealLevelsForEvent';
import {
  computeResearchTimeForWorkshop,
  getCostOfScientists,
  getResearchPerSecond,
} from '../../../src/buildWorkshop/helpers/ResearchHelpers';
import { computeTargetFromFame } from '../../../src/buildWorkshop/helpers/targetHelpers';
import { DEFAULT_WORKSHOP_STATUS_MAIN, WorkshopStatus } from '../../../src/buildWorkshop/types/Workshop';

describe('Research Helpers', () => {
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
      // crop main workshop after coal because manually timed about 2.5 minutes
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
        scientists: 422,
        researchBoostActive: false,
      };
      expect(getResearchPerSecond(workshopStatus)).toBe(5143);
    });

    it('should account for boost running', () => {
      const workshopStatus: WorkshopStatus = {
        ...DEFAULT_WORKSHOP_STATUS_MAIN,
        scientists: 422,
        researchBoostActive: true,
      };
      expect(getResearchPerSecond(workshopStatus)).toBe(51431);
    });
  });
});
