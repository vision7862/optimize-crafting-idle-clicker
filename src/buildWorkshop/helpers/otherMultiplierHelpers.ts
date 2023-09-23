import memoize from 'fast-memoize';
import { SetMultiplierType } from '../../upgradeBlueprints/constants/BlueprintSets';
import { getSpecifiedMultiplierFromLibrary } from '../../upgradeBlueprints/helpers/blueprintScoreHelpers';
import GAME_STATUS from '../config/GameStatus.json';
import { MWS_MONEY_ACHIEVE_OFFLINE_MULTIPLIER } from '../constants/Achievements';
import { GameStatus } from '../types/GameStatus';
import { PromoEvent } from '../types/PromoEvent';
import { MainWorkshopStatus, WorkshopStatus } from '../types/Workshop';
import { isEvent } from './WorkshopHelpers';
import { getCurrentEventPassMultipliers } from './eventPassHelpers';

export function getOreOutputMultiplier(isEvent: boolean): number {
  return isEvent
    ? 1
    : getSpecifiedMultiplierFromLibrary(SetMultiplierType.Ore) * getGameStatus().dynastyMultipliers.ore;
}

export function getClickOutputMultiplier(workshopStatus: WorkshopStatus): number {
  return (
    (workshopStatus.clickBoostActive ? getGameStatus().boostMultipliers.click : 1) *
    (isEvent(workshopStatus)
      ? 1
      : getSpecifiedMultiplierFromLibrary(SetMultiplierType.ClickOutput) *
        (workshopStatus.currentPromo === PromoEvent.Click
          ? getGameStatus().premiumBonuses.click + 1
          : getGameStatus().premiumBonuses.click))
  );
}

export function getOfflineMultiplier(workshopStatus: WorkshopStatus): number {
  return isEvent(workshopStatus)
    ? 100 * getCurrentEventPassMultipliers(workshopStatus.eventPass).offlineMultiplier
    : 40 *
        MWS_MONEY_ACHIEVE_OFFLINE_MULTIPLIER *
        getSpecifiedMultiplierFromLibrary(SetMultiplierType.OfflineProduction) *
        getGameStatus().premiumBonuses.income;
}

export function getSpeedMultiplier(workshopStatus: WorkshopStatus): number {
  return (
    (workshopStatus.speedBoostActive ? 2 : 1) *
    (isEvent(workshopStatus)
      ? getCurrentEventPassMultipliers(workshopStatus.eventPass).speedMultiplier
      : workshopStatus.currentPromo === PromoEvent.Speed
      ? getGameStatus().premiumBonuses.speed + 1
      : getGameStatus().premiumBonuses.speed)
  );
}

export function getLPP(workshopStatus: MainWorkshopStatus): number {
  return (
    getGameStatus().lpp +
    (workshopStatus.currentPromo === PromoEvent.LPP
      ? getGameStatus().premiumBonuses.LPP + 10
      : getGameStatus().premiumBonuses.LPP)
  );
}

export const getGameStatus = memoize((): GameStatus => {
  if (![2, 3, 5, 10].includes(GAME_STATUS.boostMultipliers.click))
    throw new Error(
      `error with click boost multiplier: ${String(GAME_STATUS.boostMultipliers.click)} must be 2, 3, 5, or 10.`,
    );
  if (![4, 6, 10, 20].includes(GAME_STATUS.boostMultipliers.research))
    throw new Error(
      `error with research boost multiplier: ${String(GAME_STATUS.boostMultipliers.research)} must be 4, 6, 10, or 20.`,
    );
  if (![2, 3, 5, 10].includes(GAME_STATUS.boostMultipliers.merchant))
    throw new Error(
      `error with merchant boost multiplier: ${String(GAME_STATUS.boostMultipliers.merchant)} must be 2, 3, 5, or 10.`,
    );

  if (![2, 4, 6, 10, 12, 30].includes(GAME_STATUS.dynastyMultipliers.income))
    throw new Error(
      `error with income dynasty friend bonus: ${String(
        GAME_STATUS.dynastyMultipliers.income,
      )} must be 2, 4, 6, 10, 12, or 30.`,
    );
  if (![2, 4, 6, 10, 12, 30].includes(GAME_STATUS.dynastyMultipliers.ore))
    throw new Error(
      `error with ore dynasty friend bonus: ${String(
        GAME_STATUS.dynastyMultipliers.ore,
      )} must be 2, 4, 6, 10, 12, or 30.`,
    );
  if (![2, 4, 6, 10, 12, 30].includes(GAME_STATUS.dynastyMultipliers.merchant))
    throw new Error(
      `error with merchant dynasty friend bonus: ${String(
        GAME_STATUS.dynastyMultipliers.merchant,
      )} must be 2, 4, 6, 10, 12, or 30.`,
    );

  if (GAME_STATUS.premiumBonuses.income < 1 || GAME_STATUS.premiumBonuses.income > 20)
    throw new Error(
      `error with income premium bonus: ${String(
        GAME_STATUS.premiumBonuses.income,
      )} must be between 1 and 20. 1 means no bonus purchased.`,
    );
  if (GAME_STATUS.premiumBonuses.merchant < 1 || GAME_STATUS.premiumBonuses.merchant > 20)
    throw new Error(
      `error with merchant premium bonus: ${String(
        GAME_STATUS.premiumBonuses.merchant,
      )} must be between 1 and 20. 1 means no bonus purchased.`,
    );
  if (GAME_STATUS.premiumBonuses.research < 1 || GAME_STATUS.premiumBonuses.merchant > 20)
    throw new Error(
      `error with merchant premium bonus: ${String(
        GAME_STATUS.premiumBonuses.merchant,
      )} must be between 1 and 20. 1 means no bonus purchased.`,
    );
  if (GAME_STATUS.premiumBonuses.click < 1 || GAME_STATUS.premiumBonuses.click > 20)
    throw new Error(
      `error with click premium bonus: ${String(
        GAME_STATUS.premiumBonuses.click,
      )} must be between 1 and 20. 1 means no bonus purchased.`,
    );
  if (GAME_STATUS.premiumBonuses.speed < 1 || GAME_STATUS.premiumBonuses.speed > 5)
    throw new Error(
      `error with speed premium bonus: ${String(
        GAME_STATUS.premiumBonuses.speed,
      )} must be between 1 and 5. 1 means no bonus purchased.`,
    );
  if (GAME_STATUS.premiumBonuses.LPP < 0 || GAME_STATUS.premiumBonuses.LPP > 190)
    throw new Error(
      `error with LPP premium bonus: ${String(
        GAME_STATUS.premiumBonuses.LPP,
      )} must be between 0 and 190. 0 means no bonus purchased.`,
    );

  return GAME_STATUS as GameStatus;
});
