import { SetMultiplierType } from '../../src/upgradeBlueprints/constants/BlueprintSets';
import {
  printUpgradeInfoOfEachSet,
  upgradeAllIncomeBlueprintsToLoreLimit,
  upgradeMostImpactfulIncomeSet,
  upgradeMostImpactfulSetOfType,
} from '../../src/upgradeBlueprints/optimizeUpgradingBlueprints';

describe('optimizeUpgradingBlueprints', () => {
  describe('upgradeMostImpactfulIncomeSet', () => {
    it('next rank on one income/merchant set', () => {
      const setUpgradeInfo = upgradeMostImpactfulIncomeSet();
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });
  });

  describe('upgradeMostImpactfulSetOfType', () => {
    it('ore', () => {
      const setUpgradeInfo = upgradeMostImpactfulSetOfType(SetMultiplierType.Ore);
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });

    it('research', () => {
      const setUpgradeInfo = upgradeMostImpactfulSetOfType(SetMultiplierType.Research);
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });

    it('gems', () => {
      const setUpgradeInfo = upgradeMostImpactfulSetOfType(SetMultiplierType.FreeGems);
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });

    it('offline', () => {
      const setUpgradeInfo = upgradeMostImpactfulSetOfType(SetMultiplierType.OfflineProduction);
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });

    it('click', () => {
      const setUpgradeInfo = upgradeMostImpactfulSetOfType(SetMultiplierType.ClickOutput);
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });
  });

  describe('upgradeAllBlueprintsToLoreLimit', () => {
    it('next rank on as many income/merchant sets as possible', () => {
      const setUpgradeInfo = upgradeAllIncomeBlueprintsToLoreLimit(50000);
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });
  });

  describe('printUpgradeInfoOfEachSet', () => {
    it('prints it', () => {
      console.log(printUpgradeInfoOfEachSet());
    });
  });
});
