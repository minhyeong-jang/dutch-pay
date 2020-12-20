import React from "react";
import { CustomTagProps } from "rc-select/lib/interface/generator";
import { Tag as AntdTag } from "antd";

export const tagColors = [
  "pink",
  "red",
  "orange",
  "cyan",
  "green",
  "blue",
  "purple",
  "geekblue",
  "magenta",
  "volcano",
  "gold",
  "lime",
  "success",
  "processing",
  "error",
  "default",
  "warning",
];

export const Tag = ({ tagColor, label, value, closable, onClose }: any) => {
  if (!tagColor.length) {
    return <></>;
  }
  return (
    <AntdTag
      color={tagColor[0].tagColor}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {value}
    </AntdTag>
  );
};
