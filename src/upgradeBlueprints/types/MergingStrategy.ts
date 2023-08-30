import { ProductName } from './Blueprint';

export type MergingStrategy = Readonly<{
  topStage: number;
  baseLevel: number; // typical 51, 61, 71, 81, etc
  plusLevelsPerStage: number; // usually 10, but can be 0 for "flat"
}>;

export type SetMergingStrategy = Readonly<{
  setName: string;
  mainBps: ProductName[];
  mainStrategy: MergingStrategy;
  otherBpsStrategy: MergingStrategy;
}>;
