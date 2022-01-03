import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../../../redux';

export const SharedContainer: FC = () => {
  const template = useSelector((state: RootState) => state.template);

  console.log(template);
  const selectedTemplate = useMemo(() => {
    const filterTemplate = template.templateList.filter(
      (item) => item.id === '94d9-bb69-80b0-0993a',
    );

    if (filterTemplate.length) {
      return filterTemplate[0];
    }
  }, [template]);

  console.log(selectedTemplate);
  if (!selectedTemplate) {
    return null;
  }

  return <StyledContainer>asdasd</StyledContainer>;
};
const StyledContainer = styled.div``;
