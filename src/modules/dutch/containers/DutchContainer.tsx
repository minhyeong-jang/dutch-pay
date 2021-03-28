import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { RootState } from '../../../redux';
import { updateSelectedId } from '../../../redux/template';
import { CalculateContainer } from './CalculateContainer';
import { PaymentListContainer } from './PaymentListContainer';
import { TemplateContainer } from './TemplateContainer';
import { UserListContainer } from './UserListContainer';

interface Props {
  templateId: string;
}
export const DutchContainer: FC<Props> = ({ templateId }) => {
  const template = useSelector((state: RootState) => state.template);
  const dispatch = useDispatch();
  const selectedTemplate = useMemo(() => {
    const filterTemplate = template.templateList.filter(
      (item) => item.id === templateId,
    );

    if (filterTemplate.length) {
      return filterTemplate[0];
    }
  }, [template, templateId]);

  useEffect(() => {
    dispatch(updateSelectedId({ templateId }));
  }, [templateId]);

  if (!selectedTemplate) {
    return null;
  }

  return (
    <StyledContainer>
      <TemplateContainer templateName={selectedTemplate.templateName} />
      <UserListContainer userList={selectedTemplate.userList} />
      <PaymentListContainer
        paymentList={selectedTemplate.paymentList}
        userList={selectedTemplate.userList}
      />
      <CalculateContainer
        paymentList={selectedTemplate.paymentList}
        userList={selectedTemplate.userList}
      />
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
