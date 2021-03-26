import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import { PaymentItem, usePaymentList, UserItem, useUserList } from '../hooks';
import { CalculateContainer } from './CalculateContainer';
import { PaymentListContainer } from './PaymentListContainer';
import { TemplateContainer } from './TemplateContainer';
import { UserListContainer } from './UserListContainer';

interface TemplateItem {
  templateName: string;
  userList: UserItem[];
  paymentList: PaymentItem[];
}
export const DutchContainer: FC = () => {
  const { userList, addUser, removeUser, setUserList } = useUserList();
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
    const storageTemplate = localStorage.getItem('templateList');
    if (storageTemplate) {
      const templateList = JSON.parse(storageTemplate) as TemplateItem[];

      if (templateList.length) {
        setUserList(templateList[0].userList);
        setPaymentList(templateList[0].paymentList);
      }
    }
  }, []);
  useEffect(() => {
    const templateList: TemplateItem[] = [
      {
        paymentList,
        templateName: 'Template 5',
        userList,
      },
    ];
    localStorage.setItem('templateList', JSON.stringify(templateList));
  }, [userList, paymentList]);

  return (
    <StyledContainer>
      <TemplateContainer />
      <UserListContainer
        addUser={addUser}
        removeUser={removeUser}
        userList={userList}
      />
      <PaymentListContainer
        addPayment={addPayment}
        paymentList={paymentList}
        updateParticipants={updateParticipants}
        updatePayerName={updatePayerName}
        updatePaymentPrice={updatePaymentPrice}
        updateTitle={updateTitle}
        userList={userList}
      />
      <CalculateContainer paymentList={paymentList} userList={userList} />
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
