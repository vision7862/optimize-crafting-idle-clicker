import { DEFAULT_BLUEPRINT, DEFAULT_STAGE_2 } from '../../src/config/BlueprintLibrary';
import { getCostToUpgradeBlueprint, upgradeBlueprint } from '../../src/helpers/blueprintUpgradeHelpers';
import { Blueprint } from '../../src/types/Blueprint';

describe('blueprintUpgradeHelpers', () => {
  describe('getCostToUpgradeBlueprint', () => {
    it('should add up from the base correctly', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_BLUEPRINT,
        productName: 'Wood',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(159);
    });

    it('should add up from not the base correctly', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_BLUEPRINT,
        productName: 'Wood',
        upgradeLevel: 11,
        score: 20,
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(337);
    });

    it('should still work with later blueprints', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_BLUEPRINT,
        productName: 'Cut Sapphire',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(1267);
    });

    it('should work for any number of levels', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_BLUEPRINT,
        productName: 'Cut Sapphire',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 50)).toBe(50197);
    });

    it('should still work with non-resource products', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_BLUEPRINT,
        productName: 'Iron Armor',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(564);
    });

    it('should use level with no regard to evolution stage or score', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_STAGE_2,
        productName: 'Copper Ingots',
        upgradeLevel: 1,
        score: 120,
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(274);
    });
  });

  describe('upgradeBlueprint', () => {
    it('should get the cost and score correctly for a stage 1 bp', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_BLUEPRINT,
        productName: 'Wood',
      };
      expect(upgradeBlueprint(blueprint, 10).blueprint.upgradeLevel).toBe(11);
      expect(upgradeBlueprint(blueprint, 10).blueprint.score).toBe(20);
    });

    it('should get the cost and score correctly for a stage 2 bp', () => {
      const blueprint: Blueprint = {
        ...DEFAULT_STAGE_2,
        productName: 'Copper Ingots',
        upgradeLevel: 1,
        score: 120,
      };
      expect(upgradeBlueprint(blueprint, 10).blueprint.upgradeLevel).toBe(11);
      expect(upgradeBlueprint(blueprint, 10).blueprint.score).toBe(240);
    });
  });
});
