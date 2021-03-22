import React from 'react';
import styled from 'styled-components';

export const Sidebar: React.FC = () => {
  return <StyledSidebar></StyledSidebar>;
};

const StyledSidebar = styled.section`
  flex: 0 0 200px;
  padding: 10px 20px;
`;
