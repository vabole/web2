import { MarketState } from "../marketTypes";

const MARKET_NAME = "Handicap";
const extractLabel = (selection: Safl.SelectionElement): string =>
  selection.name
    .split(" ")[1]
    .trim()
    .slice(1, -1);

export const handicap = (market: Safl.MarketElement): MarketState => {
  console.assert(market.name === MARKET_NAME);
  const sortedSelections = market.selections.sort(
    (a, b) => Number(extractLabel(a)) - Number(extractLabel(b))
  );

  // Предпервый и предпоследний элементы
  const selection1 = sortedSelections[1];
  const selection2 = sortedSelections[sortedSelections.length - 2];

  if (selection1 && selection2) {
    return {
      marketType: MARKET_NAME,
      type: "selections",
      label: "Fora",
      data: [
        { label: extractLabel(selection1), content: selection1 },
        { label: extractLabel(selection2), content: selection2 }
      ]
    };
  }

  return null;
};
