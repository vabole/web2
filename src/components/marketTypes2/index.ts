import {handicap} from "./handicap";

export const LABEL = 'LABEL';
export const HEADER = 'HEADER';
export const VALUE = 'VALUE';

export type CellTypeName =   typeof LABEL| typeof  HEADER| typeof VALUE;
export type RowTypeName = typeof VALUE| typeof HEADER;

type Base = {
  label: string;
};

export type Label = {
  type:typeof LABEL;
} & Base;

export type Header = {
  type: typeof HEADER;
} & Base;

export type SelectionType = {
  type: typeof VALUE;
} & Base;

export type MarketInfoElement = Label | Header | SelectionType;

export  type MarketRow = {
  cells: MarketInfoElement[];
  type: RowTypeName
}
export type MarketInfoType = MarketRow[];

export const markets: {
  [marketName: string]: (marketElement: Safl.MarketElement) => MarketInfoType| null;
} = {
  Handicap: handicap
};

export const getMarketData2 = (market: Safl.MarketElement): MarketInfoType | null =>
    markets[market.name]?.(market) || null;
