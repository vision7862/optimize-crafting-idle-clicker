import { getSetBlueprintScore } from '../../src/helpers/blueprintScoreHelpers';

describe('blueprintScoreHelpers', () => {
  describe('getSetBlueprintScore', () => {
    it('should calculate a blueprint set score correctly', () => {
      const blueprintScores = new Map<string, number>([
        ['Sickle', 64],
        ['Magnificent Dagger', 50],
      ]);
      expect(getSetBlueprintScore('Knife', blueprintScores)).toBe(194);
    });
  });
});
