import React from "react";
import styled from "styled-components";
import { MarketInfoType } from "./marketTypes2";

const Row = styled.div`
  //min-width: calc(var(--spacing) * 7);
  //padding: 0 calc(var(--spacing) * 1);
  //line-height: calc(var(--spacing) * 5);
  display: flex;
  flex-direction: row;
`;

const Cell = styled.div`
  background-color: #292a2c;
  min-width: calc(var(--spacing) * 7);
  padding: 0 calc(var(--spacing) * 1);
  line-height: calc(var(--spacing) * 5);
  margin: 1px;
`;

const MarketInfoStyled = styled.div`
  padding: calc(var(--spacing) * 2);
  display: flex;
  flex-direction: column;
`;

type MarketInfoProps = {
  marketInfo: MarketInfoType;
};
export const MarketInfo = (props: MarketInfoProps) => {
  const { marketInfo } = props;
  return (
    <MarketInfoStyled>
      {marketInfo.map(row => (
        <Row className="row">
          {row.map(cell => (
            <Cell className="cell">{cell.label}</Cell>
          ))}
        </Row>
      ))}
    </MarketInfoStyled>
  );
};
