import { EventPassName } from './EventPass';
import { Product } from './Product';
import { PromoEvent } from './PromoEvent';

export type Workshop = Readonly<{
  productsInfo: readonly Product[];
  workshopStatus: WorkshopStatus;
}>;

export type WorkshopStatus = MainWorkshopStatus | EventWorkshopStatus;

type BaseWorkshopStatus = Readonly<{
  level: number;
  scientists: number;
  clickBoostActive: boolean;
  merchantBoostActive: boolean;
  researchBoostActive: boolean;
  speedBoostActive: boolean;
}>;

export type MainWorkshopStatus = BaseWorkshopStatus &
  Readonly<{
    currentPromo: PromoEvent;
  }>;

export type EventWorkshopStatus = BaseWorkshopStatus &
  Readonly<{
    eventName: string;
    eventPass: EventPassName;
  }>;

export const DEFAULT_WORKSHOP_STATUS_MAIN: MainWorkshopStatus = {
  level: 8,
  scientists: 200,
  clickBoostActive: false,
  merchantBoostActive: false,
  researchBoostActive: false,
  speedBoostActive: false,
  currentPromo: PromoEvent.None,
};

export const DEFAULT_WORKSHOP_STATUS_EVENT: EventWorkshopStatus = {
  level: 10,
  scientists: 100,
  clickBoostActive: true,
  merchantBoostActive: true,
  researchBoostActive: true,
  speedBoostActive: false,
  eventName: 'eventName',
  eventPass: EventPassName.free,
};
