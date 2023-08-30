import { MainWorkshopProducts } from '../../../products/MainWorkshop';
import { importWorkshop } from '../../buildWorkshop/importWorkshop';
import { ImportedProduct } from '../../buildWorkshop/types/ImportedProduct';
import { ProductDetails } from '../../buildWorkshop/types/Product';
import { BPS_WITHOUT_DUPES, STRATEGIES } from '../config/Strategies';
import { BLUEPRINT_SETS, BlueprintSet } from '../constants/BlueprintSets';
import { BlueprintUpgradeInfo } from '../optimizeUpgradingBlueprints';
import { Blueprint, ProductName } from '../types/Blueprint';
import { MergingStrategy, SetMergingStrategy } from '../types/MergingStrategy';
import { getBottomOfStageBP, getScoreAtTopOfStage } from './blueprintObjectHelpers';
import {
  convertBlueprintLibraryToScores,
  getBlueprintsInSet,
  getDistanceToNextRank,
  getOnlyTopBlueprints,
  getSetBlueprintScore,
} from './blueprintScoreHelpers';

export function getCostToUpgradeBlueprint(blueprint: Blueprint, levels: number): number {
  const products: Map<string, ProductDetails> = importWorkshop(false);
  const product: ProductDetails | undefined = products.get(blueprint.productName);
  if (product === undefined) {
    console.error(`Did not find ${blueprint.productName} in products`);
    return Number.MAX_VALUE;
  }

  const actualBaseCost = Math.log10(product.buildCost) + 9;
  let upgradeCost: number = 0;
  for (let i = 0; i < levels; i++) {
    upgradeCost += Math.round(actualBaseCost * 1.08 ** (blueprint.upgradeLevel + i));
  }
  return upgradeCost;
}

export function upgradeBlueprint(blueprint: Blueprint, levels: number): BlueprintUpgradeInfo | null {
  const strategy = getBpStrategy(blueprint.productName);
  const topUpgradeLevel = getTopLevel(strategy, blueprint.evolutionStage);
  if (blueprint.upgradeLevel >= topUpgradeLevel) {
    return mergeBlueprint(blueprint);
  }

  const costOfUpgrade = getCostToUpgradeBlueprint(blueprint, levels);
  const scoreChange = blueprint.scoreChangePerLevel * levels;
  const newBlueprint: Blueprint = {
    ...blueprint,
    upgradeLevel: blueprint.upgradeLevel + levels,
    score: blueprint.score + scoreChange,
  };
  return { blueprint: newBlueprint, costOfUpgrade, scoreChange };
}

export type SetUpgradeInfo = Readonly<{
  upgradedBlueprints: Blueprint[];
  cost: number;
  allBlueprintsWithUpgradedReplacements: Blueprint[];
}>;

export function getTopLevel(strategy: MergingStrategy, evolutionStage: number): number {
  return strategy.baseLevel + (evolutionStage - 1) * strategy.plusLevelsPerStage;
}

// Assume that there are sufficient base BPs to merge all the way up
export function mergeBlueprint(blueprintToMerge: Blueprint): BlueprintUpgradeInfo | null {
  const mergeStrategy = getBpStrategy(blueprintToMerge.productName);
  if (
    BPS_WITHOUT_DUPES.includes(blueprintToMerge.productName) ||
    blueprintToMerge.evolutionStage >= mergeStrategy.topStage
  ) {
    return null;
  }
  // remove this blueprint from all blueprints
  // const blueprintsWithoutTarget = Array.from(allBlueprints);
  // const targetBlueprintIndex = blueprintsWithoutTarget.findIndex(
  //   (blueprint) =>
  //     blueprint.productName === blueprintToUpgrade.productName &&
  //     blueprint.evolutionStage === blueprintToUpgrade.evolutionStage &&
  //     blueprint.upgradeLevel === blueprintToUpgrade.upgradeLevel,
  // );
  // blueprintsWithoutTarget.splice(targetBlueprintIndex, 1);
  // get cost to get a blueprint up to match this one
  //  find next-closest bp
  // const blueprintsMatchingStage = blueprintsWithoutTarget.filter((blueprint: Blueprint) => {
  //   return (
  //     blueprint.productName === blueprintToUpgrade.productName &&
  //     blueprint.evolutionStage === blueprintToUpgrade.evolutionStage
  //   );
  // });

  // if (blueprintsMatchingStage.length > 0) {
  //   blueprintsMatchingStage.sort((a, b) => a.upgradeLevel - b.upgradeLevel);
  //   const blueprintToUpgradeToMatch = blueprintsMatchingStage[0];
  // const topUpgradeLevel = 51 + (blueprintToUpgrade.evolutionStage - 1) * 10;
  // const numLevelsToUpgrade = topUpgradeLevel - blueprintToUpgradeToMatch.upgradeLevel;
  //   const BlueprintUpgradeInfo = upgradeBlueprint(blueprintToUpgradeToMatch, numLevelsToUpgrade);
  // }

  let costOfUpgrade = 0;
  const baseNumLevelsToUpgrade = mergeStrategy.baseLevel - 1;
  // get cost of getting a matching bp, assuming only the top one has any levels in it
  for (let stage = 1; stage <= blueprintToMerge.evolutionStage; stage++) {
    costOfUpgrade += getCostToGetExponentialNumOfBPAtStage(
      stage,
      mergeStrategy,
      blueprintToMerge,
      baseNumLevelsToUpgrade,
    );
  }

  // make new blueprint with evolution increased, score * 2, and reset level to 1
  let blueprintReadyToMerge = blueprintToMerge;
  const topUpgradeLevel = getTopLevel(mergeStrategy, blueprintToMerge.evolutionStage);
  if (blueprintToMerge.upgradeLevel < topUpgradeLevel) {
    const upgradeBlueprintToMergeToTopOfStage = upgradeBlueprint(
      blueprintToMerge,
      topUpgradeLevel - blueprintToMerge.upgradeLevel,
    );
    if (upgradeBlueprintToMergeToTopOfStage === null) {
      throw new Error(`something has gone wrong merging ${blueprintToMerge.productName}`);
    }
    costOfUpgrade += upgradeBlueprintToMergeToTopOfStage.costOfUpgrade;
    blueprintReadyToMerge = upgradeBlueprintToMergeToTopOfStage.blueprint;
  }
  const topOfOrigStage = getScoreAtTopOfStage(blueprintToMerge.evolutionStage, mergeStrategy);
  const newScore = topOfOrigStage + blueprintReadyToMerge.score;
  const mergedBlueprint: Blueprint = {
    ...blueprintToMerge,
    evolutionStage: blueprintToMerge.evolutionStage + 1,
    score: newScore,
    scoreChangePerLevel: newScore / 10,
    upgradeLevel: 1,
  };

  return {
    blueprint: mergedBlueprint,
    costOfUpgrade,
    scoreChange: topOfOrigStage + Math.max(blueprintReadyToMerge.upgradeLevel - blueprintToMerge.upgradeLevel, 0),
  };
}

export function getBpStrategy(
  productName: ProductName,
  blueprintSets: BlueprintSet[] = BLUEPRINT_SETS,
  strategies: SetMergingStrategy[] = STRATEGIES,
  products: readonly ImportedProduct[] = MainWorkshopProducts,
): MergingStrategy {
  let highestStrategy: MergingStrategy = {
    topStage: 1,
    baseLevel: 1,
    plusLevelsPerStage: 0,
  };
  const setThisBpIsIn: string[] = blueprintSets
    .filter((set: BlueprintSet) => {
      return getBlueprintsInSet(set.setName, products).includes(productName);
    })
    .map((set) => set.setName);
  strategies
    .filter((strategy) => setThisBpIsIn.includes(strategy.setName))
    .forEach((strategy) => {
      if (strategy.mainBps.includes(productName) && strategy.mainStrategy.topStage > highestStrategy.topStage) {
        highestStrategy = strategy.mainStrategy;
      } else if (strategy.otherBpsStrategy.topStage > highestStrategy.topStage) {
        highestStrategy = strategy.otherBpsStrategy;
      }
    });
  return highestStrategy;
}

function getCostToGetExponentialNumOfBPAtStage(
  stage: number,
  strategyForThisBP: MergingStrategy,
  blueprintToMerge: Blueprint,
  baseNumLevelsToUpgrade: number,
): number {
  return (
    getCostToUpgradeBlueprint(
      { ...getBottomOfStageBP(stage, strategyForThisBP), productName: blueprintToMerge.productName },
      baseNumLevelsToUpgrade + 10 * (stage - 1),
    ) *
    2 ** (blueprintToMerge.evolutionStage - stage)
  );
}

export function upgradeSetToNextRank(set: BlueprintSet, blueprints: Blueprint[]): SetUpgradeInfo | null {
  let totalScoreIncreased = 0;
  let totalCost = 0;
  const blueprintsWithUpgradedReplacements = Array.from(blueprints);
  const upgradedBlueprints: Blueprint[] = [];
  const blueprintScores = convertBlueprintLibraryToScores(blueprints);
  const setBlueprints = getBlueprintsInSet(set.setName);
  const startingSetScore = getSetBlueprintScore(setBlueprints, blueprintScores);
  const distanceToNextRank = getDistanceToNextRank(set, startingSetScore).distance;
  if (distanceToNextRank === Number.MAX_VALUE) {
    return null;
  }
  while (totalScoreIncreased < distanceToNextRank) {
    const relevantSetBlueprints = getOnlyTopBlueprints(blueprintsWithUpgradedReplacements).filter(
      (blueprint: Blueprint) => setBlueprints.includes(blueprint.productName),
    );
    if (relevantSetBlueprints.length === 0) {
      return null;
    }
    const bestUpgrade = upgradeMostImpactfulBlueprintInSet(relevantSetBlueprints);
    if (bestUpgrade === null) {
      return null;
    }
    totalCost += bestUpgrade.costOfUpgrade;
    replaceBlueprintInPlace(blueprintsWithUpgradedReplacements, bestUpgrade.blueprint);
    replaceBlueprintInPlace(upgradedBlueprints, bestUpgrade.blueprint);
    const newSetScore = getSetBlueprintScore(
      setBlueprints,
      convertBlueprintLibraryToScores(blueprintsWithUpgradedReplacements),
    );
    totalScoreIncreased = newSetScore - startingSetScore;
  }

  return {
    allBlueprintsWithUpgradedReplacements: blueprintsWithUpgradedReplacements,
    cost: totalCost,
    upgradedBlueprints: upgradedBlueprints.sort((a, b) => a.score - b.score),
  };
}

function replaceBlueprintInPlace(blueprints: Blueprint[], newBlueprint: Blueprint): void {
  const existingBlueprintUpgradedIndex = blueprints.findIndex(
    (existingBlueprint) => existingBlueprint.productName === newBlueprint.productName,
  );
  blueprints.splice(existingBlueprintUpgradedIndex, existingBlueprintUpgradedIndex >= 0 ? 1 : 0, newBlueprint);
}

function upgradeMostImpactfulBlueprintInSet(relevantSetBlueprints: Blueprint[]): BlueprintUpgradeInfo | null {
  let bestROI = 0;
  let bestUpgrade: BlueprintUpgradeInfo | null = null;
  relevantSetBlueprints.forEach((blueprint: Blueprint) => {
    const upgradeInfo = upgradeBlueprint(blueprint, 10);
    if (upgradeInfo !== null) {
      const roi = upgradeInfo.scoreChange / upgradeInfo.costOfUpgrade;
      if (roi > bestROI) {
        bestROI = roi;
        bestUpgrade = upgradeInfo;
      }
    }
  });
  return bestUpgrade;
}
