import { BLUEPRINT_LIBRARY } from '../src/config/BlueprintLibrary';
import { getBestBlueprintToUpgrade, upgradeMostImpactfulSet } from '../src/optimizeUpgradingBlueprints';

describe('optimizeUpgradingBlueprints', () => {
  describe('getBestBlueprintToUpgrade', () => {
    it.skip('should do something right', () => {
      const best = getBestBlueprintToUpgrade(BLUEPRINT_LIBRARY);
      console.log(best);
      expect(best).not.toBeNull();
    });
  });

  describe('upgradeMostImpactfulSet', () => {
    it('not test', () => {
      const setUpgradeInfo = upgradeMostImpactfulSet();
      console.log(setUpgradeInfo?.upgradedBlueprints);
      console.log(setUpgradeInfo?.cost);
    });
  });
});
