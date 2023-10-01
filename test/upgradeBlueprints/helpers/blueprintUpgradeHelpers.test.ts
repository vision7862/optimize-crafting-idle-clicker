import { BLUEPRINT_LIBRARY } from '../../../EDIT_ME/BlueprintLibrary';
import { ImportedProduct } from '../../../src/buildWorkshop/types/ImportedProduct';
import {
  BLUEPRINT_SETS,
  BlueprintSet,
  SetMultiplierType,
} from '../../../src/upgradeBlueprints/constants/BlueprintSets';
import {
  BASE_BP,
  BOTTOM_STAGE_2,
  TOP_STAGE_1,
  TOP_STAGE_2,
} from '../../../src/upgradeBlueprints/helpers/blueprintObjectHelpers';
import {
  getBpStrategy,
  getCostToUpgradeBlueprint,
  mergeBlueprint,
  upgradeBlueprint,
  upgradeSetToNextRank,
} from '../../../src/upgradeBlueprints/helpers/blueprintUpgradeHelpers';
import { BlueprintUpgradeInfo } from '../../../src/upgradeBlueprints/optimizeUpgradingBlueprints';
import { Blueprint } from '../../../src/upgradeBlueprints/types/Blueprint';
import { MergingStrategy, SetMergingStrategy } from '../../../src/upgradeBlueprints/types/MergingStrategy';

describe('blueprintUpgradeHelpers', () => {
  describe('getCostToUpgradeBlueprint', () => {
    it('should add up from the base correctly', () => {
      const blueprint: Blueprint = {
        ...BASE_BP,
        productName: 'Wood',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(159);
    });

    it('should add up from not the base correctly', () => {
      const blueprint: Blueprint = {
        ...BASE_BP,
        productName: 'Wood',
        upgradeLevel: 11,
        score: 20,
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(337);
    });

    it('should still work with later blueprints', () => {
      const blueprint: Blueprint = {
        ...BASE_BP,
        productName: 'Cut Sapphire',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 10)).toBe(1267);
    });

    it('should work for any number of levels', () => {
      const blueprint: Blueprint = {
        ...BASE_BP,
        productName: 'Cut Sapphire',
      };

      expect(getCostToUpgradeBlueprint(blueprint, 50)).toBe(50197);
    });

    it('should still work with non-resource products', () => {
      const blueprint: Blueprint = {
        ...BASE_BP,
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
        ...BASE_BP,
        productName: 'Wood',
      };
      const upgradeInfo = upgradeBlueprint(blueprint, 10);
      expect(upgradeInfo?.blueprint.upgradeLevel).toBe(11);
      expect(upgradeInfo?.blueprint.score).toBe(20);
    });

    it('should get the cost and score correctly for a stage 2 bp', () => {
      const blueprint: Blueprint = {
        ...BOTTOM_STAGE_2,
        productName: 'Copper Ingots',
        upgradeLevel: 1,
        score: 120,
      };
      const upgradeInfo = upgradeBlueprint(blueprint, 10);
      expect(upgradeInfo?.blueprint.upgradeLevel).toBe(11);
      expect(upgradeInfo?.blueprint.score).toBe(240);
    });

    it('should merge instead of normal upgrading if a bp is at the top of its stage', () => {
      const blueprint: Blueprint = {
        ...TOP_STAGE_1,
        productName: 'Copper Ingots',
      };
      const upgradeInfo = upgradeBlueprint(blueprint, 10);
      expect(upgradeInfo?.blueprint.upgradeLevel).toBe(1);
      expect(upgradeInfo?.blueprint.score).toBe(120);
      expect(upgradeInfo?.costOfUpgrade).toBe(10834); // cost of upgrading base copper ingot 50 times
      expect(upgradeInfo?.scoreChange).toBe(60);
    });

    it('should get the cost and score correctly for a bp not using the 51+10 strategy', () => {
      const blueprint: Blueprint = {
        productName: 'Compass',
        evolutionStage: 1,
        upgradeLevel: 51,
        score: 60,
        scoreChangePerLevel: 1,
      };
      const upgradeInfo = upgradeBlueprint(blueprint, 10);
      expect(upgradeInfo?.blueprint.evolutionStage).toBe(1);
      expect(upgradeInfo?.blueprint.upgradeLevel).toBe(61);
      expect(upgradeInfo?.blueprint.score).toBe(70);
      expect(upgradeInfo?.costOfUpgrade).toBe(61476);
    });

    it('should get the cost and score correctly for merging a bp not using the 51+10 strategy', () => {
      const blueprint: Blueprint = {
        productName: 'Compass',
        evolutionStage: 1,
        upgradeLevel: 71,
        score: 80,
        scoreChangePerLevel: 1,
      };
      const upgradeInfo = upgradeBlueprint(blueprint, 10);
      expect(upgradeInfo?.blueprint.evolutionStage).toBe(2);
      expect(upgradeInfo?.blueprint.upgradeLevel).toBe(1);
      expect(upgradeInfo?.blueprint.score).toBe(160);
      expect(upgradeInfo?.blueprint.scoreChangePerLevel).toBe(16);
      expect(upgradeInfo?.costOfUpgrade).toBe(246115);
      expect(upgradeInfo?.scoreChange).toBe(80);
    });

    it('temp', () => {
      const bp: Blueprint = {
        ...BASE_BP,
        productName: 'Compass',
      };
      console.log(upgradeBlueprint(bp, 60));
    });
  });

  describe('mergeBlueprint', () => {
    it('should combine the same blueprint twice correctly', () => {
      const blueprintToUpgrade: Blueprint = {
        ...TOP_STAGE_1,
        productName: 'Wood',
      };
      const upgradedBlueprint: BlueprintUpgradeInfo | null = mergeBlueprint(blueprintToUpgrade);
      expect(upgradedBlueprint?.blueprint.score).toBe(120);
      expect(upgradedBlueprint?.blueprint.evolutionStage).toBe(2);
      expect(upgradedBlueprint?.blueprint.upgradeLevel).toBe(1);
      expect(upgradedBlueprint?.scoreChange).toBe(60);
    });

    it('should combine two stage II blueprints', () => {
      const blueprintToUpgrade: Blueprint = {
        ...TOP_STAGE_2,
        productName: 'Wood',
      };
      const upgradedBlueprint: BlueprintUpgradeInfo | null = mergeBlueprint(blueprintToUpgrade);
      expect(upgradedBlueprint?.blueprint.score).toBe(1680);
      expect(upgradedBlueprint?.blueprint.evolutionStage).toBe(3);
      expect(upgradedBlueprint?.blueprint.upgradeLevel).toBe(1);
      expect(upgradedBlueprint?.scoreChange).toBe(840);
    });

    it('should merge the given blueprint with a fresh one of its stage if it is at max level already', () => {
      const blueprintToUpgrade: Blueprint = {
        ...TOP_STAGE_2,
        productName: 'Wood',
      };
      const upgradedBlueprint: BlueprintUpgradeInfo | null = mergeBlueprint(blueprintToUpgrade);
      expect(upgradedBlueprint?.blueprint.score).toBe(1680);
      expect(upgradedBlueprint?.blueprint.evolutionStage).toBe(3);
      expect(upgradedBlueprint?.blueprint.upgradeLevel).toBe(1);
      expect(upgradedBlueprint?.scoreChange).toBe(840);
    });

    it('should merge the given blueprint not test', () => {
      const blueprintToUpgrade: Blueprint = {
        ...BASE_BP,
        evolutionStage: 2,
        scoreChangePerLevel: 12,
        productName: 'Saltpeter',
        upgradeLevel: 61,
        score: 840,
      };
      const upgradedBlueprint: BlueprintUpgradeInfo | null = mergeBlueprint(blueprintToUpgrade);
      console.log(upgradedBlueprint);
      // expect(upgradedBlueprint?.blueprint.score).toBe(1680);
      expect(upgradedBlueprint?.blueprint.evolutionStage).toBe(blueprintToUpgrade.evolutionStage + 1);
      expect(upgradedBlueprint?.blueprint.upgradeLevel).toBe(1);
      // expect(upgradedBlueprint?.scoreChange).toBe(840);
    });
  });

  describe('getBpStrategy', () => {
    it('should return the higher strategy if the bp is in more than one set', () => {
      const blueprintSets: BlueprintSet[] = [
        {
          setName: 'set1',
          multiplierType: SetMultiplierType.ClickOutput,
          achievementRanks: [],
        },
        {
          setName: 'set2',
          multiplierType: SetMultiplierType.ClickOutput,
          achievementRanks: [],
        },
      ];

      const products: ImportedProduct[] = [
        { ProductType: 'Copper Axe', Tags: ['set1', 'set2'] } as unknown as ImportedProduct,
        { ProductType: 'Copper Ore', Tags: ['set1'] } as unknown as ImportedProduct,
        { ProductType: 'Wood', Tags: ['set2'] } as unknown as ImportedProduct,
      ];

      const strategies: SetMergingStrategy[] = [
        {
          setName: 'set1',
          mainBps: ['Copper Axe'],
          mainStrategy: { topStage: 4, baseLevel: 21, plusLevelsPerStage: 10 },
          otherBpsStrategy: { topStage: 1, baseLevel: 1, plusLevelsPerStage: 0 },
        },
        {
          setName: 'set2',
          mainBps: ['Wood'],
          mainStrategy: { topStage: 6, baseLevel: 51, plusLevelsPerStage: 10 },
          otherBpsStrategy: { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 },
        },
      ];

      const strategy: MergingStrategy = getBpStrategy('Copper Axe', blueprintSets, strategies, products);
      expect(strategy.topStage).toBe(5);
      expect(strategy.baseLevel).toBe(51);
    });

    test('specific bp', () => {
      console.log(getBpStrategy('Ruby Ring'));
    });
  });

  describe('upgradeSetToNextRank', () => {
    it('should do things', () => {
      const upgradeSetInfo = upgradeSetToNextRank(BLUEPRINT_SETS[0], BLUEPRINT_LIBRARY);
      console.log(`cost is ${upgradeSetInfo?.cost ?? 0}`);
      console.log(upgradeSetInfo?.upgradedBlueprints);
    });

    it('should upgrade the specified set', () => {
      const upgradeSetInfo = upgradeSetToNextRank(
        BLUEPRINT_SETS.filter((set) => set.setName === 'Vehicles')[0],
        BLUEPRINT_LIBRARY,
      );
      console.log(`cost is ${upgradeSetInfo?.cost ?? 0}`);
      upgradeSetInfo?.upgradedBlueprints.forEach((bp) => {
        console.log(bp);
        console.log(getBpStrategy(bp.productName));
      });
    });
  });
});
