import React, { FC, useState } from "react";
import styled from "styled-components";
import {
  CalculateContainer,
  DutchContainer,
  PaymentListContainer,
  UserListContainer,
} from "../containers";
import { DutchPageTemplate } from "./templates";

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
    <DutchPageTemplate>
      <DutchContainer />
      <UserListContainer />
      <PaymentListContainer paymentList={paymentList} />
      <CalculateContainer userList={userList} paymentList={paymentList} />
    </DutchPageTemplate>
  );
};
