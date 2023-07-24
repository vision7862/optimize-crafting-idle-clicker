import { getScoreAtTopOfStage } from '../../../src/upgradeBlueprints/helpers/blueprintObjectHelpers';

describe('blueprintObjectHelpers', () => {
  describe('getScoreAtTopOfStage', () => {
    it('should return 30 for the top score of a stage 1 bp with strategy 21', () => {
      expect(getScoreAtTopOfStage(1, 21)).toBe(30);
    });

    it('should return 240 for the top score of a stage 2 bp with strategy 21', () => {
      expect(getScoreAtTopOfStage(2, 21)).toBe(240);
    });

    it('should return 840 for the top score of a stage 2 bp with strategy 51', () => {
      expect(getScoreAtTopOfStage(2, 51)).toBe(840);
    });
  });
});
