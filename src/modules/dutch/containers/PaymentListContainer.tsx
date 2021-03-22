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

      <StyledPaymentUl>
        {paymentList.map((payment, index) => (
          <StyledPaymentLi key={index}>
            <StyledPaymentTitle>{payment.title}</StyledPaymentTitle>
            <StyledPaymentPayerName>{payment.payerName}</StyledPaymentPayerName>
            <StyledPaymentPrice>
              {payment.paymentPrice.toLocaleString()}원
            </StyledPaymentPrice>
            <StyledPaymentParticipants>
              <Select
                mode="multiple"
                options={payment.participants.map((participant, index) => ({
                  label: index,
                  value: participant,
                }))}
                style={{ width: '100%' }}
                // tagRender={tagRender}
                value={payment.participants}
                showArrow
              />
            </StyledPaymentParticipants>
          </StyledPaymentLi>
        ))}
      </StyledPaymentUl>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  ${({ theme }) => theme.layout.section};
`;

const StyledPaymentUl = styled.ul`
  padding: 0;
`;
const StyledPaymentLi = styled.li`
  padding: 10px 10px;
  border-bottom: 1px solid #dedede;
  list-style: none;

  &:last-child {
    border-bottom: none;
  }
`;
const StyledPaymentTitle = styled.span`
  display: inline-block;
  font-weight: bold;
  min-width: 200px;
`;
const StyledPaymentPayerName = styled.span`
  display: inline-block;
  text-align: center;
  width: 70px;
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
`;
const StyledPaymentPrice = styled.span`
  display: inline-block;
  text-align: right;
  width: 150px;
  padding: 0px 15px;
  border-right: 1px solid #dedede;
`;
const StyledPaymentParticipants = styled.span`
  display: inline-block;
  margin-left: 10px;
`;
