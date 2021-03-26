import React, { FC } from 'react';
import styled from 'styled-components';

export const ContentHeader: FC = ({ children, ...props }) => {
  return <StyledHeader {...props}>{children}</StyledHeader>;
};
const StyledHeader = styled.div`
  margin: 8px 0px 20px;
  font-size: 22px;
  line-height: 22px;
  font-weight: bold;
  color: rgb(74, 62, 86);
`;
