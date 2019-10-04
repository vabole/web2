import React from "react";
import { TopBar } from "./components/TopBar";
import { initialState } from "./models/initialState";

const fixtures = initialState.entities.fixtures;
export const App = () => {
  return <div>{fixtures && <TopBar fixtures={fixtures} />}</div>;
};
