import { SetMultiplierType } from './constants/BlueprintSets';
import { getSpecifiedMultiplierFromLibrary } from './helpers/blueprintScoreHelpers';
import { upgradeBlueprint } from './helpers/blueprintUpgradeHelpers';
import { Blueprint } from './types/Blueprint';

export type BlueprintUpgradeInfo = Readonly<{
  blueprint: Blueprint;
  costOfUpgrade: number;
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
