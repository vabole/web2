import { MarketInfoType, MarketRow } from "./index";
import { converter } from "./converter";

const MARKET_NAME = "Handicap";
const extractLabel = (selection: Safl.SelectionElement): string =>
  selection.name
    .split(" ")[1]
    .trim()
    .slice(1, -1);

const labelAndSelection = (selection: Safl.SelectionElement) => [
  converter(extractLabel(selection), "label"),
  converter(selection.name, "selection")
];

export const handicap = (market: Safl.MarketElement): MarketInfoType | null => {
  console.assert(market.name === MARKET_NAME);
  const sortedSelections = market.selections.sort(
    (a, b) => Number(extractLabel(a)) - Number(extractLabel(b))
  );

  // Предпервый и предпоследний элементы
  const selection1 = sortedSelections[1];
  const selection2 = sortedSelections[sortedSelections.length - 2];

  const header: MarketRow = ["Фора", "1", "Фора", "2"].map(value =>
    converter(value, "header")
  );

  if (selection1 && selection2) {
    return [
      header,
      labelAndSelection(selection1).concat(labelAndSelection(selection2))
    ];
  }
  return null;
};
