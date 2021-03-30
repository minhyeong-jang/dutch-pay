import React, { FC } from 'react';
import styled from 'styled-components';

import { CalculateItem, CalculateTossItem } from '../../../../types';

interface Props {
  calculateList: CalculateItem;
  allTossList: CalculateTossItem;
}
export const PersonalCalculate: FC<Props> = ({
  calculateList,
  allTossList,
}) => {
  console.log(calculateList);
  return (
    <StyledContainer>
      <StyledTitle>참가자들은 각자 이만큼 사용했어요!</StyledTitle>
      <StyledUl>
        {Object.keys(calculateList).map((payer, index) => {
          const { paymentTotal, tossList } = calculateList[payer];
          const tossTotal = Object.keys(tossList).reduce(
            (sum, key) => sum + Math.floor(tossList[key] || 0),
            0,
          );

          return (
            <StyledLi key={index}>
              <StyledPayerInfo>
                <StyledPlayer>{payer}</StyledPlayer>
                <StyledPayment>
                  결제 금액 : {paymentTotal.toLocaleString()}원 / 송금 금액 :{' '}
                  {tossTotal.toLocaleString()}원 / 총 여행 경비 :{' '}
                  {(
                    paymentTotal +
                    tossTotal -
                    (allTossList[payer] || 0)
                  ).toLocaleString()}
                  원
                </StyledPayment>
              </StyledPayerInfo>
              {/* 
              <StyledTossUl>
                {Object.keys(tossList).map((participant, index) =>
                  tossList[participant] ? (
                    <StyledTossLi key={index}>
                      {payer} -&gt; {participant} :&nbsp;
                      {Math.floor(tossList[participant]).toLocaleString()}원
                    </StyledTossLi>
                  ) : null,
                )}
              </StyledTossUl> */}
            </StyledLi>
          );
        })}
      </StyledUl>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  margin: 20px 0px;
`;
const StyledTitle = styled.div``;
const StyledUl = styled.ul`
  padding: 0;
`;
const StyledLi = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #dedede;
  list-style: none;

  &:last-child {
    border-bottom: none;
  }
`;

const StyledPayerInfo = styled.div`
  margin-bottom: 10px;
`;
const StyledPlayer = styled.span`
  font-weight: bold;
  font-size: 17px;
`;
const StyledPayment = styled.span`
  margin-left: 5px;
  font-size: 14px;
  color: #646464;
`;
const StyledTossUl = styled.ul`
  padding-left: 20px;
`;

const StyledTossLi = styled.li`
  margin-bottom: 5px;
  font-size: 15px;
  list-style-type: disc;
`;
