import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Navibar: React.FC = () => {
  return (
    <StyledNavibar>
      <StyledFixed>
        <StyledInfo>
          <StyledPageName to="/">Dutch Pay</StyledPageName>
          <StyledAuthorName
            href="https://minhyeong-jang.github.io/"
            target="_blank"
          >
            Minhyeong Jang
          </StyledAuthorName>
        </StyledInfo>
        <StyledMenu>
          <StyledLi>
            <StyledNavLink activeClassName="active" to="/" exact>
              Hello Dutch Pay
            </StyledNavLink>
            <StyledNavLink activeClassName="active" to="/calc" exact>
              Let&#39;s Start Dutch Pay!
            </StyledNavLink>
          </StyledLi>
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
`;
const StyledAuthorName = styled.a`
  display: block;
  font-size: 14px;
  color: #aaa;
  line-height: 19px;
  font-weight: 500;
`;
const StyledMenu = styled.ul`
  margin-top: 35px;
  padding: 0px 20px;
`;
const StyledLi = styled.li``;
const StyledNavLink = styled(NavLink)`
  display: block;
  color: rgb(166, 155, 178);
  font-size: 14px;
  font-weight: 500;
  padding: 10px 0px;
  margin-bottom: 10px;
  transition: color 0.2s linear;

  &:hover {
    color: rgb(220, 220, 220);
  }
  &.active {
    color: white !important;
    font-weight: bold !important;
  }
`;