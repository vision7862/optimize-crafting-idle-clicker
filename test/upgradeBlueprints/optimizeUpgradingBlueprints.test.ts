import { BLUEPRINT_LIBRARY } from '../../src/upgradeBlueprints/config/BlueprintLibrary';
import { STRATEGIES } from '../../src/upgradeBlueprints/config/Strategies';
import { SetMultiplierType } from '../../src/upgradeBlueprints/constants/BlueprintSets';
import { BASE_BP } from '../../src/upgradeBlueprints/helpers/blueprintObjectHelpers';
import {
  SetUpgradeInfo,
  getBpStrategy,
  getTopLevel,
  mergeBlueprint,
} from '../../src/upgradeBlueprints/helpers/blueprintUpgradeHelpers';
import {
  BlueprintUpgradeInfo,
  printUpgradeInfoOfEachSet,
  upgradeAllIncomeBlueprintsToLoreLimit,
  upgradeMostImpactfulIncomeSet,
  upgradeMostImpactfulSetOfType,
} from '../../src/upgradeBlueprints/optimizeUpgradingBlueprints';
import { Blueprint, ProductName } from '../../src/upgradeBlueprints/types/Blueprint';

describe('optimizeUpgradingBlueprints', () => {
  function printUpgradeInfo(setUpgradeInfo: SetUpgradeInfo | null): void {
    setUpgradeInfo?.upgradedBlueprints.forEach((bp) => {
      const originalBpStage = BLUEPRINT_LIBRARY.filter((libraryBp) => libraryBp.productName === bp.productName)[0]
        .evolutionStage;
      if (bp.evolutionStage !== originalBpStage) {
        console.log(`***${bp.productName} is merged from stage ${originalBpStage} to ${bp.evolutionStage}***`);
      }
      console.log(bp);
      console.log(getBpStrategy(bp.productName));
      console.log();
    });
    console.log(setUpgradeInfo?.cost);
  }

  describe('upgradeMostImpactfulIncomeSet', () => {
    it('next rank on one income/merchant set', () => {
      printUpgradeInfo(upgradeMostImpactfulIncomeSet());
    });
  });

  describe('upgradeMostImpactfulSetOfType', () => {
    it('ore', () => {
      printUpgradeInfo(upgradeMostImpactfulSetOfType(SetMultiplierType.Ore));
    });

    it('research', () => {
      printUpgradeInfo(upgradeMostImpactfulSetOfType(SetMultiplierType.Research));
    });

    it('gems', () => {
      printUpgradeInfo(upgradeMostImpactfulSetOfType(SetMultiplierType.FreeGems));
    });

    it('offline', () => {
      printUpgradeInfo(upgradeMostImpactfulSetOfType(SetMultiplierType.OfflineProduction));
    });

    it('click', () => {
      printUpgradeInfo(upgradeMostImpactfulSetOfType(SetMultiplierType.ClickOutput));
    });

    it('blueprint space', () => {
      printUpgradeInfo(upgradeMostImpactfulSetOfType(SetMultiplierType.BlueprintCap));
    });

    it('LPP', () => {
      printUpgradeInfo(upgradeMostImpactfulSetOfType(SetMultiplierType.LPP));
    });
  });

  describe('upgradeAllBlueprintsToLoreLimit', () => {
    it('next rank on as many income/merchant sets as possible', () => {
      printUpgradeInfo(upgradeAllIncomeBlueprintsToLoreLimit(50000));
    });
  });

  describe('printUpgradeInfoOfEachSet', () => {
    it('prints it', () => {
      console.log(printUpgradeInfoOfEachSet());
    });
  });

  test('cheapest bp to merge', () => {
    const costs: BlueprintUpgradeInfo[] = [];
    BLUEPRINT_LIBRARY.forEach((bp: Blueprint) => {
      const mergedInfo = mergeBlueprint(bp);
      if (mergedInfo !== null) costs.push(mergedInfo);
    });
    costs.sort((a, b) => a.costOfUpgrade - b.costOfUpgrade);
    costs.slice(0, 20).forEach((bp) => {
      console.log(bp);
      console.log(getBpStrategy(bp.blueprint.productName));
    });
  });

  test('merge main blueprints to next stage', () => {
    const bps: ProductName[] = [];
    STRATEGIES.forEach((strat) => bps.push(...strat.mainBps));
    const merged: BlueprintUpgradeInfo[] = [];
    BLUEPRINT_LIBRARY.filter((bp) => bps.includes(bp.productName)).forEach((bp) => {
      const mergedBp = mergeBlueprint(bp);
      if (mergedBp === null) {
        console.log(`${bp.productName} cannot be merged`);
      } else {
        merged.push(mergedBp);
      }
    });
    printMergedBps(merged);
  });

  // merging bps of a stage above 1 does not currently calculate like this wants
  test('making space: merge specified stage 1 blueprints', () => {
    const bps: ProductName[] = [
      'Ilmenite',
      'Gunpowder',
      'Shovel',
      'Magnificent Bow',
      'Magnificent Hammer',
      'Magnificent Dagger',
      'Magnificent Crossbow',
      'Canvas',
      'Tiki Torch',
    ];
    const merged: Array<BlueprintUpgradeInfo | null> = bps.map((productName) => {
      const mergedBp = mergeBlueprint({ ...BASE_BP, productName });
      if (mergedBp === null) {
        console.log(`${productName} cannot be merged`);
      }
      return mergedBp;
    });
    printMergedBps(merged);
  });
});

function printMergedBps(
  merged: Array<Readonly<{
    blueprint: Blueprint;
    costOfUpgrade: number;
    scoreChange: number;
  }> | null>,
): void {
  merged
    .sort((a, b) => (a?.costOfUpgrade ?? 0) - (b?.costOfUpgrade ?? 0))
    .forEach((mergedBp) => {
      if (mergedBp !== null) {
        const strategy = getBpStrategy(mergedBp.blueprint.productName);
        console.log(
          `bring ${mergedBp.blueprint.productName} to level ${getTopLevel(
            strategy,
            mergedBp.blueprint.evolutionStage - 1,
          )}`,
        );
        console.log(mergedBp);
        console.log(getBpStrategy(mergedBp.blueprint.productName));
      }
    });
}
