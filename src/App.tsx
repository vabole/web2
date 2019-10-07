import React from "react";
import { TopBar } from "./components/TopBar";
import { initialState } from "./models/initialState";
import { Fixture } from "./components/Fixture";
import { FixtureStateObject, NormalizedState } from "./models/types";

const initialFixtures = (
  initialState: NormalizedState
): FixtureStateObject[] => {
  const fixtures = initialState.entities.fixtures;
  if (!fixtures) {
    return [];
  }
  return Object.values(fixtures);
};

export const App = () => {
  const fixtures = initialFixtures(initialState);
  return (
    <div>
      {fixtures && (
        <>
          <TopBar fixtures={fixtures} />
          {fixtures.map(fixture => (
            <Fixture fixture={fixture} key={fixture.id} />
          ))}
        </>
      )}
    </div>
  );
};
