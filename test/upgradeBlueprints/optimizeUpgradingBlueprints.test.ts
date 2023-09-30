import { BLUEPRINT_LIBRARY } from '../../EDIT_ME/BlueprintLibrary';
import { STRATEGIES } from '../../src/upgradeBlueprints/config/Strategies';
import { SetMultiplierType } from '../../src/upgradeBlueprints/constants/BlueprintSets';
import { BASE_BP, getScoreAtTopOfStage } from '../../src/upgradeBlueprints/helpers/blueprintObjectHelpers';
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
      console.log(
        printUpgradeInfoOfEachSet().filter(
          (thing) => thing.type !== SetMultiplierType[SetMultiplierType.OfflineProduction],
        ),
      );
    });
  });

  test('strategies', () => {
    const strategy = { topStage: 10, baseLevel: 101, plusLevelsPerStage: 0 };
    console.log('f101');
    console.log(`b2: score: ${getScoreAtTopOfStage(1, strategy) * 2}`);
    console.log(`t2: score: ${getScoreAtTopOfStage(2, strategy)}`);
    console.log(`b3: score: ${getScoreAtTopOfStage(2, strategy) * 2}`);
    console.log(`t3: score: ${getScoreAtTopOfStage(3, strategy)}`);
    console.log(`b4: score: ${getScoreAtTopOfStage(3, strategy) * 2}`);
    console.log(`t4: score: ${getScoreAtTopOfStage(4, strategy)}`);
    console.log(`b5: score: ${getScoreAtTopOfStage(4, strategy) * 2}`);
    console.log(`t5: score: ${getScoreAtTopOfStage(5, strategy)}`);
    console.log(`b6: score: ${getScoreAtTopOfStage(5, strategy) * 2}`);
    console.log(`t6: score: ${getScoreAtTopOfStage(6, strategy)}`);
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
      // 'Ilmenite',
      // 'Gunpowder',
      // 'Shovel',
      // 'Magnificent Bow',
      // 'Magnificent Hammer',
      // 'Magnificent Dagger',
      // 'Magnificent Crossbow',
      // 'Canvas',
      // 'Tiki Torch',
      // 'Electrical Parts',
      // 'Petroleum',
      // 'Diesel',
      // 'Gasoline',
      // 'Cloth',
      // 'Canvas',
      // 'Ilmenite',
      // 'Electro Magnet',
      // 'Titanium Chloride',
      'Chlorine',
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
