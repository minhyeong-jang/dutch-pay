import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ContentHeaderProps {
  children: ReactNode;
}
export const ContentHeader = ({ children, ...props }: ContentHeaderProps) => {
  return <StyledHeader {...props}>{children}</StyledHeader>;
};
const StyledHeader = styled.div`
  display: flex;
  margin: 8px 0px 20px;
  font-size: 22px;
  line-height: 22px;
  font-weight: bold;
  align-items: center;
  color: rgb(74, 62, 86);
`;
