import { PromoEvent } from '../types/PromoEvent';

export const CLICK_BOOST_MULTIPLIER: 2 | 3 | 5 | 10 = 5;
export const RESEARCH_BOOST_MULTIPLIER: 4 | 6 | 10 | 20 = 20;
export const MERCHANT_BOOST_MULTIPLIER: 2 | 3 | 5 | 10 = 10;

// TODO: GH-8: handle dynasty bonuses better
export const DAILY_DYNASTY_FRIEND_BONUS_INCOME: 2 | 4 | 6 | 10 | 12 | 30 = 30;
export const DAILY_DYNASTY_FRIEND_BONUS_ORE: 2 | 4 | 6 | 10 | 12 | 30 = 30;
export const DAILY_DYNASTY_FRIEND_BONUS_MERCHANT: 2 | 4 | 6 | 10 | 12 | 30 = 30;

const CURRENT_PROMO: PromoEvent = PromoEvent.None;

// during events, regular income is affected but offline is not. income&offline is the permanent, the other is only during 24hr events
export const PROMOTION_BONUS_INCOME_AND_OFFLINE = 1;
export const PROMOTION_BONUS_INCOME = PROMOTION_BONUS_INCOME_AND_OFFLINE + CURRENT_PROMO === PromoEvent.Income ? 1 : 0;
// during events, revenue is affected but capacity is not. rev&cap is the permanent, the other is only during 24hr events
export const PROMOTION_BONUS_MERCHANT_REVENUE_AND_CAPACITY = 2;
export const PROMOTION_BONUS_MERCHANT_REVENUE =
  PROMOTION_BONUS_MERCHANT_REVENUE_AND_CAPACITY + CURRENT_PROMO === PromoEvent.Merchant ? 1 : 0;
export const PROMOTION_BONUS_RESEARCH = 2 + CURRENT_PROMO === PromoEvent.Research ? 1 : 0;
export const PROMOTION_BONUS_CLICK_OUTPUT = 1 + CURRENT_PROMO === PromoEvent.Click ? 1 : 0;
export const PROMOTION_BONUS_SPEED = Math.min(5, 5 + CURRENT_PROMO === PromoEvent.Speed ? 1 : 0);
export const PROMOTION_BONUS_LPP = 30 + CURRENT_PROMO === PromoEvent.LPP ? 1 : 0;

export const LPP = 86 + PROMOTION_BONUS_LPP;
