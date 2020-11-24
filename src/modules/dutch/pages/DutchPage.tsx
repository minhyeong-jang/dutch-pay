import React, { FC, useState } from "react";
import styled from "styled-components";
import { PaymentListContainer, UserListContainer } from "../containers";

export interface UserList {
  userName: string;
  paymentPrice: number;
}
export interface PaymentList {
  title: string;
  paymentPrice: string;
  userName: string;
  Participants: string[];
}
const initialUser: UserList = {
  userName: "",
  paymentPrice: 0,
};
export const DutchPage: FC = () => {
  const [userList, setUserList] = useState<UserList[]>([]);
  const [paymentList, setPaymentList] = useState<PaymentList[]>([]);

  return (
    <div>
      <UserListContainer />
      <PaymentListContainer />
    </div>
  );
};

const StyledContainer = styled.div`
  padding: 10px;
`;
