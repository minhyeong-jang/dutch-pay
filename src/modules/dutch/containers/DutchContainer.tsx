import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { RootState } from '../../../redux';
import {
  updateSelectedId,
  updateTemplateUserList,
} from '../../../redux/template';
import { UserItem } from '../../../types/user';
import { ContentHeader } from '../../shared/components/Content';
import { usePaymentList } from '../hooks';
import { CalculateContainer } from './CalculateContainer';
import { PaymentListContainer } from './PaymentListContainer';
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

  const {
    paymentList,
    addPayment,
    updateParticipants,
    updatePayerName,
    updatePaymentPrice,
    updateTitle,
    setPaymentList,
  } = usePaymentList();

  useEffect(() => {
    dispatch(updateSelectedId({ templateId }));
  }, [templateId]);

  if (!selectedTemplate) {
    return null;
  }

  const createUser = (userItem: UserItem) => {
    dispatch(
      updateTemplateUserList({
        userList: [...selectedTemplate.userList, userItem],
      }),
    );
  };
  const removeUser = (userName: string) => {
    const filterList = selectedTemplate.userList.filter(
      (user) => user.userName !== userName,
    );
    dispatch(
      updateTemplateUserList({
        userList: filterList,
      }),
    );
  };

  // useEffect(() => {
  //   const filterTemplate = template.templateList.filter(
  //     (item) => item.id === templateId,
  //   );
  //   if (filterTemplate.length) {
  //     setPaymentList(filterTemplate[0].paymentList);
  //     setUserList(filterTemplate[0].userList);
  //   }
  // }, [templateId]);

  // useEffect(() => {
  //   dispatch(
  //     updateTemplateList({
  //       id: templateId,
  //       paymentList,
  //       templateName,
  //       userList,
  //     }),
  //   );
  // }, [userList, paymentList]);

  console.log('selected : ', selectedTemplate);
  return (
    <StyledContainer>
      <ContentHeader>{selectedTemplate.templateName}</ContentHeader>
      <UserListContainer
        addUser={createUser}
        removeUser={removeUser}
        userList={selectedTemplate.userList}
      />
      <PaymentListContainer
        addPayment={addPayment}
        paymentList={paymentList}
        updateParticipants={updateParticipants}
        updatePayerName={updatePayerName}
        updatePaymentPrice={updatePaymentPrice}
        updateTitle={updateTitle}
        userList={selectedTemplate.userList}
      />
      <CalculateContainer
        paymentList={paymentList}
        userList={selectedTemplate.userList}
      />
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
