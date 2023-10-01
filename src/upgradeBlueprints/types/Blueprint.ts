import { MainWorkshopProducts } from '../../../products/MainWorkshop';
import { ImportedProduct } from '../../buildWorkshop/types/ImportedProduct';

type NameMap<T extends readonly ImportedProduct[]> = { [I in keyof T]: T[I]['ProductType'] };
export type ProductName = NameMap<typeof MainWorkshopProducts>[number];

export type Blueprint = Readonly<{
  productName: ProductName;
  evolutionStage: number; // TODO: nice to have: stage as string roman numeral, converted in the code
  upgradeLevel: number;
  score: number;
  scoreChangePerLevel: number; // the difference between score and upgraded score
}>;
