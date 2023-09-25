import memoize from 'fast-memoize';
import { BLUEPRINT_LIBRARY } from '../../upgradeBlueprints/config/BlueprintLibrary';
import { SetMultiplierType } from '../../upgradeBlueprints/constants/BlueprintSets';
import {
  convertBlueprintLibraryToScores,
  getAchievementMultiplier,
  getSetBlueprintScore,
  getSpecifiedMultiplierFromLibrary,
} from '../../upgradeBlueprints/helpers/blueprintScoreHelpers';
import { PRODUCT_IMPROVER, SCIENTIFIC_METHOD } from '../constants/Achievements';
import { PromoEvent } from '../types/PromoEvent';
import { MainWorkshopStatus, Workshop, WorkshopStatus } from '../types/Workshop';
import { isEvent } from './WorkshopHelpers';
import { getGameStatus } from './otherMultiplierHelpers';

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
  const researchPerSecond = workshopStatus.scientists * getResearchMultiplier(workshopStatus);
  return Math.round(researchPerSecond);
});

export function getResearchMultiplier(workshopStatus: WorkshopStatus): number {
  const researchMultiplierBasePercentage = isEvent(workshopStatus)
    ? 1
    : getMainWorkshopResearchMultiplier(workshopStatus);
  return (
    researchMultiplierBasePercentage *
    (workshopStatus.researchBoostActive ? getGameStatus().boostMultipliers.research : 1)
  );
}

function getMainWorkshopResearchMultiplier(workshopStatus: MainWorkshopStatus): number {
  return (
    getAchievementMultiplier(SCIENTIFIC_METHOD, getGameStatus().highestEverAchievements.scientificMethod) *
    getSpecifiedMultiplierFromLibrary(SetMultiplierType.Research) *
    getAchievementMultiplier(
      PRODUCT_IMPROVER,
      getSetBlueprintScore(
        BLUEPRINT_LIBRARY.map((bp) => bp.productName),
        convertBlueprintLibraryToScores(BLUEPRINT_LIBRARY),
        true,
      ),
    ) *
    Math.min(
      20,
      workshopStatus.currentPromo === PromoEvent.Research
        ? getGameStatus().premiumBonuses.research + 1
        : getGameStatus().premiumBonuses.research,
    )
  );
}
