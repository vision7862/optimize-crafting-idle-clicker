import memoize from 'fast-memoize';
import { MainWorkshopProducts } from '../../../products/MainWorkshop';
import { ImportedProduct } from '../../buildWorkshop/types/ImportedProduct';
import { BLUEPRINT_LIBRARY } from '../config/BlueprintLibrary';
import { AchievementRank, BLUEPRINT_SETS, BlueprintSet, SetMultiplierType } from '../constants/BlueprintSets';
import { Blueprint, ProductName } from '../types/Blueprint';

export const getSpecifiedMultiplierFromLibrary = memoize(
  (multiplierType: SetMultiplierType, blueprints: Blueprint[] = BLUEPRINT_LIBRARY) => {
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
      // console.info(`${set.setName} set: ${setMultiplier}`);
    });
    return multiplier;
  },
);

export function getMultiplierForSet(set: BlueprintSet, blueprintScores: Map<string, number>): number {
  const blueprints = getBlueprintsInSet(set.setName);
  const setScore = getSetBlueprintScore(blueprints, blueprintScores);
  return getAchievementMultiplier(set.achievementRanks, setScore);
}

const setNameMapping = new Map<string, string>([
  ['Precious', 'Luxury'],
  ['Mining Tools', 'Mining'],
  ['Science Tools', 'Research'],
  ['Cut Gems', 'Gems'],
  ['Music Instruments', 'Music'],
]);
export const getBlueprintsInSet = memoize(
  (setName: string, products: readonly ImportedProduct[] = MainWorkshopProducts): ProductName[] => {
    const mappedSetName = setNameMapping.get(setName) ?? setName;
    return products
      .filter((product: ImportedProduct) => product.Tags?.includes(mappedSetName.replace(/\s/g, '')))
      .map((product: ImportedProduct) => product.ProductType as ProductName);
  },
);

export function getSetBlueprintScore(
  blueprints: string[],
  blueprintScores: Map<string, number>,
  isSetUnfinished: boolean = false,
): number {
  let summedScores = 0;
  let lowestScore = isSetUnfinished ? 10 : Number.MAX_VALUE;
  blueprints.forEach((blueprintName: string) => {
    const score = blueprintScores.get(blueprintName) ?? 0;
    summedScores += score;
    lowestScore = Math.min(lowestScore, score);
  });
  return Math.round(summedScores * Math.log10(Math.max(lowestScore, 10)));
}

export function getAchievementMultiplier(achievementRanks: AchievementRank[], score: number): number {
  let multiplier = 1;
  for (let i = 0; i < achievementRanks.length; i++) {
    if (score < achievementRanks[i].scoreBoundary) {
      return multiplier;
    }
    multiplier = achievementRanks[i].totalMultiplier;
  }
  return Math.round(multiplier);
}

export const getDistanceToNextRank = memoize(
  (set: BlueprintSet, setScore: number): { distance: number; improvement: number } => {
    if (set.achievementRanks === undefined) {
      console.error(`Set ${set.setName} does not have score boundaries`);
      return { distance: Number.MAX_VALUE, improvement: 1 };
    }
    if (set.achievementRanks[0].scoreBoundary !== 0) {
      // throw new Error('first set boundary score must be 0');
      set.achievementRanks?.splice(0, 0, { scoreBoundary: 0, totalMultiplier: 1 });
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
