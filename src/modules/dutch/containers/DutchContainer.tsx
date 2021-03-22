import React, { FC } from 'react';
import styled from 'styled-components';

import { TemplateOptions } from '../components/Layout';
import { usePaymentList, useUserList } from '../hooks';
import { CalculateContainer } from './CalculateContainer';
import { PaymentListContainer } from './PaymentListContainer';
import { UserListContainer } from './UserListContainer';

export const DutchContainer: FC = () => {
  const { userList, addUser, removeUser } = useUserList();
  const {
    paymentList,
    addPayment,
    updateParticipants,
    updatePayerName,
    updatePaymentPrice,
    updateTitle,
  } = usePaymentList();

  return (
    <StyledContainer>
      <TemplateOptions />
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
