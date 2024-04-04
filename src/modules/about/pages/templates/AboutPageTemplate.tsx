import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { NavibarContainer } from '../../../shared/containers';

interface AboutPageTemplateProps {
  children: ReactNode;
}
export const AboutPageTemplate = ({ children }: AboutPageTemplateProps) => {
  return (
    <StyledTemplate>
      <NavibarContainer />
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
