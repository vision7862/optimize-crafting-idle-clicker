import memoize from 'fast-memoize';
import { SetMultiplierType } from '../../upgradeBlueprints/constants/BlueprintSets';
import { getSpecifiedMultiplierFromLibrary } from '../../upgradeBlueprints/helpers/blueprintScoreHelpers';
import { RESEARCH_BOOST_MULTIPLIER } from '../config/BoostMultipliers';
import {
  PROMOTION_BONUS_RESEARCH,
  RESEARCH_ACHIEVEMENT_MULTIPLIER,
  TOTAL_BLUEPRINT_SCORE_MULTIPLIER,
} from '../constants/Achievements';
import { Workshop, WorkshopStatus } from '../types/Workshop';
import { isEvent } from './WorkshopHelpers';

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
    RESEARCH_ACHIEVEMENT_MULTIPLIER *
    getSpecifiedMultiplierFromLibrary(SetMultiplierType.Research) *
    TOTAL_BLUEPRINT_SCORE_MULTIPLIER *
    PROMOTION_BONUS_RESEARCH
  );
}
