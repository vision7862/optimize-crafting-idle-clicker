import { Blueprint } from '../types/Blueprint';

// these defaults are for the 51+10 strategy
export const BOTTOM_STAGE_1: Blueprint = {
  productName: 'productName',
  evolutionStage: 1,
  upgradeLevel: 1,
  score: 10,
  scoreChangePerLevel: 1,
};

export const TOP_STAGE_1: Blueprint = {
  ...BOTTOM_STAGE_1,
  upgradeLevel: 51,
  score: BOTTOM_STAGE_1.score + (BOTTOM_STAGE_1.score / 10) * 50,
};

export const BOTTOM_STAGE_2: Blueprint = {
  ...BOTTOM_STAGE_1,
  evolutionStage: 2,
  score: (BOTTOM_STAGE_1.score + (BOTTOM_STAGE_1.score / 10) * 50) * 2,
  scoreChangePerLevel:
    ((BOTTOM_STAGE_1.scoreChangePerLevel * (BOTTOM_STAGE_1.score + (BOTTOM_STAGE_1.score / 10) * 50)) / 10) * 2,
};

export const TOP_STAGE_2: Blueprint = {
  ...BOTTOM_STAGE_2,
  upgradeLevel: 61,
  score: BOTTOM_STAGE_2.score + (BOTTOM_STAGE_2.score / 10) * 60,
};

export const BOTTOM_STAGE_3: Blueprint = {
  ...BOTTOM_STAGE_1,
  evolutionStage: 3,
  score: (BOTTOM_STAGE_2.score + (BOTTOM_STAGE_2.score / 10) * 60) * 2,
  scoreChangePerLevel: BOTTOM_STAGE_2.scoreChangePerLevel * 14,
};

export const TOP_STAGE_3: Blueprint = {
  ...BOTTOM_STAGE_3,
  upgradeLevel: 71,
  score: BOTTOM_STAGE_3.score + (BOTTOM_STAGE_3.score / 10) * 70,
};

export function getBottomOfStageBP(evolutionStage: number, strategy: number): Blueprint {
  const topStageScore = getScoreAtTopOfStage(evolutionStage, strategy);
  if (evolutionStage === 1) {
    return BOTTOM_STAGE_1;
  } else {
    return {
      ...BOTTOM_STAGE_1,
      evolutionStage: evolutionStage + 1,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      score: topStageScore * 2,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      scoreChangePerLevel: (topStageScore / 10) * 2,
    };
  }
}

export function getScoreAtTopOfStage(evolutionStage: number, strategy: number): number {
  if (evolutionStage > 10) {
    throw new Error('evolution stage must be 10 or below');
  }

  // const thePlus10Part = 10 * (evolutionStage - 1);
  const topStage1Score = BOTTOM_STAGE_1.score + (BOTTOM_STAGE_1.score / 10) * (strategy - 1);
  const topStage2Score = topStage1Score * 2 + ((topStage1Score * 2) / 10) * (strategy - 1 + 10);
  const topStage3Score = topStage2Score * 2 + ((topStage2Score * 2) / 10) * (strategy - 1 + 20);
  const topStage4Score = topStage3Score * 2 + ((topStage3Score * 2) / 10) * (strategy - 1 + 30);
  const topStage5Score = topStage4Score * 2 + ((topStage4Score * 2) / 10) * (strategy - 1 + 40);
  const topStage6Score = topStage5Score * 2 + ((topStage5Score * 2) / 10) * (strategy - 1 + 50);
  const topStage7Score = topStage6Score * 2 + ((topStage6Score * 2) / 10) * (strategy - 1 + 60);
  const topStage8Score = topStage7Score * 2 + ((topStage7Score * 2) / 10) * (strategy - 1 + 70);
  const topStage9Score = topStage8Score * 2 + ((topStage8Score * 2) / 10) * (strategy - 1 + 80);
  const topStage10Score = topStage9Score * 2 + ((topStage9Score * 2) / 10) * (strategy - 1 + 90);

  // stage to top score
  const topStageScores = new Map<number, number>([
    [1, topStage1Score],
    [2, topStage2Score],
    [3, topStage3Score],
    [4, topStage4Score],
    [5, topStage5Score],
    [6, topStage6Score],
    [7, topStage7Score],
    [8, topStage8Score],
    [9, topStage9Score],
    [10, topStage10Score],
  ]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return topStageScores.get(evolutionStage)!;
}
