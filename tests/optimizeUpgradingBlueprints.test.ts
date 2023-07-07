import { BLUEPRINT_LIBRARY } from '../src/config/BlueprintLibrary';
import { getBestBlueprintToUpgrade } from '../src/optimizeUpgradingBlueprints';

describe('optimizeUpgradingBlueprints', () => {
  describe('getBestBlueprintToUpgrade', () => {
    it('should do something right', () => {
      const best = getBestBlueprintToUpgrade(BLUEPRINT_LIBRARY);
      console.log(best);
      expect(best).not.toBeNull();
    });
  });
});
