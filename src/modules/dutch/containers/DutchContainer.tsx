import React, { FC } from "react";
import styled from "styled-components";
import { TemplateHeader, TemplateOptions } from "../components/Layout";
import { useUserList } from "../hooks";
import { UserListContainer } from "./UserListContainer";

export const DutchContainer: FC = () => {
  const { userList, addUser, removeUser } = useUserList();

  return (
    <StyledContainer>
      <UserListContainer
        userList={userList}
        removeUser={removeUser}
        addUser={addUser}
      />
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
