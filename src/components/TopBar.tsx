import React from "react";
import { FixtureBox } from "./FixtureBox";
import { FixtureStateObject } from "../models/types";
import styled from "styled-components";

const FixtureBoxesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 110%;
  > * {
    color: white;
    text-align: center;
    vertical-align: middle;
    font-weight: 500;
    font-size: 22px;
    flex-grow: 1;
    margin: 0 4px;
    width: 96px;
    height: 32px;
    line-height: 32px;
  }
`;

type TopBarProps = {
  fixtures: { [id: string]: FixtureStateObject };
};

export const TopBar = (props: TopBarProps) => {
  const { fixtures } = props;
  return (
    <FixtureBoxesContainer>
      {Object.values(fixtures).map((fixture, index) => (
        <FixtureBox
          id={fixture.id}
          color={fixture.color || "blue"}
          key={fixture.id}
          large={index < 4}
        />
      ))}
    </FixtureBoxesContainer>
  );
};
