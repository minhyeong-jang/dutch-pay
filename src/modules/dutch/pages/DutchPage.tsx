import React, { FC, useState } from "react";
import styled from "styled-components";
import {
  CalculateContainer,
  PaymentListContainer,
  UserListContainer,
} from "../containers";

export interface UserItem {
  userName: string;
  paymentPrice: number;
  getTossList: { [key: string]: number };
}
export interface PaymentItem {
  title: string;
  paymentPrice: number;
  payerName: string;
  participants: string[];
}

export const DutchPage: FC = () => {
  const [userList, setUserList] = useState([]);
  const [paymentList, setPaymentList] = useState<PaymentItem[]>([]);

  return (
    <StyledContainer>
      <UserListContainer />
      <PaymentListContainer paymentList={paymentList} />
      <CalculateContainer userList={userList} paymentList={paymentList} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 10px;
  max-width: 1000px;
  margin: 0 auto;
`;
