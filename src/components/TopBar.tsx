import React from "react";
import { FixtureStateObject } from "../models/types";
import styled from "styled-components";
import {FixtureId} from "./FixtureId";

const FixtureBoxesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

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
    border-radius: 0 0 8px 8px;
  }
`;


type TopBarProps = {
  fixtures: FixtureStateObject[];
};

export const TopBar = (props: TopBarProps) => {
  const { fixtures } = props;
  return (
    <FixtureBoxesContainer>
      {fixtures.map((fixture, index) => (
        <FixtureId
          id={fixture.id}
          color={fixture.color || "blue"}
          key={fixture.id}
          large={index < 4}
        />
      ))}
    </FixtureBoxesContainer>
  );
};
