import { Tag } from 'antd';
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import { SendList } from '../../../../types';

interface Props {
  sendList: SendList;
  payer: string;
  color: string;
  isHide: boolean;
}
export const ManagerGetPriceItem: FC<Props> = ({
  sendList,
  color,
  isHide,
  payer,
}) => {
  if (isHide) return null;
  const tossTotal = useMemo(() => {
    return Object.keys(sendList).reduce(
      (sum, key) => sum + Math.floor(sendList[key] || 0),
      0,
    );
  }, [sendList]);

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
