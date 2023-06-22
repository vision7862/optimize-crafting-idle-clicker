import { type Product } from './Product';

export type Workshop = Readonly<{
  productsInfo: readonly Product[]
  workshopStatus: WorkshopStatus
}>;

export type WorkshopStatus = MainWorkshopStatus | EventWorkshopStatus;

export type MainWorkshopStatus = Readonly<{
  level: number
  scientists: number
  clickBoostActive: boolean
  merchantBoostActive: boolean
  researchBoostActive: boolean
}>;

export type EventWorkshopStatus = MainWorkshopStatus & Readonly <{
  eventName: string
}>;

export const DEFAULT_WORKSHOP_STATUS_MAIN: WorkshopStatus = {
  level: 8,
  scientists: 200,
  clickBoostActive: false,
  merchantBoostActive: false,
  researchBoostActive: false,
};

export const DEFAULT_WORKSHOP_STATUS_EVENT: WorkshopStatus = {
  level: 10,
  scientists: 100,
  clickBoostActive: true,
  merchantBoostActive: true,
  researchBoostActive: true,
  eventName: 'eventName',
};
