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
  return GAME_STATUS as GameStatus;
});
