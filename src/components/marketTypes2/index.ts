import {handicap} from "./handicap";

type Base = {
  label: string;
};

export type Label = {
  type: "label";
} & Base;

export type Header = {
  type: "header";
} & Base;

export type SelectionType = {
  type: "selection";
} & Base;

export type MarketInfoElement = Label | Header | SelectionType;
export  type MarketRow = MarketInfoElement[];
export type MarketInfoType = MarketRow[];

export const markets: {
  [marketName: string]: (marketElement: Safl.MarketElement) => MarketInfoType| null;
} = {
  Handicap: handicap
};

export const getMarketData2 = (market: Safl.MarketElement): MarketInfoType | null =>
    markets[market.name]?.(market) || null;

