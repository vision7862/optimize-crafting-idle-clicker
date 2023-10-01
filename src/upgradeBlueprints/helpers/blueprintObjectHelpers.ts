import { Blueprint } from '../types/Blueprint';
import { MergingStrategy } from '../types/MergingStrategy';

// these defaults are for the 51+10 strategy
export const BASE_BP: Blueprint = {
  productName: 'Wood',
  evolutionStage: 1,
  upgradeLevel: 1,
  score: 10,
  scoreChangePerLevel: 1,
};

export const TOP_STAGE_1: Blueprint = {
  ...BASE_BP,
  upgradeLevel: 51,
  score: BASE_BP.score + (BASE_BP.score / 10) * 50,
};

export const BOTTOM_STAGE_2: Blueprint = {
  ...BASE_BP,
  evolutionStage: 2,
  score: (BASE_BP.score + (BASE_BP.score / 10) * 50) * 2,
  scoreChangePerLevel: ((BASE_BP.scoreChangePerLevel * (BASE_BP.score + (BASE_BP.score / 10) * 50)) / 10) * 2,
};

export const TOP_STAGE_2: Blueprint = {
  ...BOTTOM_STAGE_2,
  upgradeLevel: 61,
  score: BOTTOM_STAGE_2.score + (BOTTOM_STAGE_2.score / 10) * 60,
};

export function getBottomOfStageBP(evolutionStage: number, strategy: MergingStrategy): Blueprint {
  if (evolutionStage === 1) {
    return BASE_BP;
  } else {
    const topStageScore = getScoreAtTopOfStage(evolutionStage - 1, strategy);
    return {
      ...BASE_BP,
      evolutionStage,
      score: topStageScore * 2,
      scoreChangePerLevel: (topStageScore / 10) * 2,
    };
  }
}

export function getScoreAtTopOfStage(evolutionStage: number, strategy: MergingStrategy): number {
  const topPrevStageScore =
    evolutionStage === 1 ? BASE_BP.score / 2 : getScoreAtTopOfStage(evolutionStage - 1, strategy);
  const scoreChangePerLevel = (topPrevStageScore * 2) / 10;
  const totalAdditionalLevels = strategy.baseLevel - 1 + strategy.plusLevelsPerStage * (evolutionStage - 1);
  return topPrevStageScore * 2 + scoreChangePerLevel * totalAdditionalLevels;
}
