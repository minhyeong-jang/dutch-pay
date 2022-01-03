import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { TemplateItem } from '../../../../types';
import { TemplateAddButton } from './TemplateAddButton';
import { TemplateList } from './TemplateList';

interface Props {
  templateList: TemplateItem[];
  onAddTemplate(): void;
}
export const Navibar: React.FC<Props> = ({ templateList, onAddTemplate }) => {
  return (
    <StyledNavibar>
      <StyledFixed>
        <StyledInfo>
          <StyledPageName to="/">Dutch Pay</StyledPageName>
          <StyledAuthorName>온라인 더치페이 계산기</StyledAuthorName>
        </StyledInfo>
        <StyledMenu>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : '')}
              to="/"
            >
              온라인 더치페이란?
            </NavLink>
          </li>
          <li>
            <NavLink
              className={location.pathname.includes('/calc') ? 'active' : ''}
              to={`/calc/${templateList.length ? templateList[0].id : 'null'}`}
            >
              Let&#39;s Start Dutch Pay!
            </NavLink>
            <TemplateList templateList={templateList} />
          </li>
          <TemplateAddButton onClick={onAddTemplate} />
        </StyledMenu>
      </StyledFixed>
    </StyledNavibar>
  );
};

const StyledNavibar = styled.section`
  position: relative;
  flex: 0 0 220px;
  background: rgba(37, 37, 37, 1);
`;
const StyledFixed = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 220px;
`;
const StyledInfo = styled.div`
  display: block;
  padding: 20px;
`;
const StyledPageName = styled(Link)`
  display: block;
  font-weight: bold;
  font-size: 17px;
  line-height: 21px;
  color: white;
  &:hover {
    color: rgb(220, 220, 220);
  }
`;
const StyledAuthorName = styled.div`
  display: block;
  font-size: 14px;
  color: #aaa;
  line-height: 19px;
  font-weight: 500;
`;
const StyledMenu = styled.ul`
  margin-top: 35px;
  padding: 0px 20px;
  line-height: normal;

  & > li {
    margin-bottom: 10px;
  }

  ul {
    padding-left: 13px;
  }
  .active {
    color: white !important;
    font-weight: bold !important;
  }

  li {
    a {
      display: block;
      color: rgb(166, 155, 178);
      font-size: 14px;
      font-weight: 500;
      padding: 10px 0px;
      transition: color 0.2s linear;
    }

    &:hover {
      & > a {
        color: rgb(220, 220, 220);
      }
    }
  }
`;
