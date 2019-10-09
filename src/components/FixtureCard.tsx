import React from "react";
import { FixtureStateObject } from "../models/types";
import styled from "styled-components";
import { defaultSportColor } from "./defaults";
import { ReactComponent as HockeyIcon } from "./icons/hockey.svg";
import { MarketInfo } from "./MarketInfo";

const StyledCard = styled.div``;

const Title = styled.div<{ color: string }>`
  line-height: calc(var(--spacing) * 6);
  min-height: calc(var(--spacing) * 6);
  background-color: rgba(255, 255, 255, 0.25);
  background: linear-gradient(90deg, #ffffff 0%, rgba(0, 0, 0, 0.5) 100%);

  color: #ffffff;
  display: flex;
  flex-direction: row;
  font-size: 26px;
  font-weight: 500;
  align-items: stretch;

  .sportWrapper {
    display: flex;
    align-items: center;
    border-radius: 0 100px 100px 0;
    background-color: ${props => props.color};

    .textWrapper {
      margin: 0;
      margin-right: calc(var(--spacing) * 6);
      margin-left: calc(var(--spacing) * 2);
    }
    .icon {
      margin: 0 calc(var(--spacing) * 2);
      height: 100%;
      min-width: 30px;
      g {
      }
    }
    .fixtureId {
      font-size: 30px;
      line-height: 35px;
      padding: 0 calc(var(--spacing) * 2);
    }
    .sportName {
      //line-height: 100%;
    }
  }
  .categoryName {
    margin-left: calc(var(--spacing) * 2);
    opacity: 0.6;
  }
`;

const Container = styled.div<{ color: string }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: calc(var(--spacing) * 1);
  margin-bottom: calc(var(--spacing) * 4);
  margin-left: calc(var(--spacing) * 6);
  padding: calc(var(--spacing) * 2);
  border: var(--border-width) solid rgba(151, 151, 151, 0.3);
  background-color: #212224;
  * {
    margin: calc(var(--spacing) * 1);
  }
`;

type FixtureProps = {
  fixture: FixtureStateObject;
};
export const FixtureCard = (props: FixtureProps) => {
  const { fixture } = props;
  return (
    <StyledCard>
      <Title color={fixture.color || defaultSportColor}>
        <div className="sportWrapper">
          <HockeyIcon className="icon" />
          <div className="textWrapper">
            <span className="fixtureId">{fixture.id}</span>
            <span className="sportName">{fixture.sportName}</span>
          </div>
        </div>
        <div className="fixtureInfo">
          <span className="categoryName">
            {fixture.categoryName} {fixture.tournamentName}
          </span>
        </div>
      </Title>
      <Container color={fixture.color || defaultSportColor}>
        {/*TODO
           Remove copy-pasted MarketContainers, when more marketTypes are handled
        */}
        <>
          {fixture.markets.map(market => (
            <MarketInfo market={market} key={market.id} />
          ))}

          {fixture.markets.map(market => (
            <MarketInfo market={market} key={market.id} />
          ))}
          {fixture.markets.map(market => (
            <MarketInfo market={market} key={market.id} />
          ))}
          {fixture.markets.map(market => (
            <MarketInfo market={market} key={market.id} />
          ))}
          {fixture.markets.map(market => (
            <MarketInfo market={market} key={market.id} />
          ))}
        </>
      </Container>
    </StyledCard>
  );
};
