import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  onClick(): void;
}
export const TemplateAddButton: FC<Props> = ({ onClick }) => {
  return (
    <StyledLi>
      <StyledButton onClick={() => onClick()}>+ Add Template</StyledButton>
    </StyledLi>
  );
};
const StyledLi = styled.li`
  padding-left: 12px;
`;
const StyledButton = styled.button`
  width: 100%;
  background: none;
  border: 1px solid #dedede;
  color: white;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  display: block;
  text-align: center;
`;
