import { BLUEPRINT_LIBRARY } from '../src/config/BlueprintLibrary';
import {
  getBestBlueprintToUpgrade,
  upgradeAllBlueprintsToLoreLimit,
  upgradeMostImpactfulSet,
} from '../src/optimizeUpgradingBlueprints';

describe('optimizeUpgradingBlueprints', () => {
  describe('getBestBlueprintToUpgrade', () => {
    it.skip('should do something right', () => {
      const best = getBestBlueprintToUpgrade(BLUEPRINT_LIBRARY);
      console.log(best);
      expect(best).not.toBeNull();
    });
  });

  describe('upgradeMostImpactfulSet', () => {
    it('next rank on one set', () => {
      const setUpgradeInfo = upgradeMostImpactfulSet();
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
});
