import { type Product } from './Product';

export type Workshop = Readonly<{
  productsInfo: readonly Product[]
  workshopStatus: WorkshopStatus
}>;

export type WorkshopStatus = Readonly<{
  event: boolean
  level: number
  scientists: number
  clickBoostActive: boolean
  merchantBoostActive: boolean
  researchBoostActive: boolean
}>;

export const DEFAULT_WORKSHOP_STATUS_MAIN: WorkshopStatus = {
  event: false,
  level: 8,
  scientists: 200,
  clickBoostActive: false,
  merchantBoostActive: false,
  researchBoostActive: false,
};

export const DEFAULT_WORKSHOP_STATUS_EVENT: WorkshopStatus = {
  event: true,
  level: 10,
  scientists: 100,
  clickBoostActive: true,
  merchantBoostActive: true,
  researchBoostActive: true,
};
