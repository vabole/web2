import {
  CellTypeName,
  HEADER,
  Header,
  LABEL,
  Label,
  VALUE,
  SelectionType,
  MarketRow
} from "./index";

export const converter = (
  label: string | number | undefined,
  type: CellTypeName
) => {
  if (typeof label === "undefined") {
    label = "";
  }

  const rv = {
    label,
    type
  };
  switch (type) {
    case HEADER:
      return rv as Header;
    case LABEL:
      return rv as Label;
    case VALUE:
      return rv as SelectionType;
    default:
      throw new Error(`invalid type  ${type}`);
  }
};

export const getHeaderRow = (labels: string[]): MarketRow => ({
  cells: labels.map(label => converter(label, HEADER)),
  type: HEADER
});
