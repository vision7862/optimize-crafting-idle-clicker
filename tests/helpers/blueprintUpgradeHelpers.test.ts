import { DEFAULT_BLUEPRINT, DEFAULT_STAGE_2 } from '../../src/config/BlueprintLibrary';
import { getCostToUpgradeBlueprint } from '../../src/helpers/blueprintUpgradeHelpers';
import { Blueprint } from '../../src/types/Blueprint';

describe('blueprintUpgradeHelpers', () => {
  describe('getCostToUpgradeBlueprint', () => {
    it('should add up from the base correctly', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_BLUEPRINT,
        productName: 'Wood',
      };

      expect(getCostToUpgradeBlueprint(blueprint)).toBe(159);
    });

    it('should add up from not the base correctly', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_BLUEPRINT,
        productName: 'Wood',
        upgradeLevel: 11,
        score: 20,
      };

      expect(getCostToUpgradeBlueprint(blueprint)).toBe(337);
    });

    it('should still work with later blueprints', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_BLUEPRINT,
        productName: 'Cut Sapphire',
      };

      expect(getCostToUpgradeBlueprint(blueprint)).toBe(1267);
    });

    it('should still work with non-resource products', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_BLUEPRINT,
        productName: 'Iron Armor',
      };

      expect(getCostToUpgradeBlueprint(blueprint)).toBe(564);
    });

    it('should use level with no regard to evolution stage or score', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_STAGE_2,
        productName: 'Copper Ingots',
        upgradeLevel: 1,
        score: 120,
      };

      expect(getCostToUpgradeBlueprint(blueprint)).toBe(274);
    });
  });
});
