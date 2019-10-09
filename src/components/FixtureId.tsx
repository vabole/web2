import React from "react";
import styled from "styled-components";

const StyledBox = styled.div<{ color: string; large: boolean }>`
  background-color: ${props => props.color};
  height: ${props => (props.large ? "40px" : "32px")};
  line-height: ${props => (props.large ? "40px" : "32px")};
  font-size: ${props => (props.large ? "22px" : "20px")};
  opacity: ${props => (props.large ? "1" : ".25")};  
`;

type FixtureBoxProps = {
  id: string;
  color: string;
  large: boolean;
};
export const FixtureId = (props: FixtureBoxProps) => {
  const { id, color, large } = props;
  return (
    <StyledBox color={color} large={large}>
      {id}
    </StyledBox>
  );
};
