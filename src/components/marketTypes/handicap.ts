import { HEADER, LABEL, MarketInfoType, MarketRow, VALUE } from "./index";
import { converter } from "./converter";

const MARKET_NAME = "Handicap";
const extractLabel = (selection: Safl.SelectionElement): string =>
  selection.name
    .split(" ")[1]
    .trim()
    .slice(1, -1);

const labelAndSelection = (selection: Safl.SelectionElement) => [
  converter(extractLabel(selection), LABEL),
  converter(String(selection.odds), VALUE)
];

export const handicap = (market: Safl.MarketElement): MarketInfoType | null => {
  console.assert(market.name === MARKET_NAME);
  const sortedSelections = market.selections.sort(
    (a, b) => Number(extractLabel(a)) - Number(extractLabel(b))
  );

  // Предпервый и предпоследний элементы
  const selection1 = sortedSelections[1];
  const selection2 = sortedSelections[sortedSelections.length - 2];

  const headerRow: MarketRow = {
    cells: ["Фора", "1", "Фора", "2"].map(value => converter(value, HEADER)),
    type: HEADER
  };
  const valuesRow: MarketRow = {
    cells: labelAndSelection(selection1).concat(labelAndSelection(selection2)),
    type: VALUE
  };

  if (selection1 && selection2) {
    return [headerRow, valuesRow];
  }
  return null;
};
