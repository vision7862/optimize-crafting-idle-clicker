import { BLUEPRINT_LIBRARY } from './config/BlueprintLibrary';
import { SetMultiplierType } from './constants/BlueprintSets';
import { convertBlueprintLibraryToScores, getSpecifiedMultiplierFromSets } from './helpers/blueprintScoreHelpers';
import { getCostToUpgradeBlueprint } from './helpers/blueprintUpgradeHelpers';
import { Blueprint } from './types/Blueprint';

export function getBestBlueprintToUpgrade(): BlueprintUpgradeInfo | null {
  const currentScores: Map<string, number> = convertBlueprintLibraryToScores(BLUEPRINT_LIBRARY);
  const currentIncomeMultiplier = getSpecifiedMultiplierFromSets(SetMultiplierType.Income, currentScores);
  let bestImprovement: number = 0;
  let costOfBestImprovement: number = 0;
  let bestBlueprintToUpgrade: Blueprint = undefined;
  BLUEPRINT_LIBRARY.forEach((blueprint: Blueprint) => {
    cost costOfUpgrading = getCostToUpgradeBlueprint(blueprint.productName);

  });
  return { blueprint: bestBlueprintToUpgrade, costOfUpgrade: costOfBestImprovement };
}

export type BlueprintUpgradeInfo = Readonly<{
  blueprint: Blueprint;
  costOfUpgrade: number;
}>;
