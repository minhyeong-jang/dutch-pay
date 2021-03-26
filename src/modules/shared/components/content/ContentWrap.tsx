import React, { FC } from 'react';
import styled from 'styled-components';

export const ContentWrap: FC = ({ children }) => {
  return (
    <StyledContainer>
      <StyledReponsiveContent>{children}</StyledReponsiveContent>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  background: white;
  border: 1px solid rgb(209, 202, 216);
  padding: 50px 20px;
  border-radius: 5px;
  margin: 20px 0px;

  ul {
    margin: 5px 0px 0px 40px;

    li {
      padding: 3px;
      list-style: outside;
      line-height: 1.5;
    }
  }
  b {
    font-weight: bold;
  }
  h1 {
    font-size: 2.2857rem;
    font-weight: bold;
  }
  h2 {
    font-size: 1.6429rem;
    margin: 60px 0px 20px 0px;
    padding: 5px 15px;
    border-left: 3px solid #5fad80;
    font-weight: bold;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin: 20px 0px;
    color: #131518;
    letter-spacing: -0.004em;
    word-break: keep-all;
    overflow-wrap: break-word;
  }
`;
const StyledReponsiveContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
