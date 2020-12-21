import { Select } from 'antd';
import { CustomTagProps } from 'rc-select/lib/interface/generator';
import React, { FC } from 'react';
import styled from 'styled-components';

import { Tag, tagColors } from '../../shared/components/Select';
import { StepHeader } from '../components/Layout';
import { AddUser, UserItem, useUserList } from '../hooks';

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
  const getTagColor = (customTag: CustomTagProps) => {
    const filteredUser = userList.filter(
      (user) => user.userName === customTag.value,
    );
    if (filteredUser.length) {
      return filteredUser[0].tagColor;
    }
    return null;
  };

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
      <Select
        mode="tags"
        options={userList.map((user) => ({
          label: user.userName,
          value: user.userName,
        }))}
        placeholder="Please Input User"
        tagRender={(customTag) =>
          Tag({
            ...customTag,
            tagColor: getTagColor(customTag),
          })
        }
        value={userList.map((user) => user.userName)}
        onChange={changeSelect}
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
