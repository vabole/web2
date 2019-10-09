import {handicap} from "./handicap";
import {get1x2} from "./1x2";

export const LABEL = 'LABEL';
export const HEADER = 'HEADER';
export const VALUE = 'VALUE';

export type CellTypeName =   typeof LABEL| typeof  HEADER| typeof VALUE;
export type RowTypeName = typeof VALUE| typeof HEADER;

type Base = {
  label?: string;
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
    "1x2": get1x2,
     Handicap: handicap
};

export const getMarketData2 = (market: Safl.MarketElement): MarketInfoType | null =>
    markets[market.name]?.(market) || null;
