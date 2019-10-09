import React from "react";
import { getMarketData2 } from "./marketTypes";
import { MarketInfo } from "./MarketInfo";

type MarketProps = {
  market: Safl.MarketElement;
};
export const MarketContainer = (props: MarketProps) => {
  const { market } = props;
  const marketInfo = getMarketData2(market);
  if (!marketInfo) return null;
  console.log(marketInfo);
  return <MarketInfo marketInfo={marketInfo} />;
};
