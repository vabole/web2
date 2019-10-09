import { Header, Label, SelectionType } from "./index";

export const converter = (
  label: string,
  type: "label" | "header" | "selection"
) => {
  const rv = {
    label,
    type
  };
  switch (type) {
    case "header":
      return rv as Header;
    case "label":
      return rv as Label;
    case "selection":
      return rv as SelectionType;
    default:
      throw new Error(`invalid type  ${type}`);
  }
};
