import React from "react";
import { FixtureBox } from "./FixtureBox";
import { FixtureStateObject } from "../models/types";

type TopBarProps = {
  fixtures: { [id: string]: FixtureStateObject };
};

export const TopBar = (props: TopBarProps) => {
  const { fixtures } = props;
  return (
    <>
      {Object.values(fixtures).map(fixture => (
        <FixtureBox
          id={fixture.id}
          color={fixture.color || "blue"}
          key={fixture.id}
        />
      ))}
    </>
  );
};
