import { BLUEPRINT_LIBRARY } from './config/BlueprintLibrary';
import { BLUEPRINT_SETS, BlueprintSet, SetMultiplierType } from './constants/BlueprintSets';
import {
  convertBlueprintLibraryToScores,
  getDistanceToNextRank,
  getOnlyTopBlueprints,
  getSpecifiedMultiplierFromLibrary,
} from './helpers/blueprintScoreHelpers';
import { SetUpgradeInfo, upgradeBlueprint, upgradeSetToNextRank } from './helpers/blueprintUpgradeHelpers';
import { Blueprint } from './types/Blueprint';

export type BlueprintUpgradeInfo = Readonly<{
  blueprint: Blueprint;
  costOfUpgrade: number;
  scoreChange: number;
}>;

export function getBestBlueprintToUpgrade(library: Blueprint[]): BlueprintUpgradeInfo | null {
  const startingIncomeMultiplier = getSpecifiedMultiplierFromLibrary(SetMultiplierType.Income, library);

  let bestImprovement: number = 0;
  let bestUpgrade: BlueprintUpgradeInfo | null = null;
  let hasBeenImproved = false;
  let levelsToUpgrade = 10;
  while (!hasBeenImproved && levelsToUpgrade <= 90) {
    for (let i = 0; i < library.length; i++) {
      // TODO: only upgrade top scoring blueprints
      const blueprintToUpgrade: Blueprint = library.splice(i, 1)[0];
      const topUpgradeLevel = 51 + (blueprintToUpgrade.evolutionStage - 1) * 10;
      if (blueprintToUpgrade.upgradeLevel >= topUpgradeLevel) {
        library.splice(i, 0, blueprintToUpgrade);
        continue;
      }

      const blueprintUpgradeInfo = upgradeBlueprint(blueprintToUpgrade, levelsToUpgrade);

      const inProgressLibrary = Array.from(library);
      inProgressLibrary.splice(i, 0, blueprintUpgradeInfo.blueprint);
      const newIncomeMultiplier = getSpecifiedMultiplierFromLibrary(SetMultiplierType.Income, inProgressLibrary);
      const improvement = newIncomeMultiplier / startingIncomeMultiplier / blueprintUpgradeInfo.costOfUpgrade;
      if (improvement > bestImprovement) {
        hasBeenImproved = hasBeenImproved || newIncomeMultiplier > startingIncomeMultiplier;
        bestImprovement = improvement;
        bestUpgrade = blueprintUpgradeInfo;
      }
    }
    levelsToUpgrade += 10;
  }

  return hasBeenImproved ? bestUpgrade : null;
}

export function upgradeMostImpactfulSet(blueprints: Blueprint[] = BLUEPRINT_LIBRARY): SetUpgradeInfo | null {
  let bestROI = 0;
  let bestUpgradeInfo: SetUpgradeInfo | null = null;
  let setName = '';
  BLUEPRINT_SETS.filter((set: BlueprintSet) => set.multiplierType === SetMultiplierType.Income).forEach(
    (set: BlueprintSet) => {
      const distanceInfo = getDistanceToNextRank(set, convertBlueprintLibraryToScores(blueprints));
      const upgradeInfo: SetUpgradeInfo = upgradeSetToNextRank(set, blueprints);
      const roi = distanceInfo.improvement / upgradeInfo.cost;
      if (roi > bestROI) {
        bestROI = roi;
        bestUpgradeInfo = upgradeInfo;
        setName = set.setName;
      }
    },
  );
  console.log(`to get to next rank of ${setName}`);
  return bestUpgradeInfo;
}

export function upgradeAllBlueprintsToLoreLimit(
  lore: number,
  blueprints: Blueprint[] = BLUEPRINT_LIBRARY,
): SetUpgradeInfo {
  const allUpgradedBlueprints: Blueprint[] = [];
  let totalCost = 0;
  let inProgressBlueprintLibrary = Array.from(blueprints);
  while (totalCost < lore) {
    const upgradeInfo = upgradeMostImpactfulSet(inProgressBlueprintLibrary);
    if (upgradeInfo === null || totalCost + upgradeInfo.cost >= lore) {
      break;
    }
    totalCost += upgradeInfo.cost;
    inProgressBlueprintLibrary = upgradeInfo.allBlueprintsWithUpgradedReplacements;
    allUpgradedBlueprints.push(...upgradeInfo.upgradedBlueprints);
  }
  const upgradedBlueprints = getOnlyTopBlueprints(allUpgradedBlueprints);
  return {
    upgradedBlueprints,
    cost: totalCost,
    allBlueprintsWithUpgradedReplacements: inProgressBlueprintLibrary,
  };
}
