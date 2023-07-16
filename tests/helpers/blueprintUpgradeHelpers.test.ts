import {
  BLUEPRINT_LIBRARY,
  BOTTOM_STAGE_1,
  BOTTOM_STAGE_2,
  TOP_STAGE_1,
  TOP_STAGE_2,
} from '../../src/config/BlueprintLibrary';
import { BLUEPRINT_SETS } from '../../src/constants/BlueprintSets';
import {
  getCostToUpgradeBlueprint,
  mergeBlueprint,
  upgradeBlueprint,
  upgradeSetToNextRank,
} from '../../src/helpers/blueprintUpgradeHelpers';
import { BlueprintUpgradeInfo } from '../../src/optimizeUpgradingBlueprints';
import { Blueprint } from '../../src/types/Blueprint';

describe('blueprintUpgradeHelpers', () => {
  describe('getCostToUpgradeBlueprint', () => {
    it('should add up from the base correctly', () => {
      const blueprint: Blueprint = {
        ...BOTTOM_STAGE_1,
        productName: 'Wood',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(159);
    });

    it('should add up from not the base correctly', () => {
      const blueprint: Blueprint = {
        ...BOTTOM_STAGE_1,
        productName: 'Wood',
        upgradeLevel: 11,
        score: 20,
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(337);
    });

    it('should still work with later blueprints', () => {
      const blueprint: Blueprint = {
        ...BOTTOM_STAGE_1,
        productName: 'Cut Sapphire',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(1267);
    });

    it('should work for any number of levels', () => {
      const blueprint: Blueprint = {
        ...BOTTOM_STAGE_1,
        productName: 'Cut Sapphire',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 50)).toBe(50197);
    });

    it('should still work with non-resource products', () => {
      const blueprint: Blueprint = {
        ...BOTTOM_STAGE_1,
        productName: 'Iron Armor',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(564);
    });

    it('should use level with no regard to evolution stage or score', () => {
      const blueprint: Blueprint = {
        ...BOTTOM_STAGE_2,
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
        ...BOTTOM_STAGE_1,
        productName: 'Wood',
      };
      const upgradeInfo = upgradeBlueprint(blueprint, 10);
      expect(upgradeInfo.blueprint.upgradeLevel).toBe(11);
      expect(upgradeInfo.blueprint.score).toBe(20);
    });

    it('should get the cost and score correctly for a stage 2 bp', () => {
      const blueprint: Blueprint = {
        ...BOTTOM_STAGE_2,
        productName: 'Copper Ingots',
        upgradeLevel: 1,
        score: 120,
      };
      const upgradeInfo = upgradeBlueprint(blueprint, 10);
      expect(upgradeInfo.blueprint.upgradeLevel).toBe(11);
      expect(upgradeInfo.blueprint.score).toBe(240);
    });

    it('should merge instead of normal upgrading if a bp is at the top of its stage', () => {
      const blueprint: Blueprint = {
        ...TOP_STAGE_1,
        productName: 'Copper Ingots',
      };
      const upgradeInfo = upgradeBlueprint(blueprint, 10);
      expect(upgradeInfo.blueprint.upgradeLevel).toBe(1);
      expect(upgradeInfo.blueprint.score).toBe(120);
      expect(upgradeInfo.costOfUpgrade).toBe(10834); // cost of upgrading base copper ingot 50 times
      expect(upgradeInfo.scoreChange).toBe(60);
    });
  });

  describe('mergeBlueprint', () => {
    it('should combine the same blueprint twice correctly', () => {
      const blueprintToUpgrade: Blueprint = {
        ...TOP_STAGE_1,
        productName: 'mergingBP',
      };
      const upgradedBlueprint: BlueprintUpgradeInfo = mergeBlueprint(blueprintToUpgrade);
      expect(upgradedBlueprint.blueprint.score).toBe(120);
      expect(upgradedBlueprint.blueprint.evolutionStage).toBe(2);
      expect(upgradedBlueprint.blueprint.upgradeLevel).toBe(1);
      expect(upgradedBlueprint.scoreChange).toBe(60);
    });

    it('should combine two stage II blueprints', () => {
      const blueprintToUpgrade: Blueprint = {
        ...TOP_STAGE_2,
        productName: 'mergingBP',
      };
      const upgradedBlueprint: BlueprintUpgradeInfo = mergeBlueprint(blueprintToUpgrade);
      expect(upgradedBlueprint.blueprint.score).toBe(1680);
      expect(upgradedBlueprint.blueprint.evolutionStage).toBe(3);
      expect(upgradedBlueprint.blueprint.upgradeLevel).toBe(1);
      expect(upgradedBlueprint.scoreChange).toBe(840);
    });

    it('should merge the given blueprint with a fresh one of its stage if it is at max level already', () => {
      const blueprintToUpgrade: Blueprint = {
        ...TOP_STAGE_2,
        productName: 'mergingBP',
      };
      const upgradedBlueprint: BlueprintUpgradeInfo = mergeBlueprint(blueprintToUpgrade);
      expect(upgradedBlueprint.blueprint.score).toBe(1680);
      expect(upgradedBlueprint.blueprint.evolutionStage).toBe(3);
      expect(upgradedBlueprint.blueprint.upgradeLevel).toBe(1);
      expect(upgradedBlueprint.scoreChange).toBe(840);
    });
  });

  describe('upgradeSetToNextRank', () => {
    it('should do things', () => {
      const upgradeSetInfo = upgradeSetToNextRank(BLUEPRINT_SETS[0], BLUEPRINT_LIBRARY);
      console.log(`cost is ${upgradeSetInfo?.cost}`);
      console.log(upgradeSetInfo?.upgradedBlueprints);
    });
  });
});
