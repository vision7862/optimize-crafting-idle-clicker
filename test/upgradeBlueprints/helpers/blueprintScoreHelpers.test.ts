import { BLUEPRINT_LIBRARY } from '../../../EDIT_ME/BlueprintLibrary';
import {
  BLUEPRINT_SETS,
  BlueprintSet,
  SetMultiplierType,
} from '../../../src/upgradeBlueprints/constants/BlueprintSets';
import { BASE_BP, BOTTOM_STAGE_2 } from '../../../src/upgradeBlueprints/helpers/blueprintObjectHelpers';
import {
  convertBlueprintLibraryToScores,
  getAchievementMultiplier,
  getBlueprintsInSet,
  getOnlyTopBlueprints,
  getSetBlueprintScore,
  getSpecifiedMultiplierFromSets,
} from '../../../src/upgradeBlueprints/helpers/blueprintScoreHelpers';
import { Blueprint } from '../../../src/upgradeBlueprints/types/Blueprint';

describe('blueprintScoreHelpers', () => {
  describe('convertBlueprintLibraryToScores', () => {
    it('should use the score of the top scoring blueprint', () => {
      const blueprints: Blueprint[] = [
        {
          productName: 'Wood',
          evolutionStage: 2,
          upgradeLevel: 1,
          score: 120,
          scoreChangePerLevel: 12,
        },
        { ...BASE_BP, productName: 'Wood' },
        { ...BASE_BP, productName: 'Wood' },
      ];
      const scores = convertBlueprintLibraryToScores(blueprints);
      expect(scores.get('Wood')).toBe(120);
    });

    it('should use the score of the top scoring blueprint alone, even if other non-default blueprints exist', () => {
      const blueprints: Blueprint[] = [
        {
          productName: 'Wood',
          evolutionStage: 2,
          upgradeLevel: 1,
          score: 120,
          scoreChangePerLevel: 12,
        },
        { ...BASE_BP, productName: 'Wood', score: 60 },
        { ...BASE_BP, productName: 'Wood', evolutionStage: 2 },
      ];
      const scores = convertBlueprintLibraryToScores(blueprints);
      expect(scores.get('Wood')).toBe(120);
    });

    it('temp test', () => {
      console.log(
        getSpecifiedMultiplierFromSets(
          SetMultiplierType.MerchantRevenue,
          convertBlueprintLibraryToScores(BLUEPRINT_LIBRARY),
        ),
      );
    });
  });

  describe('getOnlyTopBlueprints', () => {
    it('should filter to only one blueprint per product', () => {
      const blueprints: Blueprint[] = [
        { ...BASE_BP, productName: 'Wood' },
        { ...BASE_BP, productName: 'Wood' },
        { ...BASE_BP, productName: 'Club' },
        { ...BASE_BP, productName: 'Club' },
        { ...BASE_BP, productName: 'Club' },
        { ...BASE_BP, productName: 'Club' },
        { ...BASE_BP, productName: 'Arrows' },
        { ...BASE_BP, productName: 'Arrows' },
      ];
      expect(getOnlyTopBlueprints(blueprints).length).toBe(3);
    });

    it('should filter to only the top scoring blueprint even if it is later in the list', () => {
      const blueprints: Blueprint[] = [
        { ...BASE_BP, productName: 'Wood' },
        { ...BASE_BP, productName: 'Wood' },
        { ...BASE_BP, productName: 'Club' },
        { ...BASE_BP, productName: 'Club' },
        { ...BASE_BP, productName: 'Club' },
        { ...BOTTOM_STAGE_2, productName: 'Wood' },
        { ...BASE_BP, productName: 'Club' },
        { ...BASE_BP, productName: 'Arrows' },
        { ...BASE_BP, productName: 'Arrows' },
      ];
      const topBlueprints = getOnlyTopBlueprints(blueprints);
      expect(topBlueprints.length).toBe(3);
      expect(topBlueprints.filter((blueprint: Blueprint) => blueprint.productName === 'Wood')[0].score).toBe(120);
    });
  });

  function getBlueprintSet(setName: string): BlueprintSet {
    const setsMatchingName = BLUEPRINT_SETS.filter((set: BlueprintSet) => {
      return set.setName === setName;
    });
    if (setsMatchingName.length !== 1) {
      throw new Error(`Set ${setName} does not have exactly 1 match. It has ${setsMatchingName.length}.`);
    }
    return setsMatchingName[0];
  }

  describe('getIncomeMultiplierFromSets', () => {
    it('should calculate the overall income multiplier correctly', () => {
      const blueprintScores = new Map<string, number>([
        ['Wood', 120],
        ['Rawhide', 120],
      ]);
      expect(getSpecifiedMultiplierFromSets(SetMultiplierType.Income, blueprintScores)).toBe(1.2 * 1.2);
    });
  });

  describe('getSetBlueprintScore', () => {
    it('should calculate a blueprint set score correctly', () => {
      const blueprintScores = new Map<string, number>([
        ['Sickle', 64],
        ['Magnificent Dagger', 50],
      ]);

      const blueprints = getBlueprintsInSet('Knife');
      expect(getSetBlueprintScore(blueprints, blueprintScores)).toBe(194);
    });

    it('should count missing blueprints as 10 for the log part and 0 for the summing part', () => {
      const blueprintScores = new Map<string, number>([['Sickle', 64]]);
      const blueprints = getBlueprintsInSet('Knife');
      expect(getSetBlueprintScore(blueprints, blueprintScores)).toBe(64);
    });
  });

  describe('getSetAchievementMultiplier', () => {
    it('should return 2.4 if the score is between 4350 and 7500', () => {
      expect(getAchievementMultiplier(getBlueprintSet('Wood').achievementRanks, 5000)).toBe(2.4);
    });

    it('should return 1.4 if the score is 270', () => {
      expect(getAchievementMultiplier(getBlueprintSet('Wood').achievementRanks, 270)).toBe(1.4);
    });

    it('should return 6 if the score is very high', () => {
      expect(getAchievementMultiplier(getBlueprintSet('Wood').achievementRanks, 50e6)).toBe(6);
    });
  });
});
