import React, { FC } from "react";
import styled from "styled-components";

export const TemplateHeader: FC = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
const StyledContainer = styled.div`
  margin-bottom: 50px;
  font-size: 15px;
  font-weight: bold;
`;
