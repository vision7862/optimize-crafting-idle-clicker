import memoize from 'fast-memoize';
import { Workshop, WorkshopStatus } from '../../types/Workshop';
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

const RESEARCH_BOOST_MULTIPLIER = 10;
export function getResearchPerSecond(workshopStatus: WorkshopStatus): number {
  const researchMultiplierPercentage = isEvent(workshopStatus) ? 1 : getMainWorkshopResearchMultiplier();
  const researchPerSecond =
    workshopStatus.scientists *
    researchMultiplierPercentage *
    (workshopStatus.researchBoostActive ? RESEARCH_BOOST_MULTIPLIER : 1);
  return Math.round(researchPerSecond);
}

function getMainWorkshopResearchMultiplier(): number {
  return (
    5 * // research achievement
    1.25 * // science tools
    1 * // exploration
    1.5 * // modern exploration
    1 * // modern technology
    1.3 // total blueprint score
  );
}
