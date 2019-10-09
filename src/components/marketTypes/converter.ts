import {
  CellTypeName,
  HEADER,
  Header,
  LABEL,
  Label,
  VALUE,
  SelectionType
} from "./index";

export const converter = (label: string, type: CellTypeName) => {
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
