import React from "react";
import styled from "styled-components";
import {
  getMarketData2,
  HEADER,
  MarketInfoElement,
  VALUE
} from "./marketTypes";

const MarketTable = styled.table`
  color: #c8c8c8;
  font-weight: var(--font-bold);
  font-size: 22px;
`;
const MarketTR = styled.tr`
  * {
    background-color: #292a2c;
    min-width: calc(var(--spacing) * 7);
    padding: 0 calc(var(--spacing) * 1);
    line-height: calc(var(--spacing) * 5);
    margin: 1px;
  }
`;

const MarketTHead = styled.thead``;
const MarketTBody = styled.tbody``;

const MarketTH = styled.th``;
const LabelCell = styled.td`
  opacity: 0.6;
`;
const ValueCell = styled.td`
  color: #42b6f6;
`;

type MarketTableCellProps = {
  cell: MarketInfoElement;
};
const MarketTableCell = (props: MarketTableCellProps) => {
  const { cell } = props;
  switch (cell.type) {
    case "HEADER":
      return <MarketTH>{cell.label}</MarketTH>;
    case "LABEL":
      return <LabelCell>{cell.label}</LabelCell>;
    case "VALUE":
      return <ValueCell>{cell.label}</ValueCell>;
  }
};

/**
 * Компонент отображающий таблицу отдельного маркета.
 *
 * @param marketInfo - массив из элементов MarketRow
 */
type MarketInfoProps = {
  market: Safl.MarketElement;
};
export const MarketInfo = (props: MarketInfoProps) => {
  const { market } = props;
  const marketInfo = getMarketData2(market);
  if (!marketInfo || marketInfo.length === 0) return null;

  console.log(marketInfo);
  return (
    <MarketTable>
      <MarketTHead>
        {marketInfo
          .filter(row => row.type === HEADER)
          .map(row => (
            <MarketTR>
              {row.cells.map(th => (
                <MarketTableCell cell={th} />
              ))}
            </MarketTR>
          ))}
      </MarketTHead>
      <MarketTBody>
        {marketInfo
          .filter(row => row.type === VALUE)
          .map(row => (
            <MarketTR>
              {row.cells.map(tr => (
                <MarketTableCell cell={tr} />
              ))}
            </MarketTR>
          ))}
      </MarketTBody>
    </MarketTable>
  );
};
