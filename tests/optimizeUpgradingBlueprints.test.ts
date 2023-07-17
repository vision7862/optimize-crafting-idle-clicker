import { BLUEPRINT_LIBRARY } from '../src/config/BlueprintLibrary';
import {
  printUpgradeInfoOfEachSet,
  upgradeAllBlueprintsToLoreLimit,
  upgradeMostImpactfulIncomeSet,
  upgradeMostImpactfulResearchSet,
} from '../src/optimizeUpgradingBlueprints';

describe('optimizeUpgradingBlueprints', () => {
  describe('upgradeMostImpactfulSet', () => {
    it('next rank on one set', () => {
      const setUpgradeInfo = upgradeMostImpactfulIncomeSet();
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });
  });

  describe('upgradeMostImpactfulResearchSet', () => {
    it('next rank on one set', () => {
      const setUpgradeInfo = upgradeMostImpactfulResearchSet();
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });
  });

  describe('upgradeAllBlueprintsToLoreLimit', () => {
    it('next rank on as many sets as possible', () => {
      const setUpgradeInfo = upgradeAllBlueprintsToLoreLimit(50000);
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });
  });

  describe('printUpgradeInfoOfEachSet', () => {
    it('prints it', () => {
      printUpgradeInfoOfEachSet();
    });
  });
});
