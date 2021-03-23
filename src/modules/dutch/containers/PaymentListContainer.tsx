import { Select } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';

import { StepHeader } from '../components/Layout';
import { PaymentTable } from '../components/Payment';
import { PaymentItem, UserItem } from '../hooks';

interface Props {
  userList: UserItem[];
  paymentList: PaymentItem[];
  addPayment(): void;
  updateTitle(value: string, index: number): void;
  updatePaymentPrice(value: string, index: number): void;
  updatePayerName(selectedUser: string, index: number): void;
  updateParticipants(participants: string[], index: number): void;
}

export const PaymentListContainer: FC<Props> = ({
  userList,
  paymentList,
  addPayment,
  updateTitle,
  updatePaymentPrice,
  updatePayerName,
  updateParticipants,
}) => {
  return (
    <StyledSection>
      <StepHeader description="결제내역 입력" title="Step2" />
      <PaymentTable
        addPayment={addPayment}
        paymentList={paymentList}
        updateParticipants={updateParticipants}
        updatePayerName={updatePayerName}
        updatePaymentPrice={updatePaymentPrice}
        updateTitle={updateTitle}
        userList={userList}
      />
    </StyledSection>
  );
};

const StyledSection = styled.section`
  ${({ theme }) => theme.layout.section};
`;
