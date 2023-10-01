import { getScoreAtTopOfStage } from '../../../src/upgradeBlueprints/helpers/blueprintObjectHelpers';

describe('blueprintObjectHelpers', () => {
  describe('getScoreAtTopOfStage', () => {
    it('should return 30 for the top score of a stage 1 bp with strategy 21', () => {
      expect(getScoreAtTopOfStage(1, { topStage: 5, baseLevel: 21, plusLevelsPerStage: 10 })).toBe(30);
    });

    it('should return 240 for the top score of a stage 2 bp with strategy 21', () => {
      expect(getScoreAtTopOfStage(2, { topStage: 5, baseLevel: 21, plusLevelsPerStage: 10 })).toBe(240);
    });

    it('should return 840 for the top score of a stage 2 bp with strategy 51', () => {
      expect(getScoreAtTopOfStage(2, { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 })).toBe(840);
    });

    it('should return 13440 for the top score of a stage 3 bp with strategy 51+10', () => {
      expect(getScoreAtTopOfStage(3, { topStage: 5, baseLevel: 51, plusLevelsPerStage: 10 })).toBe(13440);
    });

    it('should return 8640 for the top score of a stage 3 bp with strategy flat 51', () => {
      expect(getScoreAtTopOfStage(3, { topStage: 5, baseLevel: 51, plusLevelsPerStage: 0 })).toBe(8640);
    });
  });
});
