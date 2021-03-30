import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { updateTemplatePaymentList } from '../../../redux/template';
import { PaymentItem, UserItem } from '../../../types';
import { formatNumber } from '../../../utils';
import { generatePaymentItem } from '../../../utils/payment';
import { StepHeader } from '../components/Layout';
import { PaymentTable } from '../components/Payment';

interface Props {
  userList: UserItem[];
  paymentList: PaymentItem[];
}
export const PaymentListContainer: FC<Props> = ({ userList, paymentList }) => {
  const dispatch = useDispatch();

  const addPayment = () => {
    dispatch(
      updateTemplatePaymentList({
        paymentList: [...paymentList, generatePaymentItem()],
      }),
    );
  };
  const updateTitle = (value: string, index: number) => {
    const items = [...paymentList];
    items[index]['title'] = value;
    dispatch(updateTemplatePaymentList({ paymentList: items }));
  };
  const updatePaymentPrice = (value: string, index: number) => {
    const items = [...paymentList];
    items[index]['paymentPrice'] = formatNumber(value);
    dispatch(updateTemplatePaymentList({ paymentList: items }));
  };
  const updatePayerName = (selectedUser: string, index: number) => {
    const items = [...paymentList];
    items[index]['payerName'] = selectedUser;
    dispatch(updateTemplatePaymentList({ paymentList: items }));
  };
  const updateParticipants = (value: string[], index: number) => {
    const items = [...paymentList];
    items[index]['participants'] = value;
    dispatch(updateTemplatePaymentList({ paymentList: items }));
  };

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
