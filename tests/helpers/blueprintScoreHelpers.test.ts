import {
  BLUEPRINT_SCORE_HELPERS_TEST_EXPORTS,
  getSetAchievementMultiplier,
  getSetBlueprintScore,
} from '../../src/helpers/blueprintScoreHelpers';

describe('blueprintScoreHelpers', () => {
  describe('getSetBlueprintScore', () => {
    it('should calculate a blueprint set score correctly', () => {
      const blueprintScores = new Map<string, number>([
        ['Sickle', 64],
        ['Magnificent Dagger', 50],
      ]);
      const blueprints = BLUEPRINT_SCORE_HELPERS_TEST_EXPORTS.getBlueprintSet('Knife').blueprints;
      expect(getSetBlueprintScore(blueprints, blueprintScores)).toBe(194);
    });

    it('should count missing blueprints as 10 for the log part and 0 for the summing part', () => {
      const blueprintScores = new Map<string, number>([['Sickle', 64]]);
      const blueprints = BLUEPRINT_SCORE_HELPERS_TEST_EXPORTS.getBlueprintSet('Knife').blueprints;
      expect(getSetBlueprintScore(blueprints, blueprintScores)).toBe(64);
    });
  });

  describe('getWoodSetAchievementMultiplier', () => {
    it('should return 2.4 if the score is between 4350 and 7500', () => {
      expect(getSetAchievementMultiplier(BLUEPRINT_SCORE_HELPERS_TEST_EXPORTS.getBlueprintSet('Wood'), 5000)).toBe(2.4);
    });

    it('should return 1.4 if the score is 270', () => {
      expect(getSetAchievementMultiplier(BLUEPRINT_SCORE_HELPERS_TEST_EXPORTS.getBlueprintSet('Wood'), 270)).toBe(1.4);
    });

    it('should return 6 if the score is very high', () => {
      expect(getSetAchievementMultiplier(BLUEPRINT_SCORE_HELPERS_TEST_EXPORTS.getBlueprintSet('Wood'), 50e6)).toBe(6);
    });
  });
});
