import { Select } from 'antd';
import React, { FC } from 'react';

import { UserItem } from '../../../../types';

interface Props {
  className?: string;
  userList: UserItem[];
  value: string;
  placeholder: string;
  onChange(value: string): void;
}

const { Option } = Select;
export const SelectUser: FC<Props> = ({
  className,
  placeholder,
  value,
  userList,
  onChange,
}) => {
  return (
    <Select
      className={className}
      placeholder={placeholder}
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
