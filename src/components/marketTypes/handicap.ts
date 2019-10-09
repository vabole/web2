import { LABEL, MarketInfoType, MarketRow, VALUE } from "./index";
import { converter, getHeaderRow } from "./converter";

const MARKET_NAME = "Handicap";
const HEADER_VALUES = ["Фора", "1", "Фора", "2"];

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

  /**
   * Отображаем постпервый и предпоследний элементы,
   * Почему именно их? Знают только авторы ТЗ.
   * */
  const selection1 = sortedSelections[1];
  const selection2 = sortedSelections[sortedSelections.length - 2];

  const headerRow = getHeaderRow(HEADER_VALUES);
  const valuesRow: MarketRow = {
    cells: labelAndSelection(selection1).concat(labelAndSelection(selection2)),
    type: VALUE
  };

  if (selection1 && selection2) {
    return [headerRow, valuesRow];
  }
  return null;
};
