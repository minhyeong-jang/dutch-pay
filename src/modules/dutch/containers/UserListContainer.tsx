import React, { FC } from "react";
import styled from "styled-components";
import { Select } from "antd";
import { Tag, tagColors } from "../../shared/components/Select";
import { UserItem, AddUser, useUserList } from "../hooks";
import { StepHeader } from "../components/Layout";

interface Props {
  userList: UserItem[];
  addUser(obj: AddUser): void;
  removeUser(userName: string): void;
}

export const UserListContainer: FC<Props> = ({
  userList,
  addUser,
  removeUser,
}) => {
  return (
    <StyledContainer>
      <StepHeader title='Step1' description='참가자 입력' />

      <Select
        mode='tags'
        placeholder='Please Select User'
        value={userList.map((user) => user.userName)}
        onChange={(value) => {
          console.log(value);
          if (value.length > userList.length) {
            addUser({
              userName: value[value.length - 1],
              tagColor: tagColors[Math.floor(Math.random() * tagColors.length)],
            });
          } else {
            const filteredUser = userList.filter(
              (user) => !value.includes(user.userName)
            );
            removeUser(filteredUser[0].userName);
          }
        }}
        tagRender={(customTag) =>
          Tag({
            ...customTag,
            tagColor: userList.filter(
              (user) => user.userName === customTag.value
            ),
          })
        }
        style={{
          width: "100%",
        }}
        // labelInValue={true}
        options={userList.map((user, index) => ({
          value: user.userName,
          label: user.userName,
        }))}
      />
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  margin: 20px 0px;
`;
