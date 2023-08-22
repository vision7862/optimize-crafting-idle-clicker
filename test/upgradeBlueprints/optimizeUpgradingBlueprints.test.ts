import { BLUEPRINT_LIBRARY } from '../../src/upgradeBlueprints/config/BlueprintLibrary';
import { SetMultiplierType } from '../../src/upgradeBlueprints/constants/BlueprintSets';
import {
  SetUpgradeInfo,
  getBpStrategy,
  mergeBlueprint,
} from '../../src/upgradeBlueprints/helpers/blueprintUpgradeHelpers';
import {
  BlueprintUpgradeInfo,
  printUpgradeInfoOfEachSet,
  upgradeAllIncomeBlueprintsToLoreLimit,
  upgradeMostImpactfulIncomeSet,
  upgradeMostImpactfulSetOfType,
} from '../../src/upgradeBlueprints/optimizeUpgradingBlueprints';
import { Blueprint } from '../../src/upgradeBlueprints/types/Blueprint';

describe('optimizeUpgradingBlueprints', () => {
  function printUpgradeInfo(setUpgradeInfo: SetUpgradeInfo | null): void {
    setUpgradeInfo?.upgradedBlueprints.forEach((bp) => {
      console.log(bp);
      console.log(getBpStrategy(bp.productName));
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
});
