import { ProductName } from './Blueprint';

export type MergingStrategy = Readonly<{
  topStage: number;
  xPlusTen: number;
}>;

export type SetMergingStrategy = Readonly<{
  setName: string;
  mainBps: ProductName[];
  mainStrategy: MergingStrategy;
  otherBpsStrategy: MergingStrategy;
}>;
