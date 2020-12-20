import React, { FC } from "react";
import styled from "styled-components";

export const TemplateOptions: FC = () => {
  return (
    <StyledContainer>
      <StyledButton>저장하기</StyledButton>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  ${({ theme }) => theme.layout.section};
  display: flex;
  flex-direction: row;
  text-align: right;
`;
const StyledButton = styled.button`
  padding: 10px 20px;
  background: none;
  margin-left: auto;
  border: 1px solid ${({ theme }) => theme.color.point};
`;
