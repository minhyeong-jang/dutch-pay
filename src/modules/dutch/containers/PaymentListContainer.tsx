import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { formatNumber } from '../../../utils';
import { StepHeader } from '../components/Layout';
import { PaymentTable } from '../components/Payment';
import { initialPaymentItem, PaymentItem, UserItem } from '../hooks';

interface Props {
  userList: UserItem[];
  paymentList: PaymentItem[];
}

export const PaymentListContainer: FC<Props> = ({ userList, paymentList }) => {
  const [localPaymentList, setLocalPaymentList] = useState(paymentList);

  useEffect(() => {
    if (!localPaymentList.length) {
      setLocalPaymentList([initialPaymentItem()]);
    }
  }, []);

  const addPayment = () => {
    setLocalPaymentList([...localPaymentList, initialPaymentItem()]);
  };
  const updateTitle = (value: string, index: number) => {
    const items = [...localPaymentList];
    items[index]['title'] = value;
    setLocalPaymentList(items);
  };
  const updatePaymentPrice = (value: string, index: number) => {
    const items = [...localPaymentList];
    items[index]['paymentPrice'] = formatNumber(value);
    setLocalPaymentList(items);
  };
  const updatePayerName = (selectedUser: string, index: number) => {
    const items = [...localPaymentList];
    items[index]['payerName'] = selectedUser;
    setLocalPaymentList(items);
  };
  const updateParticipants = (value: string[], index: number) => {
    const items = [...localPaymentList];
    console.log(value);
    items[index]['participants'] = value;
    setLocalPaymentList(items);
  };

  // const updatePayment = (
  //   key: keyof PaymentItem,
  //   value: keyof typeof PaymentItem,
  //   index: number,
  // ) => {
  //   const items = [...localPaymentList];
  //   items[index][key] = value;
  //   setLocalPaymentList(items);
  // };

  return (
    <StyledSection>
      <StepHeader description="결제내역 입력" title="Step2" />
      <PaymentTable
        addPayment={addPayment}
        paymentList={localPaymentList}
        updateParticipants={updateParticipants}
        updatePayerName={updatePayerName}
        updatePaymentPrice={updatePaymentPrice}
        updateTitle={updateTitle}
        userList={userList}
      />
      {/* <StyledPaymentUl>
        {paymentList.map((payment, index) => (
          <StyledPaymentLi key={index}>
            <StyledPaymentTitle>{payment.title}</StyledPaymentTitle>
            <StyledPaymentPayerName>{payment.payerName}</StyledPaymentPayerName>
            <StyledPaymentPrice>
              {payment.paymentPrice.toLocaleString()}원
            </StyledPaymentPrice>
            <StyledPaymentParticipants>
              <Select
                mode='multiple'
                showArrow
                tagRender={tagRender}
                value={payment.participants}
                style={{ width: "100%" }}
                options={payment.participants.map((participant, index) => ({
                  value: participant,
                  label: index,
                }))}
              />
            </StyledPaymentParticipants>
          </StyledPaymentLi>
        ))}
      </StyledPaymentUl> */}
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
