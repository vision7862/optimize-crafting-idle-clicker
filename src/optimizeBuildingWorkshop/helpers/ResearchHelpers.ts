import memoize from 'fast-memoize';
import { BLUEPRINT_LIBRARY } from '../../config/BlueprintLibrary';
import { RESEARCH_BOOST_MULTIPLIER } from '../../config/BoostMultipliers';
import { SetMultiplierType } from '../../constants/BlueprintSets';
import { convertBlueprintLibraryToScores, getSpecifiedMultiplierFromSets } from '../../helpers/blueprintScoreHelpers';
import { Workshop, WorkshopStatus } from '../../types/Workshop';
import { isEvent } from './WorkshopHelpers';
import { RESEARCH_ACHIEVEMENT_MULTIPLIER, TOTAL_BLUEPRINT_SCORE_MULTIPLIER } from '../../constants/Achievements';

export function getCostOfScientists(numScientists: number): number {
  return getCostOfScientistsFromSome(0, numScientists);
}

export function getCostOfScientistsFromSome(startingScientists: number, finalScientists: number): number {
  let cost = 0;
  for (let i = Math.max(2, startingScientists + 1); i <= finalScientists; i++) {
    cost += Math.round(50 * 1.15 ** (i - 2));
  }
  return cost;
}

export function getFinalNumScientistsCanAfford(startingScientists: number, moneyToSpend: number): number {
  let cost = 0;
  let finalNumScientists = startingScientists;
  for (let i = Math.max(2, startingScientists + 1); i <= startingScientists + 500; i++) {
    cost += Math.round(50 * 1.15 ** (i - 2));
    if (cost <= moneyToSpend) {
      finalNumScientists++;
    }
  }
  return finalNumScientists;
}

export const computeResearchTimeForWorkshop = memoize((workshop: Workshop): number => {
  let totalResearchNeeded: number = 0;
  for (const product of workshop.productsInfo) {
    if (product.status.level > 0) {
      totalResearchNeeded += product.details.researchCost;
    }
  }

  return totalResearchNeeded / getResearchPerSecond(workshop.workshopStatus);
});

export const getResearchPerSecond = memoize((workshopStatus: WorkshopStatus): number => {
  const researchMultiplierPercentage = isEvent(workshopStatus) ? 1 : getMainWorkshopResearchMultiplier();
  const researchPerSecond =
    workshopStatus.scientists *
    researchMultiplierPercentage *
    (workshopStatus.researchBoostActive ? RESEARCH_BOOST_MULTIPLIER : 1);
  return Math.round(researchPerSecond);
});

function getMainWorkshopResearchMultiplier(): number {
  return (
    RESEARCH_ACHIEVEMENT_MULTIPLIER * // research achievement
    getSpecifiedMultiplierFromSets(SetMultiplierType.Research, convertBlueprintLibraryToScores(BLUEPRINT_LIBRARY)) *
    TOTAL_BLUEPRINT_SCORE_MULTIPLIER // total blueprint score
  );
}
