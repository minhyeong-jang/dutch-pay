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
  const changeSelect = (value: string[]) => {
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
  };

  return (
    <StyledSection>
      <StepHeader title='Step1' description='참가자 입력' />
      <Select
        mode='tags'
        placeholder='Please Input User'
        value={userList.map((user) => user.userName)}
        onChange={changeSelect}
        tagRender={(customTag) =>
          Tag({
            ...customTag,
            tagColor: userList.filter(
              (user) => user.userName === customTag.value
            ),
          })
        }
        options={userList.map((user) => ({
          value: user.userName,
          label: user.userName,
        }))}
      />
    </StyledSection>
  );
};
const StyledSection = styled.section`
  ${({ theme }) => theme.layout.section};
  .ant-select {
    width: 100%;
    font-size: 15px;

    .ant-select-selection-placeholder {
      left: 22px;
    }
    .ant-select-selector {
      padding: 10px 15px;
    }
    .ant-tag {
      margin-right: 6px;
      font-size: 15px;
      padding: 5px 10px;
    }
    .ant-tag-close-icon {
      font-size: 12px;
      vertical-align: middle;
      margin: -3px 0 0 9px;
    }
  }
`;
