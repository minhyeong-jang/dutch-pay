import React, { FC } from 'react';
import styled from 'styled-components';

export const AboutContainer: FC = () => {
  return (
    <StyledContainer>
      <StyledHeader>Hello Dutch Pay</StyledHeader>
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
const StyledHeader = styled.div`
  margin: 8px 0px 20px;
  font-size: 22px;
  line-height: 22px;
  font-weight: bold;
  color: rgb(74, 62, 86);
`;
