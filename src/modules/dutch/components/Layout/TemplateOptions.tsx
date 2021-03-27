import React, { FC } from 'react';
import styled from 'styled-components';

import { ContentHeader } from '../../../shared/components/Content';

export const TemplateOptions: FC = () => {
  return (
    <ContentHeader>
      Template Name
      <StyledButton>저장하기</StyledButton>
    </ContentHeader>
  );
};
const StyledButton = styled.button`
  padding: 10px 20px;
  background: none;
  margin-left: auto;
  border: 1px solid ${({ theme }) => theme.color.point};
`;
