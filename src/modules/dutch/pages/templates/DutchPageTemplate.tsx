import {
  Aside,
  Header,
  Sidebar,
  Footer,
} from "../../../shared/components/layout";
import React, { FC } from "react";
import styled from "styled-components";

export const DutchPageTemplate: FC = ({ children }) => {
  return (
    <StyledTemplate>
      <Header />
      <StyledWrap>
        <Sidebar />
        <StyledSection>{children}</StyledSection>
        <Aside />
      </StyledWrap>
      <Footer />
    </StyledTemplate>
  );
};

const StyledTemplate = styled.div``;
const StyledWrap = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1600px;
  margin: 0 auto;
`;
const StyledSection = styled.section`
  flex: 1 1 auto;
`;
