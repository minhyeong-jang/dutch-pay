import { Tag } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';

import {
  CalculateGetPriceItem,
  CalculateItem,
  UserItem,
} from '../../../../types';
import { getTagColor, sumObjValue } from '../../../../utils';

interface Props {
  userList: UserItem[];
  calculateList: CalculateItem;
  calculateGetPriceList: CalculateGetPriceItem;
}
export const PersonalCalculate: FC<Props> = ({
  userList,
  calculateList,
  calculateGetPriceList,
}) => {
  return (
    <StyledContainer>
      <StyledGrid>
        <div />
        <StyledPriceWrap>
          <StyledPaymentTitle>총 경비</StyledPaymentTitle>
          <StyledPaymentTitle>결제한 금액</StyledPaymentTitle>
          <StyledPaymentTitle>송금할 금액</StyledPaymentTitle>
          <StyledPaymentTitle>받을 금액</StyledPaymentTitle>
        </StyledPriceWrap>

        {Object.keys(calculateList).map((payer, index) => (
          <React.Fragment key={index}>
            <StyledTag color={getTagColor(userList, payer)}>{payer}</StyledTag>
            <StyledPriceWrap>
              <StyledPayment>
                {(
                  calculateList[payer].paymentTotal +
                  sumObjValue(calculateList[payer].sendList) -
                  (calculateGetPriceList[payer] || 0)
                ).toLocaleString()}
                원
              </StyledPayment>
              <StyledPayment>
                {calculateList[payer].paymentTotal.toLocaleString()}원
              </StyledPayment>
              <StyledPayment>
                {sumObjValue(calculateList[payer].sendList).toLocaleString()}원
              </StyledPayment>
              <StyledPayment>
                {(calculateGetPriceList[payer] || 0).toLocaleString()}원
              </StyledPayment>
            </StyledPriceWrap>
          </React.Fragment>
        ))}
      </StyledGrid>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  margin: 30px 0px;
`;
const StyledGrid = styled.div`
  display: grid;
  gap: 10px 0;
  align-items: center;
  grid-template-columns: 1fr 4fr;
`;
const StyledPriceWrap = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
`;
const StyledTag = styled(Tag)`
  font-size: 15px;
  padding: 6px 20px;
  text-align: center;
`;
const StyledPaymentTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.color.githubColor};
`;
const StyledPayment = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.githubColor};
  text-align: center;

  &:not(:last-child) {
    border-right: 2px solid #999;
  }
`;
