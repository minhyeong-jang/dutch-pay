import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { updateTemplateUserList } from '../../../redux/template';
import { UserItem } from '../../../types/user';
import { StepHeader } from '../components/Layout';
import { SelectUserList, tagColors } from '../components/User';

interface Props {
  userList: UserItem[];
}

export const UserListContainer: FC<Props> = ({ userList }) => {
  const dispatch = useDispatch();

  const createUser = (userItem: UserItem) => {
    dispatch(
      updateTemplateUserList({
        userList: [...userList, userItem],
      }),
    );
  };
  const removeUser = (userName: string) => {
    const filterList = userList.filter((user) => user.userName !== userName);
    dispatch(
      updateTemplateUserList({
        userList: filterList,
      }),
    );
  };
  const changeSelect = (value: string[]) => {
    if (value.length > userList.length) {
      createUser({
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
        placeholder="참가자 입력 & 선택"
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
      min-height: 54px;
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
