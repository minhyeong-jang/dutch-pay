import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  selectedTab: string;
  onChange(value: string): void;
}
export const CalculateTab: FC<Props> = ({ selectedTab, onChange }) => {
  return <StyledContainer>asd</StyledContainer>;
};
const StyledContainer = styled.div``;
