import React from "react";
import { MarketState } from "./marketTypes";

type MarketDataProps = {
  data: MarketState;
};
export const MarketView = (props: MarketDataProps) => {
  const { data } = props;
  if (!data) return null;

  switch (data.type) {
    case "market":
      return (
        <>
          {data.label && <div className="marketHeader">{data.label}</div>}
          {data.data.map(marketDataItem => (
            <MarketView data={marketDataItem}></MarketView>
          ))}
        </>
      );
    case "selections":
      return (
        <>
          {data.label && <div className="marketHeader">{data.label}</div>}

          {data.data.map(selectionItem => (
            // <key={selectionItem.id}>
            <React.Fragment key={selectionItem.content.id}>
              {selectionItem.label && (
                <div className="selectionLabel">{selectionItem.label}</div>
              )}
              <div className="odds">{selectionItem.content.odds}</div>
            </React.Fragment>
          ))}
        </>
      );
    default:
      return null;
  }
};
