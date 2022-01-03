import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  CalculateGetPriceItem,
  CalculateItem,
  UserItem,
} from '../../../../types';
import { getTagColor } from '../../../../utils';
import { SelectUser } from '../User';
import { ManagerGetPriceItem } from './ManagerGetPriceItem';

interface Props {
  userList: UserItem[];
  calculateList: CalculateItem;
  calculateGetPriceList: CalculateGetPriceItem;
}
export const ManagerSendTab: FC<Props> = ({
  userList,
  calculateList,
  calculateGetPriceList,
}) => {
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    if (userList.length) {
      if (!userList.find((item) => item.userName === selectedUser)) {
        setSelectedUser(userList[0].userName);
      }
    } else {
      setSelectedUser('');
    }
  }, [userList]);

  if (!Object.keys(calculateGetPriceList).length) {
    return null;
  }
  return (
    <StyledContainer>
      <StyledDesc>
        <b>일괄 송금이란?</b>
        <br />
        대표 한 명이 모든 송금 금액을 받아 결제자들에게 분할하는 방식입니다.
        <br />
        효율적으로 정산하여 각자 송금하는 방식보다 송금 횟수가 줄어듭니다.
      </StyledDesc>
      <StyledTitle>1. 대표자 선택</StyledTitle>
      <StyledSelectUser
        placeholder="대표자"
        userList={userList}
        value={selectedUser}
        onChange={(value) => setSelectedUser(value)}
      />
      <StyledTitle>2. 대표자에게 송금하기</StyledTitle>
      <StyledDesc>
        참가자들은 아래 금액만큼 <b>{selectedUser}</b>님에게 송금해주세요.
        <br />
        전체 송금 금액 : {calculateGetPriceList['totalPrice'].toLocaleString()}
        원
      </StyledDesc>
      <StyledSendList>
        {Object.keys(calculateList).map((payer, index) => (
          <ManagerGetPriceItem
            key={index}
            color={getTagColor(userList, payer)}
            isHide={payer === selectedUser}
            payer={payer}
            sendList={calculateList[payer].sendList}
          />
        ))}
      </StyledSendList>

      <StyledTitle>3. 결제자에게 송금하기</StyledTitle>
      <StyledSendList>
        {Object.keys(calculateGetPriceList).map((payer, index) =>
          payer !== 'totalPrice' && calculateGetPriceList[payer] !== 0 ? (
            <StyledTossLi key={index}>
              {payer}님이
              <StyledTotalPrice>
                {calculateGetPriceList[payer].toLocaleString()}
              </StyledTotalPrice>
              &nbsp;원을 요청해요!
            </StyledTossLi>
          ) : null,
        )}
      </StyledSendList>
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
const StyledDesc = styled.div`
  font-size: 14px;
  color: #646464;
  margin: 10px 0px;

  b {
    font-weight: bold;
  }
`;
const StyledTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.color.githubColor};
  font-weight: bold;
  margin: 50px 0 15px;
`;
const StyledSelectUser = styled(SelectUser)`
  width: 200px;
`;
const StyledSendList = styled.ul`
  margin: 20px 0px;
`;
const StyledTossLi = styled.li`
  margin-bottom: 5px;
  font-size: 15px;
`;
const StyledTotalPrice = styled.span`
  width: 80px;
  margin-left: 5px;
  display: inline-block;
  text-align: right;
`;
