import React, { FC } from 'react';
import styled from 'styled-components';

import { Navibar } from '../../../shared/components/layout';

export const DutchPageTemplate: FC = ({ children }) => {
  return (
    <StyledTemplate>
      <Navibar />
      <StyledWrap>{children}</StyledWrap>
    </StyledTemplate>
  );
};

const StyledTemplate = styled.div`
  min-height: 100vh;
  display: flex;
`;
const StyledWrap = styled.div`
  flex: 1 1 auto;
  padding: 16px 30px 20px;
  border-radius: 10px;
  border: 1px;
  overflow: hidden;
`;
