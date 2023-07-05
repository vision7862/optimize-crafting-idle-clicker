import { BlueprintSet, blueprintSets } from '../constants/BlueprintSets';

export function getSetBlueprintScore(setName: string, blueprintScores: Map<string, number>): number {
  const set: BlueprintSet = blueprintSets.filter((set: BlueprintSet) => {
    return set.setName === setName;
  })[0];
  let summedScores = 0;
  let lowestScore = Number.MAX_VALUE;
  set.blueprints.forEach((blueprintName: string) => {
    const score = blueprintScores.get(blueprintName) ?? 10;
    summedScores += score;
    lowestScore = Math.min(lowestScore, score);
  });
  return Math.round(summedScores * Math.log10(lowestScore));
}
