import { MarketInfoType, MarketRow, VALUE } from "./index";
import { converter, getHeaderRow } from "./converter";

const MARKET_NAME = "1x2";
const HEADER_VALUES = ["1", "x", "2"];

export const get1x2 = (market: Safl.MarketElement): MarketInfoType | null => {
  console.assert(market.name === MARKET_NAME);
  const selection1 = market.selections.find(
    selection => selection.name === "Competitor1"
  );
  const selection2 = market.selections.find(
    selection => selection.name === "Competitor2"
  );
  const selectionX = market.selections.find(
    selection => selection.name === "Draw"
  );

  const headerRow = getHeaderRow(HEADER_VALUES);
  const valuesRow: MarketRow = {
    cells: [selection1, selectionX, selection2].map(selection =>
      converter(selection?.odds, VALUE)
    ),
    type: VALUE
  };

  if (selection1 && selection2 && selectionX) {
    return [headerRow, valuesRow];
  }

  return null;
};
