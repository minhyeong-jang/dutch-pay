import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
import { PaymentItem } from "../pages";
import { Select, Tag } from "antd";

interface Props {
  paymentList: PaymentItem[];
}
const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

function tagRender(props: any) {
  const { label, value, closable, onClose } = props;

  return (
    <Tag
      color={colors[label]}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {value}
    </Tag>
  );
}

export const PaymentListContainer: FC<Props> = ({ paymentList }) => {
  return (
    <StyledContainer>
      <StyledTitle>결제 내역</StyledTitle>
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
      </StyledPaymentUl>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  margin-bottom: 40px;
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
