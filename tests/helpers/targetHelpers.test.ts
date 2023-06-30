import { bottomUpToMoney } from '../../src/computeIdealLevelsForEvent';
import {
  computeResearchTimeForWorkshop,
  getCostOfScientists,
  getResearchPerSecond,
} from '../../src/helpers/ResearchHelpers';
import { computeBuildTimeForWorkshop, computeTargetFromFame } from '../../src/helpers/targetHelpers';
import { DEFAULT_WORKSHOP_STATUS_MAIN, Workshop, WorkshopStatus } from '../../src/types/Workshop';

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

  describe('computeBuildTimeForWorkshop', () => {
    it('building multiple products with plenty of money should be numProducts + 1', () => {
      const workshop: Workshop = {
        productsInfo: [
          {
            status: { level: 3, merchants: 1 },
            details: {
              outputCount: 1,
              name: 'Wood',
              researchCost: 1,
              buildCost: 10,
              revenue: 12,
              upgradeCostMultiplier: 1.07,
              input1: null,
              input2: null,
            },
          },
          {
            status: { level: 2, merchants: 1 },
            details: {
              outputCount: 1,
              name: 'Rawhide',
              researchCost: 500,
              buildCost: 10000,
              revenue: 3000,
              upgradeCostMultiplier: 1.07,
              input1: null,
              input2: null,
            },
          },
          {
            status: { level: 2, merchants: 1 },
            details: {
              outputCount: 3,
              name: 'Leather',
              researchCost: 900,
              buildCost: 50000,
              revenue: 900,
              upgradeCostMultiplier: 1.08,
              input1: { name: 'Rawhide', count: 1 },
              input2: null,
            },
          },
        ],
        workshopStatus: {
          level: 1,
          scientists: 1,
          clickBoostActive: false,
          merchantBoostActive: false,
          researchBoostActive: false,
        },
      };
      expect(computeBuildTimeForWorkshop(workshop, 0)).toBe(4);

      /**
       * cycle 0    we have 10 money, no income
       * cycle .5   we build wood (at lvl 1 bc that's all the money we have)
       * cycle 1    we still have no money
       * cycle 1.5  wood's first cycle finishes and we get a bunch of money
       * cycle 1.5  we upgrade wood to (presumably) max level with the money we just got
       * cycle 2    we buy rawhide and all its levels with money leftover from wood's first tick
       * cycle 2.5  wood ticks at max level
       * cycle 2.5  we buy leather and all its levels with money from wood's first tick (at lvl 1) and second tick (at max lvl)
       * cycle 3    rawhide ticks
       * cycle 3    we buy... nothing? thats it actually
       * 3 would be hilt, 3.5 copper
       *
       * so the answer to num cycles to build is 2.5
       *
       *
       *
       * pretending everything takes a full cycle:
       * cycle 0    we have 10 money, no income
       * cycle 1    we build wood at lvl 1
       * cycle 2    wood ticks
       * cycle 2    we upgrade wood
       * cycle 3    wood ticks
       * cycle 3    we buy rawhide at max level
       * cycle 4    wood and rawhide tick
       * cycle 4    we buy leather at max level
       * so the answer here is 4
       */
    });

    it('should build just wood with no additional levels in one cycle', () => {
      const workshop: Workshop = {
        productsInfo: [
          {
            status: { level: 1, merchants: 1 },
            details: {
              outputCount: 1,
              name: 'Wood',
              researchCost: 1,
              buildCost: 10,
              revenue: 12,
              upgradeCostMultiplier: 1.07,
              input1: null,
              input2: null,
            },
          },
        ],
        workshopStatus: {
          level: 1,
          scientists: 1,
          clickBoostActive: false,
          merchantBoostActive: false,
          researchBoostActive: false,
        },
      };
      expect(computeBuildTimeForWorkshop(workshop, 0)).toBe(1);
    });

    it('should build just wood with some additional levels in two cycles', () => {
      const workshop: Workshop = {
        productsInfo: [
          {
            status: { level: 3, merchants: 1 },
            details: {
              outputCount: 1,
              name: 'Wood',
              researchCost: 1,
              buildCost: 10,
              revenue: 12,
              upgradeCostMultiplier: 1.07,
              input1: null,
              input2: null,
            },
          },
        ],
        workshopStatus: {
          level: 1,
          scientists: 1,
          clickBoostActive: false,
          merchantBoostActive: false,
          researchBoostActive: false,
        },
      };
      expect(computeBuildTimeForWorkshop(workshop, 0)).toBe(2);
    });
  });
});
