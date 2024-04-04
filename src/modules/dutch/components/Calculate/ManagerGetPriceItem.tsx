import { Tag } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  // sendList: SendList;
  payer: string;
  color: string;
  isHide?: boolean;
  tossTotal: number;
}
export const ManagerGetPriceItem: FC<Props> = ({
  // sendList,
  color,
  isHide,
  payer,
  tossTotal,
}) => {
  if (isHide) return null;

  if (tossTotal === 0) return null;

  return (
    <StyledSendItem>
      <StyledTag color={color}>{payer}</StyledTag>
      <StyledPrice>{tossTotal.toLocaleString()}원</StyledPrice>
    </StyledSendItem>
  );
};
const StyledSendItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0px;
`;
const StyledTag = styled(Tag)`
  font-size: 15px;
  padding: 6px 20px;
  text-align: center;
  margin-right: 20px;
  min-width: 110px;
`;
const StyledPrice = styled.div`
  display: inline-block;
  min-width: 100px;
  text-align: right;
`;
