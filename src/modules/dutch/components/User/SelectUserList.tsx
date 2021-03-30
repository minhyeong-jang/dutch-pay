import { Select } from 'antd';
import React, { FC } from 'react';

import { UserItem } from '../../../../types';
import { getTagColor } from '../../../../utils';
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
          tagColor: getTagColor(userList, customTag?.value as string),
        })
      }
      value={value}
      onChange={changeSelect}
    />
  );
};
