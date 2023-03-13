import React from 'react';
import styled from 'styled-components';

export const Footer: React.FC = () => {
  return <StyledFooter>public.doriri@gmail.com</StyledFooter>;
};

const StyledFooter = styled.footer`
  padding: 10px 20px;
  font-size: 20px;
`;
