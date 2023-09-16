import { SetMultiplierType } from '../../upgradeBlueprints/constants/BlueprintSets';
import { getSpecifiedMultiplierFromLibrary } from '../../upgradeBlueprints/helpers/blueprintScoreHelpers';
import {
  CLICK_BOOST_MULTIPLIER,
  DAILY_DYNASTY_FRIEND_BONUS_ORE,
  PROMOTION_BONUS_CLICK_OUTPUT,
  PROMOTION_BONUS_INCOME_AND_OFFLINE,
} from '../config/BoostMultipliers';
import { MWS_MONEY_ACHIEVE_OFFLINE_MULTIPLIER } from '../constants/Achievements';
import { WorkshopStatus } from '../types/Workshop';
import { isEvent } from './WorkshopHelpers';
import { getCurrentEventPassMultipliers } from './eventPassHelpers';

export function getOreOutputMultiplier(isEvent: boolean): number {
  return isEvent ? 1 : getSpecifiedMultiplierFromLibrary(SetMultiplierType.Ore) * DAILY_DYNASTY_FRIEND_BONUS_ORE;
}

export function getClickOutputMultiplier(workshopStatus: WorkshopStatus): number {
  return (
    (workshopStatus.clickBoostActive ? CLICK_BOOST_MULTIPLIER : 1) *
    (isEvent(workshopStatus)
      ? 1
      : getSpecifiedMultiplierFromLibrary(SetMultiplierType.ClickOutput) * PROMOTION_BONUS_CLICK_OUTPUT)
  );
}

export function getOfflineMultiplier(workshopStatus: WorkshopStatus): number {
  return isEvent(workshopStatus)
    ? 100 * getCurrentEventPassMultipliers(workshopStatus.eventPass).offlineMultiplier
    : 40 *
        MWS_MONEY_ACHIEVE_OFFLINE_MULTIPLIER *
        getSpecifiedMultiplierFromLibrary(SetMultiplierType.OfflineProduction) *
        PROMOTION_BONUS_INCOME_AND_OFFLINE;
}
