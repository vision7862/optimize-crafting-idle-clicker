import memoize from 'fast-memoize';
import { BLUEPRINT_SETS, BlueprintSet, SetMultiplierType } from '../constants/BlueprintSets';
import { Blueprint } from '../types/Blueprint';

export const getSpecifiedMultiplierFromLibrary = memoize(
  (multiplierType: SetMultiplierType, blueprints: Blueprint[]) => {
    const scores: Map<string, number> = convertBlueprintLibraryToScores(blueprints);
    return getSpecifiedMultiplierFromSets(multiplierType, scores);
  },
);

export const convertBlueprintLibraryToScores = memoize((blueprints: Blueprint[]): Map<string, number> => {
  const scores = new Map<string, number>();
  blueprints.forEach((blueprint: Blueprint) => {
    scores.set(blueprint.productName, Math.max(scores.get(blueprint.productName) ?? 0, blueprint.score));
  });
  return scores;
});

export const getSpecifiedMultiplierFromSets = memoize(
  (multiplierType: SetMultiplierType, blueprintScores: Map<string, number>): number => {
    let multiplier = 1;
    BLUEPRINT_SETS.filter((set: BlueprintSet) => set.multiplierType === multiplierType).forEach((set: BlueprintSet) => {
      const setMultiplier = getMultiplierForSet(set, blueprintScores);
      multiplier *= setMultiplier;
      console.info(`${set.setName} set: ${setMultiplier}`);
    });
    return multiplier;
  },
);

export function getMultiplierForSet(set: BlueprintSet, blueprintScores: Map<string, number>): number {
  const setScore = getSetBlueprintScore(set.blueprints, blueprintScores);
  return getSetAchievementMultiplier(set, setScore);
}

export function getSetBlueprintScore(blueprints: string[], blueprintScores: Map<string, number>): number {
  let summedScores = 0;
  let lowestScore = Number.MAX_VALUE;
  blueprints.forEach((blueprintName: string) => {
    const score = blueprintScores.get(blueprintName) ?? 0;
    summedScores += score;
    lowestScore = Math.min(lowestScore, score);
  });
  return Math.round(summedScores * Math.log10(Math.max(lowestScore, 10)));
}

export function getSetAchievementMultiplier(set: BlueprintSet, score: number): number {
  if (set.achievementRanks === undefined) {
    console.error(`Set ${set.setName} does not have score boundaries`);
    return 1;
  }
  let multiplier = 1;
  for (let i = 0; i < set.achievementRanks.length; i++) {
    if (score < set.achievementRanks[i].scoreBoundary) {
      return multiplier;
    }
    multiplier = set.achievementRanks[i].totalMultiplier;
  }
  return Math.round(multiplier);
}
