import React, { FC } from 'react';
import styled from 'styled-components';

import {
  Aside,
  Footer,
  Header,
  Navibar,
} from '../../../shared/components/layout';

export const DutchPageTemplate: FC = ({ children }) => {
  return (
    <StyledTemplate>
      <Navibar />
      {/* <Header /> */}
      <StyledWrap>
        <StyledSection>{children}</StyledSection>
        <Aside />
      </StyledWrap>
      {/* <Footer /> */}
    </StyledTemplate>
  );
};

const StyledTemplate = styled.div`
  min-height: 100vh;
  display: flex;
`;
const StyledWrap = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  max-width: 1600px;
  margin: 0 auto;
`;
const StyledSection = styled.section`
  flex: 1 1 auto;
`;
