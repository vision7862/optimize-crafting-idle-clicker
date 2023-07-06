import { BLUEPRINT_SETS, BlueprintSet } from '../constants/BlueprintSets';

export function getIncomeMultiplierFromSets(blueprintScores: Map<string, number>): number {
  let multiplier = 1;
  multiplier *= getMultiplierForSet('Wood', blueprintScores);
  return multiplier;
}

export function getMultiplierForSet(setName: string, blueprintScores: Map<string, number>): number {
  const set: BlueprintSet = getBlueprintSet(setName);
  const setScore = getSetBlueprintScore(set.blueprints, blueprintScores);
  return getSetAchievementMultiplier(set, setScore);
}

function getBlueprintSet(setName: string): BlueprintSet {
  const setsMatchingName = BLUEPRINT_SETS.filter((set: BlueprintSet) => {
    return set.setName === setName;
  });
  if (setsMatchingName.length !== 1) {
    throw new Error(`Set ${setName} does not have exactly 1 match. It has ${setsMatchingName.length}.`);
  }
  return setsMatchingName[0];
}

export function getSetBlueprintScore(blueprints: string[], blueprintScores: Map<string, number>): number {
  let summedScores = 0;
  let lowestScore = Number.MAX_VALUE;
  blueprints.forEach((blueprintName: string) => {
    const score = blueprintScores.get(blueprintName) ?? 0;
    summedScores += score;
    lowestScore = Math.min(lowestScore, score);
  });
  return Math.round(summedScores * Math.log10(lowestScore > 0 ? lowestScore : 10));
}

export function getSetAchievementMultiplier(set: BlueprintSet, score: number): number {
  if (set.scoreBoundaries === undefined) {
    throw new Error(`Set ${set.setName} does not have score boundaries`);
  }
  let multiplier = 1;
  const multiplierAmountPerRank: number | null | undefined = set.multiplierAmountPerRank;
  if (multiplierAmountPerRank == null) {
    throw new Error(`Cannot calculate achievement multiplier for set ${set.setName} by a consistent amount per rank`);
  }
  for (let i = 0; i < set.scoreBoundaries.length; i++) {
    if (score < set.scoreBoundaries[i]) {
      return multiplier;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    multiplier += set.multiplierAmountPerRank!;
  }
  return Math.round(multiplier);
}

export const BLUEPRINT_SCORE_HELPERS_TEST_EXPORTS = {
  getBlueprintSet,
};
