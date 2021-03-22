import { Select } from 'antd';
import React, { FC } from 'react';

import { UserItem } from '../../hooks';

interface Props {
  userList: UserItem[];
  value: string;
  placeholder: string;
  onChange(value: string): void;
}

const { Option } = Select;
export const SelectUser: FC<Props> = ({
  placeholder,
  value,
  userList,
  onChange,
}) => {
  return (
    <Select
      placeholder={placeholder}
      style={{ width: '100%' }}
      value={value}
      onChange={onChange}
    >
      {userList.map((user, index) => (
        <Option key={index} value={user.userName}>
          {user.userName}
        </Option>
      ))}
    </Select>
  );
};
