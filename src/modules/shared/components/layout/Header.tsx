import React from "react";
import styled from "styled-components";

export const Header: React.FC = () => {
  return <StyledHeader>Dutch Pay</StyledHeader>;
};

const StyledHeader = styled.header`
  padding: 15px 20px;
  font-size: 20px;
  color: white;
  background: ${({ theme }) => theme.color.point};
  /* background: #333; */
`;
