import React, { FC } from "react";
import styled from "styled-components";

export const DutchContainer: FC = () => {
  return (
    <StyledContainer>
      <StyledTemplateName>Template 1</StyledTemplateName>
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
const StyledTemplateName = styled.h3`
  font-size: 15px;
`;
