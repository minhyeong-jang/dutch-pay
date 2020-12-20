import React, { FC, useState } from "react";
import styled from "styled-components";
import { Select, Radio, Tag } from "antd";

const { Option } = Select;

const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const tagRender = (props: any) => {
  const { label, value, closable, onClose } = props;

  return (
    <Tag
      color={colors[label]}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {value}
    </Tag>
  );
};

export const UserListContainer: FC = () => {
  const [userList, setUserList] = React.useState(["a10", "c12"]);

  const handleChange = (value: any) => {
    setUserList(value);
  };

  return (
    <StyledContainer>
      <StyledHeader>Step1 참가자 입력</StyledHeader>

      <Select
        mode='tags'
        placeholder='Please select'
        defaultValue={userList}
        onChange={handleChange}
        tagRender={tagRender}
        style={{ width: "100%" }}
        options={userList.map((participant, index) => ({
          value: participant,
          label: index,
        }))}
      />
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  margin: 20px 0px;
`;
const StyledHeader = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
`;
