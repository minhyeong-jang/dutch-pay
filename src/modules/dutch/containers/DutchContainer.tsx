import React, { FC, useState } from "react";
import styled from "styled-components";
import { TemplateHeader, TemplateOptions } from "../components/Layout";
import { usePaymentList, useUserList } from "../hooks";
import { PaymentListContainer } from "./PaymentListContainer";
import { UserListContainer } from "./UserListContainer";

export const DutchContainer: FC = () => {
  const { userList, addUser, removeUser } = useUserList();
  const {
    paymentList,
    addPayment,
    removePayment,
    editPayment,
  } = usePaymentList();

  return (
    <StyledContainer>
      <TemplateOptions />
      <UserListContainer
        userList={userList}
        removeUser={removeUser}
        addUser={addUser}
      />
      <PaymentListContainer paymentList={paymentList} />
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
