import React, { FC } from 'react';
import styled from 'styled-components';

export const TemplateList: FC = () => {
  return (
    <StyledUl>
      <StyledLi>
        <a href="#">템플릿 1</a>
      </StyledLi>
      <StyledLi>
        <a href="#">템플릿 2</a>
      </StyledLi>
      <StyledLi>
        <a href="#">템플릿 3</a>
      </StyledLi>
      <StyledLi>
        <a href="#">템플릿 4</a>
      </StyledLi>
    </StyledUl>
  );
};
const StyledUl = styled.ul``;
const StyledLi = styled.li`
  display: block;
  padding: 10px;
`;
