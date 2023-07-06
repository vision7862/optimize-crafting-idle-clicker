import { BLUEPRINT_LIBRARY, DEFAULT_BLUEPRINT } from '../../src/config/BlueprintLibrary';
import { BLUEPRINT_SETS, BlueprintSet, SetMultiplierType } from '../../src/constants/BlueprintSets';
import {
  convertBlueprintLibraryToScores,
  getSetAchievementMultiplier,
  getSetBlueprintScore,
  getSpecifiedMultiplierFromSets,
} from '../../src/helpers/blueprintScoreHelpers';
import { Blueprint } from '../../src/types/Blueprint';

describe('blueprintScoreHelpers', () => {
  describe('convertBlueprintLibraryToScores', () => {
    it('should use the score of the top scoring blueprint', () => {
      const blueprints: Blueprint[] = [
        {
          productName: 'Wood',
          evolutionStage: 2,
          upgradeLevel: 1,
          score: 120,
        },
        { ...DEFAULT_BLUEPRINT, productName: 'Wood' },
        { ...DEFAULT_BLUEPRINT, productName: 'Wood' },
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
        },
        { ...DEFAULT_BLUEPRINT, productName: 'Wood', score: 60 },
        { ...DEFAULT_BLUEPRINT, productName: 'Wood', evolutionStage: 2 },
      ];
      const scores = convertBlueprintLibraryToScores(blueprints);
      expect(scores.get('Wood')).toBe(120);
    });

    it('temp test', () => {
      console.log(
        getSpecifiedMultiplierFromSets(SetMultiplierType.Income, convertBlueprintLibraryToScores(BLUEPRINT_LIBRARY)),
      );
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
      const blueprints = getBlueprintSet('Knife').blueprints;
      expect(getSetBlueprintScore(blueprints, blueprintScores)).toBe(194);
    });

    it('should count missing blueprints as 10 for the log part and 0 for the summing part', () => {
      const blueprintScores = new Map<string, number>([['Sickle', 64]]);
      const blueprints = getBlueprintSet('Knife').blueprints;
      expect(getSetBlueprintScore(blueprints, blueprintScores)).toBe(64);
    });
  });

  describe('getSetAchievementMultiplier', () => {
    it('should return 2.4 if the score is between 4350 and 7500', () => {
      expect(getSetAchievementMultiplier(getBlueprintSet('Wood'), 5000)).toBe(2.4);
    });

    it('should return 1.4 if the score is 270', () => {
      expect(getSetAchievementMultiplier(getBlueprintSet('Wood'), 270)).toBe(1.4);
    });

    it('should return 6 if the score is very high', () => {
      expect(getSetAchievementMultiplier(getBlueprintSet('Wood'), 50e6)).toBe(6);
    });
  });
});
