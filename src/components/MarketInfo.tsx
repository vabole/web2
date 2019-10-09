import React from "react";
import styled from "styled-components";
import {
  HEADER,
  MarketInfoElement,
  MarketInfoType,
  VALUE
} from "./marketTypes2";

const Row = styled.div`
  //min-width: calc(var(--spacing) * 7);
  //padding: 0 calc(var(--spacing) * 1);
  //line-height: calc(var(--spacing) * 5);
  display: flex;
  flex-direction: row;
`;

const Cell = styled.div`
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
  marketInfo: MarketInfoType;
};
export const MarketInfo = (props: MarketInfoProps) => {
  const { marketInfo } = props;
  if (marketInfo.length === 0) {
    return null;
  }
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
