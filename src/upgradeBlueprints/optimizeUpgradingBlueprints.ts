import { BLUEPRINT_LIBRARY } from './config/BlueprintLibrary';
import { BLUEPRINT_SETS, BlueprintSet, SetMultiplierType } from './constants/BlueprintSets';
import {
  convertBlueprintLibraryToScores,
  getBlueprintsInSet,
  getDistanceToNextRank,
  getOnlyTopBlueprints,
  getSetBlueprintScore,
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
  const blueprintScores = convertBlueprintLibraryToScores(blueprints);
  BLUEPRINT_SETS.filter(
    (set: BlueprintSet) =>
      (set.multiplierType === SetMultiplierType.Income || set.multiplierType === SetMultiplierType.MerchantRevenue) &&
      !(set.isUnfinished === false),
  ).forEach((set: BlueprintSet) => {
    const setBlueprints = getBlueprintsInSet(set.setName);
    const setScore = getSetBlueprintScore(setBlueprints, blueprintScores);
    const distanceInfo = getDistanceToNextRank(set, setScore);
    const upgradeInfo: SetUpgradeInfo | null = upgradeSetToNextRank(set, blueprints);
    if (upgradeInfo !== null) {
      const roi = distanceInfo.improvement / upgradeInfo.cost;
      if (roi > bestROI) {
        bestROI = roi;
        bestUpgradeInfo = {
          ...upgradeInfo,
          upgradedBlueprints: upgradeInfo.upgradedBlueprints.sort((a, b) => a.score - b.score),
        };
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
  const blueprintScores = convertBlueprintLibraryToScores(blueprints);
  BLUEPRINT_SETS.filter((set: BlueprintSet) => set.multiplierType === type && !(set.isUnfinished === false)).forEach(
    (set: BlueprintSet) => {
      const setBlueprints = getBlueprintsInSet(set.setName);
      const setScore = getSetBlueprintScore(setBlueprints, blueprintScores);
      const distanceInfo = getDistanceToNextRank(set, setScore);
      const upgradeInfo: SetUpgradeInfo | null = upgradeSetToNextRank(set, blueprints);
      if (upgradeInfo !== null) {
        const roi = distanceInfo.improvement / upgradeInfo.cost;
        if (roi > bestROI) {
          bestROI = roi;
          bestUpgradeInfo = upgradeInfo;
          setName = set.setName;
        }
      }
    },
  );
  console.log(`to get to next rank of ${setName}`);
  return bestUpgradeInfo;
}

export function printUpgradeInfoOfEachSet(
  blueprints: Blueprint[] = BLUEPRINT_LIBRARY,
): Array<{ name: string; roi: number; cost: number; type: string }> {
  const blueprintScores = convertBlueprintLibraryToScores(blueprints);
  const setUpgradeInfos: Array<{ name: string; roi: number; cost: number; type: string }> = [];
  BLUEPRINT_SETS.forEach((set: BlueprintSet) => {
    const setBlueprints = getBlueprintsInSet(set.setName);
    const setScore = getSetBlueprintScore(setBlueprints, blueprintScores);
    const distanceInfo = getDistanceToNextRank(set, setScore);
    const upgradeInfo: SetUpgradeInfo | null = upgradeSetToNextRank(set, blueprints);
    if (upgradeInfo !== null) {
      const roi = distanceInfo.improvement / upgradeInfo.cost;
      // console.log(
      //   `upgrading ${set.setName} has an ROI of ${roi} and would cost ${upgradeInfo.cost}. it affects ${
      //     SetMultiplierType[set.multiplierType]
      //   }`,
      // );
      // console.log(`aaa${set.setName};${roi};${upgradeInfo.cost};${SetMultiplierType[set.multiplierType]}`);
      setUpgradeInfos.push({
        name: set.setName,
        roi,
        cost: upgradeInfo.cost,
        type: SetMultiplierType[set.multiplierType],
      });
    } else {
      console.log(`${set.setName} cannot be upgraded.`);
    }
  });
  return setUpgradeInfos.sort((a, b) => b.roi - a.roi);
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
