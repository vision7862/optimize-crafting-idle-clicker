import { toTime } from '../../../src/buildWorkshop/helpers/printResults';
import { computeBuildTimeForWorkshop, computeTargetFromFame } from '../../../src/buildWorkshop/helpers/targetHelpers';
import { importWorkshop } from '../../../src/buildWorkshop/importWorkshop';
import { Product, ProductDetails, ProductStatus } from '../../../src/buildWorkshop/types/Product';
import {
  DEFAULT_WORKSHOP_STATUS_EVENT,
  DEFAULT_WORKSHOP_STATUS_MAIN,
  Workshop,
} from '../../../src/buildWorkshop/types/Workshop';

describe('targetHelpers', () => {
  describe('computeTargetFromFame', () => {
    it.skip('should return 1e18 for lvl 10, 8 fame', () => {
      expect(computeTargetFromFame(8, 10, false)).toBe(1e18);
    });

    it('should return correctly', () => {
      expect(computeTargetFromFame(1, 4, false)).toBe(10000);
    });
  });

  describe('computeBuildTimeForWorkshop', () => {
    it('building multiple products with plenty of money should be numProducts + 1', () => {
      const workshop: Workshop = {
        productsInfo: getProductsInfoFromProductAndLevel([
          { level: 3, name: 'Wood' },
          { level: 2, name: 'Rawhide' },
          { level: 2, name: 'Leather' },
        ]),
        workshopStatus: DEFAULT_WORKSHOP_STATUS_MAIN,
      };
      expect(computeBuildTimeForWorkshop(workshop, 0)).toBe(40);

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
        productsInfo: getProductsInfoFromProductAndLevel([{ level: 1, name: 'Wood' }]),
        workshopStatus: DEFAULT_WORKSHOP_STATUS_MAIN,
      };
      expect(computeBuildTimeForWorkshop(workshop, 0)).toBe(10);
    });

    it('should build just wood with some additional levels in two cycles', () => {
      const workshop: Workshop = {
        productsInfo: getProductsInfoFromProductAndLevel([{ level: 3, name: 'Wood' }]),
        workshopStatus: DEFAULT_WORKSHOP_STATUS_MAIN,
      };
      expect(computeBuildTimeForWorkshop(workshop, 0)).toBe(20);
    });

    it('should build a complicated thing in a lot of cycles', () => {
      const workshop: Workshop = {
        productsInfo: getProductsInfoFromProductAndLevel(
          [
            { level: 12, name: 'Cotton' },
            { level: 19, name: 'White Fabric' },
            { level: 9, name: 'White Stripes' },
            { level: 8, name: 'Stars' },
            { level: 6, name: 'Red Plant' },
            { level: 3, name: 'Red Dye' },
            { level: 3, name: 'Red Stripes' },
            { level: 2, name: 'Flag Background' },
            { level: 5, name: 'Blue Plant' },
            { level: 5, name: 'Blue Dye' },
            { level: 1, name: 'Blue Fabric' },
            { level: 2, name: 'Canton' },
            { level: 2, name: 'Stars & Stripes' },
            { level: 20, name: 'Gold Ore' },
            { level: 20, name: 'Uncut Sapphire' },
          ],
          'Craft for Freedom',
        ),
        workshopStatus: { ...DEFAULT_WORKSHOP_STATUS_EVENT, eventName: 'Craft for Freedom' },
      };
      expect(computeBuildTimeForWorkshop(workshop, 0)).toBeGreaterThan(200);
    });

    describe('test community builds', () => {
      it('game changer idle 6 fame', () => {
        const workshop: Workshop = {
          productsInfo: getProductsInfoFromProductAndLevel(
            [
              { name: 'Wood', level: 1 },
              { name: 'Copper Ore', level: 11 },
              { name: 'Copper Ingots', level: 11 },
              { name: 'Coal', level: 18 },
              { name: 'Iron Ore', level: 12 },
              { name: 'Iron Ingots', level: 6 },
              { name: 'Iron Rivets', level: 26 },
              { name: 'Quartz', level: 10 },
              { name: 'Glass', level: 10 },
              { name: 'Electrical Parts', level: 16 },
              { name: 'Monitor', level: 8 },
              { name: 'Carbon', level: 12 },
              { name: 'Keyboard', level: 6 },
              { name: 'Silicon', level: 3 },
            ],
            'Game Changer',
          ),
          workshopStatus: { ...DEFAULT_WORKSHOP_STATUS_EVENT, eventName: 'Game Changer' },
        };
        const seconds = computeBuildTimeForWorkshop(workshop, 1e15);
        console.log(`building whatsit in ${toTime(seconds)}`);
        expect(seconds).toBeGreaterThan(200);
      });

      it('air craft idle 6 fame - community', () => {
        const workshop: Workshop = {
          productsInfo: getProductsInfoFromProductAndLevel(
            [
              { name: 'Wood', level: 110, merchants: 1 },
              { name: 'Coal', level: 116, merchants: 3 },
              { name: 'Iron Ore', level: 24, merchants: 1 },
              { name: 'Iron Ingots', level: 12, merchants: 2 },
              { name: 'Iron Rivets', level: 20, merchants: 5 },
              { name: 'Mechanical Parts', level: 12, merchants: 3 },
              { name: 'Rubber', level: 20, merchants: 2 },
              { name: 'Tire', level: 20, merchants: 2 },
              { name: 'Airplane Wheel', level: 20, merchants: 2 },
              { name: 'Steel', level: 20, merchants: 2 },
              { name: 'Fuselage', level: 5, merchants: 1 },
              { name: 'Airplane Wing', level: 10, merchants: 1 },
              { name: 'Airplane Parts', level: 5, merchants: 1 },
              { name: 'Airplane Body', level: 5, merchants: 1 },
              { name: 'Propeller', level: 3, merchants: 1 },
            ],
            'Air Craft',
          ),
          workshopStatus: {
            level: 10,
            scientists: 308,
            speedBoostActive: true,
            clickBoostActive: false,
            researchBoostActive: true,
            merchantBoostActive: true,
            eventName: 'Air Craft',
          },
        };
        const seconds = computeBuildTimeForWorkshop(workshop, 1e15);
        console.log(`${expect.getState().currentTestName as string} in ${toTime(seconds)}`);
      });

      it('air craft idle 6 fame - mine', () => {
        const workshop: Workshop = {
          productsInfo: getProductsInfoFromProductAndLevel(
            [
              { name: 'Wood', level: 82, merchants: 9 },
              { name: 'Coal', level: 62, merchants: 7 },
              { name: 'Iron Ore', level: 20, merchants: 2 },
              { name: 'Iron Ingots', level: 10, merchants: 5 },
              { name: 'Iron Rivets', level: 32, merchants: 16 },
              { name: 'Mechanical Parts', level: 20, merchants: 4 },
              { name: 'Rubber', level: 8, merchants: 1 },
              { name: 'Tire', level: 8, merchants: 1 },
              { name: 'Airplane Wheel', level: 8, merchants: 1 },
              { name: 'Steel', level: 8, merchants: 1 },
              { name: 'Fuselage', level: 2, merchants: 1 },
              { name: 'Airplane Wing', level: 4, merchants: 1 },
              { name: 'Airplane Parts', level: 2, merchants: 1 },
              { name: 'Airplane Body', level: 2, merchants: 1 },
              { name: 'Propeller', level: 5, merchants: 1 },
            ],
            'Air Craft',
          ),
          workshopStatus: {
            level: 10,
            scientists: 308,
            speedBoostActive: true,
            clickBoostActive: false,
            researchBoostActive: true,
            merchantBoostActive: true,
            eventName: 'Air Craft',
          },
        };
        const seconds = computeBuildTimeForWorkshop(workshop, 1e15);
        console.log(`${expect.getState().currentTestName as string} in ${toTime(seconds)}`);
      });
    });

    function getProductsInfoFromProductAndLevel(
      products: Array<{ name: string; level: number; merchants?: number }>,
      eventName?: string,
    ): Product[] {
      const productsInfo = new Array<Product>();
      const allWorkshopProducts: Map<string, ProductDetails> = importWorkshop(true, eventName);
      products.forEach((product: { name: string; level: number; merchants?: number }) => {
        const status: ProductStatus = {
          level: product.level,
          merchants: product.merchants ?? 100,
        };
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const details: ProductDetails = allWorkshopProducts.get(product.name)!;
        productsInfo.push({ status, details });
      });
      return productsInfo;
    }
  });
});
