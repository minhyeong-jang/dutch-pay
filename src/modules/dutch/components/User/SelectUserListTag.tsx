import { Tag as AntdTag } from 'antd';
import { CustomTagProps } from 'rc-select/lib/interface/generator';
import React from 'react';

export const tagColors = [
  'pink',
  'red',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
  'success',
  'processing',
  'error',
  'default',
  'warning',
];

interface Props extends CustomTagProps {
  tagColor: string | null;
}
export const SelectUserListTag = ({
  tagColor,
  value,
  closable,
  onClose,
}: Props) => {
  if (!tagColor) {
    return <></>;
  }
  return (
    <AntdTag closable={closable} color={tagColor} onClose={onClose}>
      {value}
    </AntdTag>
  );
};
