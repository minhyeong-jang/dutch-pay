import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  onClick(): void;
}
export const TemplateSaveButton: FC<Props> = ({ onClick, children }) => {
  return <StyledButton onClick={() => onClick()}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  user-select: none;
  cursor: pointer;
  font-size: 14px;
  border: 0;
  background: ${({ theme }) => theme.color.githubColor};
  color: white;
  font-weight: bold;
  border-radius: 4px;
  padding: 8px 30px;
  margin-left: auto;
  margin-bottom: -11px;
`;
