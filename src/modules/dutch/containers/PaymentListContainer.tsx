import { Select, Tag } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { StepHeader } from '../components/Layout';
import { PaymentTable } from '../components/Payment';
import { initialPaymentItem, PaymentItem } from '../hooks';

interface Props {
  paymentList: PaymentItem[];
}

export const PaymentListContainer: FC<Props> = ({ paymentList }) => {
  const [localPaymentList, setLocalPaymentList] = useState(paymentList);

  const addPayment = () => {
    setLocalPaymentList([...localPaymentList, initialPaymentItem]);
  };
  const updatePayment = () => {};

  return (
    <StyledSection>
      <StepHeader description='결제내역 입력' title='Step2' />
      <PaymentTable addPayment={addPayment} paymentList={localPaymentList} />
      <StyledPaymentUl>
        {paymentList.map((payment, index) => (
          <StyledPaymentLi key={index}>
            <StyledPaymentTitle>{payment.title}</StyledPaymentTitle>
            <StyledPaymentPayerName>{payment.payerName}</StyledPaymentPayerName>
            <StyledPaymentPrice>
              {payment.paymentPrice.toLocaleString()}원
            </StyledPaymentPrice>
            <StyledPaymentParticipants>
              {/* <Select
                mode='multiple'
                showArrow
                tagRender={tagRender}
                value={payment.participants}
                style={{ width: "100%" }}
                options={payment.participants.map((participant, index) => ({
                  value: participant,
                  label: index,
                }))}
              /> */}
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

const StyledTitle = styled.div`
  font-size: 22px;
  color: #222;
  font-weight: bold;
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
