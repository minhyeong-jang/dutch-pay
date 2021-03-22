import { Select } from 'antd';
import { CustomTagProps } from 'rc-select/lib/interface/generator';
import React, { FC } from 'react';

import { UserItem } from '../../hooks';
import { SelectUserListTag } from './SelectUserListTag';

interface Props {
  userList: UserItem[];
  value: string[];
  mode?: 'tags' | 'multiple';
  placeholder?: string;
  changeSelect(value: string[]): void;
}
export const SelectUserList: FC<Props> = ({
  mode = 'tags',
  value,
  userList,
  placeholder,
  changeSelect,
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

  return (
    <Select
      mode={mode}
      options={userList.map((user) => ({
        label: user.userName,
        value: user.userName,
      }))}
      placeholder={placeholder}
      style={{
        width: '100%',
      }}
      tagRender={(customTag) =>
        SelectUserListTag({
          ...customTag,
          tagColor: getTagColor(customTag),
        })
      }
      value={value}
      onChange={changeSelect}
    />
  );
};
