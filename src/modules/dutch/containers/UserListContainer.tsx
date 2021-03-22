import React, { FC } from 'react';
import styled from 'styled-components';

import { StepHeader } from '../components/Layout';
import { SelectUserList, tagColors } from '../components/User';
import { AddUser, UserItem } from '../hooks';

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
        tagColor: tagColors[Math.floor(Math.random() * tagColors.length)],
        userName: value[value.length - 1],
      });
    } else {
      const filteredUser = userList.filter(
        (user) => !value.includes(user.userName),
      );
      removeUser(filteredUser[0].userName);
    }
  };

  return (
    <StyledSection>
      <StepHeader description="참가자 입력" title="Step1" />
      <SelectUserList
        changeSelect={changeSelect}
        placeholder="Please Select User"
        userList={userList}
        value={userList.map((user) => user.userName)}
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
