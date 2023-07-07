import { BLUEPRINT_LIBRARY } from './config/BlueprintLibrary';
import { SetMultiplierType } from './constants/BlueprintSets';
import { getSpecifiedMultiplierFromLibrary } from './helpers/blueprintScoreHelpers';
import { upgradeBlueprint } from './helpers/blueprintUpgradeHelpers';
import { Blueprint } from './types/Blueprint';

export function getBestBlueprintToUpgrade(): BlueprintUpgradeInfo | null {
  const startingIncomeMultiplier = getSpecifiedMultiplierFromLibrary(SetMultiplierType.Income, BLUEPRINT_LIBRARY);
  const inProgressLibrary = Array.from(BLUEPRINT_LIBRARY);

  let bestImprovement: number = 0;
  let bestUpgrade: BlueprintUpgradeInfo | null = null;
  for (let i = 0; i < BLUEPRINT_LIBRARY.length; i++) {
    const blueprintToUpgrade: Blueprint = inProgressLibrary.splice(i, 1)[0];
    const blueprintUpgradeInfo = upgradeBlueprint(blueprintToUpgrade);

    inProgressLibrary.splice(i, 0, blueprintUpgradeInfo.blueprint);
    const newIncomeMultiplier = getSpecifiedMultiplierFromLibrary(SetMultiplierType.Income, inProgressLibrary);
    const improvement = newIncomeMultiplier / startingIncomeMultiplier / blueprintUpgradeInfo.costOfUpgrade;
    if (improvement > bestImprovement) {
      bestImprovement = improvement;
      bestUpgrade = blueprintUpgradeInfo;
    }
  }

  return bestUpgrade;
}

export type BlueprintUpgradeInfo = Readonly<{
  blueprint: Blueprint;
  costOfUpgrade: number;
}>;
