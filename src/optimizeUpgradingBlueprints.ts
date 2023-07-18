import { BLUEPRINT_LIBRARY } from './config/BlueprintLibrary';
import { BLUEPRINT_SETS, BlueprintSet, SetMultiplierType } from './constants/BlueprintSets';
import {
  convertBlueprintLibraryToScores,
  getDistanceToNextRank,
  getOnlyTopBlueprints,
} from './helpers/blueprintScoreHelpers';
import { SetUpgradeInfo, upgradeSetToNextRank } from './helpers/blueprintUpgradeHelpers';
import { Blueprint } from './types/Blueprint';

export type BlueprintUpgradeInfo = Readonly<{
  blueprint: Blueprint;
  costOfUpgrade: number;
  scoreChange: number;
}>;

export function upgradeMostImpactfulIncomeSet(blueprints: Blueprint[] = BLUEPRINT_LIBRARY): SetUpgradeInfo | null {
  let bestROI = 0;
  let bestUpgradeInfo: SetUpgradeInfo | null = null;
  let setName = '';
  BLUEPRINT_SETS.filter(
    (set: BlueprintSet) =>
      set.multiplierType === SetMultiplierType.Income || set.multiplierType === SetMultiplierType.MerchantRevenue,
  ).forEach((set: BlueprintSet) => {
    const distanceInfo = getDistanceToNextRank(set, convertBlueprintLibraryToScores(blueprints));
    const upgradeInfo: SetUpgradeInfo | null = upgradeSetToNextRank(set, blueprints);
    if (upgradeInfo !== null) {
      const roi = distanceInfo.improvement / upgradeInfo.cost;
      if (roi > bestROI) {
        bestROI = roi;
        bestUpgradeInfo = upgradeInfo;
        setName = set.setName;
      }
    }
  });
  console.log(`to get to next rank of ${setName}`);
  return bestUpgradeInfo;
}
export function upgradeMostImpactfulSetOfType(
  type: SetMultiplierType,
  blueprints: Blueprint[] = BLUEPRINT_LIBRARY,
): SetUpgradeInfo | null {
  let bestROI = 0;
  let bestUpgradeInfo: SetUpgradeInfo | null = null;
  let setName = '';
  BLUEPRINT_SETS.filter((set: BlueprintSet) => set.multiplierType === type).forEach((set: BlueprintSet) => {
    const distanceInfo = getDistanceToNextRank(set, convertBlueprintLibraryToScores(blueprints));
    const upgradeInfo: SetUpgradeInfo | null = upgradeSetToNextRank(set, blueprints);
    if (upgradeInfo !== null) {
      const roi = distanceInfo.improvement / upgradeInfo.cost;
      if (roi > bestROI) {
        bestROI = roi;
        bestUpgradeInfo = upgradeInfo;
        setName = set.setName;
      }
    }
  });
  console.log(`to get to next rank of ${setName}`);
  return bestUpgradeInfo;
}

export function printUpgradeInfoOfEachSet(blueprints: Blueprint[] = BLUEPRINT_LIBRARY): void {
  BLUEPRINT_SETS.forEach((set: BlueprintSet) => {
    const distanceInfo = getDistanceToNextRank(set, convertBlueprintLibraryToScores(blueprints));
    const upgradeInfo: SetUpgradeInfo | null = upgradeSetToNextRank(set, blueprints);
    if (upgradeInfo !== null) {
      const roi = distanceInfo.improvement / upgradeInfo.cost;
      // console.log(
      //   `upgrading ${set.setName} has an ROI of ${roi} and would cost ${upgradeInfo.cost}. it affects ${
      //     SetMultiplierType[set.multiplierType]
      //   }`,
      // );
      console.log(`aaa${set.setName};${roi};${upgradeInfo.cost};${SetMultiplierType[set.multiplierType]}`);
    }
  });
}
export function upgradeAllIncomeBlueprintsToLoreLimit(
  lore: number,
  blueprints: Blueprint[] = BLUEPRINT_LIBRARY,
): SetUpgradeInfo {
  const allUpgradedBlueprints: Blueprint[] = [];
  let totalCost = 0;
  let inProgressBlueprintLibrary = Array.from(blueprints);
  while (totalCost < lore) {
    const upgradeInfo = upgradeMostImpactfulIncomeSet(inProgressBlueprintLibrary);
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
