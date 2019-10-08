import React from "react";
import { MarketState } from "./marketTypes";
import styled from "styled-components";

const MarketViewStyled = styled.div`
  color: #c8c8c8;
  font-weight: var(--font-bold);
  font-size: 22px;
  display: flex;
  flex-direction: row;
`;
const SelectionBox = styled.div`
  display: flex;
  flex-direction: column;

  * {
    background-color: #292a2c;
    line-height: calc(var(--spacing) * 5);
    min-width: calc(var(--spacing) * 7);
    padding: 0 calc(var(--spacing) * 1);
    margin: 1px;
  }
  .odds {
    color: #42b6f6;
  }
`;

type MarketDataProps = {
  data: MarketState;
};
export const MarketView = (props: MarketDataProps) => {
  const { data } = props;
  if (!data) return null;

  switch (data.type) {
    case "market":
      return (
        <MarketViewStyled>
          {data.label && <div className="marketHeader">{data.label}</div>}
          {data.data.map(marketDataItem => (
            <MarketView data={marketDataItem}></MarketView>
          ))}
        </MarketViewStyled>
      );
    case "selections":
      return (
        <MarketViewStyled>
          {data.label && <div className="marketHeader">{data.label}</div>}

          {data.data.map(selectionItem => (
            // <key={selectionItem.id}>
            <SelectionBox key={selectionItem.content.id}>
              {selectionItem.label && (
                <div className="selectionLabel">{selectionItem.label}</div>
              )}
              <div className="odds">{selectionItem.content.odds}</div>
            </SelectionBox>
          ))}
        </MarketViewStyled>
      );
    default:
      return null;
  }
};
