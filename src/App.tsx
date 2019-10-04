import React from "react";
import { TopBar } from "./components/TopBar";
import { initialState } from "./models/initialState";
import {Fixture} from "./components/Fixture";
import {FixtureStateObject} from "./models/types";

const fixtures  = initialState.entities.fixtures  Object.values();
export const App = () => {
  return (
    <div>
        {fixtures && (
        <>
          <TopBar fixtures={fixtures} />
          {fixtures).map((fixture) => (<Fixture fixture={fixture} key={fixture.id}/>))}
        </>
      )
    </div>
  );
};
