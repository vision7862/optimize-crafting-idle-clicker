import memoize from 'fast-memoize';
import { BLUEPRINT_SETS, BlueprintSet, SetMultiplierType } from '../constants/BlueprintSets';
import { Blueprint } from '../types/Blueprint';

export const getSpecifiedMultiplierFromLibrary = memoize(
  (multiplierType: SetMultiplierType, blueprints: Blueprint[]) => {
    const scores: Map<string, number> = convertBlueprintLibraryToScores(blueprints);
    return getSpecifiedMultiplierFromSets(multiplierType, scores);
  },
);

export const getOnlyTopBlueprints = memoize((blueprints: Blueprint[]): Blueprint[] => {
  const scores = new Map<string, number>();
  blueprints.forEach((blueprint: Blueprint) => {
    scores.set(blueprint.productName, Math.max(scores.get(blueprint.productName) ?? 0, blueprint.score));
  });
  const onlyTopBlueprints = new Map<string, Blueprint>();
  blueprints.forEach((blueprint: Blueprint) => {
    if (
      blueprint.score === scores.get(blueprint.productName) &&
      onlyTopBlueprints.get(blueprint.productName) === undefined
    ) {
      onlyTopBlueprints.set(blueprint.productName, blueprint);
    }
  });
  return Array.from(onlyTopBlueprints.values());
});

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

// export function getNextScoreBoundaryForBlueprint(blueprint: Blueprint, blueprintScores: Map<string, number>): number {
//   let nearestBoundaryDistance = Number.MAX_VALUE;
//   BLUEPRINT_SETS.filter((set: BlueprintSet) => set.blueprints.includes(blueprint.productName)).forEach(
//     (set: BlueprintSet) => {
//       if (set.achievementRanks === undefined) {
//         throw new Error(`trying to get set boundaries for ${set.setName} failed`);
//       }
//       const setScore = getSetBlueprintScore(set.blueprints, blueprintScores);
//       for (let i = 0; i < set.achievementRanks.length - 1; i++) {
//         if (setScore > set.achievementRanks[i].scoreBoundary && setScore > set.achievementRanks[i + 1].scoreBoundary) {
//           nearestBoundaryDistance = Math.min(
//             nearestBoundaryDistance,
//             set.achievementRanks[i + 1].scoreBoundary - setScore,
//           );
//         }
//       }
//     },
//   );
// }

export function getSetClosestToBoundary(
  blueprintSets: BlueprintSet[] = BLUEPRINT_SETS,
  blueprintScores: Map<string, number>,
): string {
  let closestDistance = Number.MAX_VALUE;
  let closestSetName = 'no close set';
  blueprintSets
    .filter((set: BlueprintSet) => set.multiplierType === SetMultiplierType.Income)
    .forEach((set: BlueprintSet) => {
      const distanceInfo = getDistanceToNextRank(set, blueprintScores);
      if (distanceInfo.distance < closestDistance) {
        closestDistance = distanceInfo.distance;
        closestSetName = set.setName;
      }
    });
  return closestSetName;
}

export const getDistanceToNextRank = memoize(
  (set: BlueprintSet, blueprintScores: Map<string, number>): { distance: number; improvement: number } => {
    const setScore = getSetBlueprintScore(set.blueprints, blueprintScores);
    if (set.achievementRanks === undefined) {
      console.error(`Set ${set.setName} does not have score boundaries`);
      return { distance: Number.MAX_VALUE, improvement: 1 };
    }
    for (let i = 1; i < set.achievementRanks.length; i++) {
      if (setScore < set.achievementRanks[i].scoreBoundary && setScore >= set.achievementRanks[i - 1].scoreBoundary) {
        const distanceToNextRank = set.achievementRanks[i].scoreBoundary - setScore;
        // console.log(`${set.setName} is ${distanceToNextRank} score points away from rank ${i}`);
        const improvement =
          Math.round((set.achievementRanks[i].totalMultiplier / set.achievementRanks[i - 1].totalMultiplier) * 100) /
          100;
        // console.log(
        //   `next rank would be ${improvement}x better (${set.achievementRanks[i - 1].totalMultiplier} to ${
        //     set.achievementRanks[i].totalMultiplier
        //   })`,
        // );
        return { distance: distanceToNextRank, improvement };
      }
    }
    return { distance: Number.MAX_VALUE, improvement: 1 };
  },
);
