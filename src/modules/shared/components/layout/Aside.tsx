import React from "react";
import styled from "styled-components";

export const Aside: React.FC = () => {
  return <StyledAside></StyledAside>;
};

const StyledAside = styled.div`
  flex: 0 0 200px;
  padding: 10px 20px;
`;
