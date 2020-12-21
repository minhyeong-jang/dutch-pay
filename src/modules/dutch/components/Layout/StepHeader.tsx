import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  description?: string;
}
export const StepHeader: FC<Props> = ({ title, description }) => {
  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      {description && <StyledDescription>{description}</StyledDescription>}
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
`;
const StyledTitle = styled.h3`
  display: inline-block;
  font-size: 22px;
  font-weight: bold;
`;
const StyledDescription = styled.span`
  display: inline-block;
  margin-left: 15px;
  font-size: 14px;
`;
