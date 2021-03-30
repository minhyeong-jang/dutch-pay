import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  CalculateItem,
  CalculateTossItem,
  PaymentItem,
  UserItem,
} from '../../../types';
import { PersonalCalculate, TotalPayment } from '../components/Calculate';
import { StepHeader } from '../components/Layout';

interface Props {
  userList: UserItem[];
  paymentList: PaymentItem[];
}

export const CalculateContainer: FC<Props> = ({ userList, paymentList }) => {
  const [calculateList, setCalculateList] = useState<CalculateItem>({});
  const [allTossList, setAllTossList] = useState<CalculateTossItem>({});

  useEffect(() => {
    if (!userList.length || !paymentList.length) return;

    const calculateList: CalculateItem = {};
    const sendList = userList.reduce(
      (prev, curr) => ({ ...prev, [curr.userName]: 0 }),
      {},
    );
    userList.map((user) => {
      calculateList[user.userName] = {
        paymentTotal: 0,
        sendList: { ...sendList },
      };
    });

    if (!Object.keys(calculateList).length) return;

    paymentList.map((payment) => {
      const { paymentPrice, participants, payerName } = payment;
      if (!paymentPrice || !payerName || !participants.length) return;
      const perPersonPayment = paymentPrice / participants.length;
      const payerInfo = calculateList[payerName];

      payerInfo.paymentTotal += paymentPrice;

      participants.map((partName) => {
        if (partName === payerName) return;
        const participantInfo = calculateList[partName];

        const differencePrice = payerInfo.sendList[partName] - perPersonPayment;
        if (differencePrice >= 0) {
          payerInfo.sendList[partName] = differencePrice;
        } else {
          payerInfo.sendList[partName] = 0;
          participantInfo.sendList[payerName] += -differencePrice;
        }
      });
    });
    setCalculateList(calculateList);
  }, [userList, paymentList]);

  useEffect(() => {
    const allTossList: CalculateTossItem = { totalPrice: 0 };

    userList.map((user) => {
      Object.keys(calculateList).map((payer) => {
        const floorToss = Math.floor(
          calculateList[payer].sendList[user.userName],
        );
        allTossList['totalPrice'] += floorToss;
        allTossList[user.userName] = allTossList[user.userName]
          ? allTossList[user.userName] + floorToss
          : floorToss;
      });
    });

    setAllTossList(allTossList);
  }, [calculateList]);

  return (
    <StyledSection>
      <StepHeader description="송금정보 확인" title="Step3" />
      <TotalPayment paymentList={paymentList} />
      <PersonalCalculate
        allTossList={allTossList}
        calculateList={calculateList}
        userList={userList}
      />

      {Object.keys(calculateList).map((payer, index) => {
        const { paymentTotal, sendList } = calculateList[payer];
        const tossTotal = Object.keys(sendList).reduce(
          (sum, key) => sum + Math.floor(sendList[key] || 0),
          0,
        );
        <StyledTossUl>
          {Object.keys(sendList).map((participant, index) =>
            sendList[participant] ? (
              <StyledTossLi key={index}>
                {payer} -&gt; {participant} :&nbsp;
                {Math.floor(sendList[participant]).toLocaleString()}원
              </StyledTossLi>
            ) : null,
          )}
        </StyledTossUl>;
      })}
      {Object.keys(allTossList).length > 0 ? (
        <>
          <StyledTitle>
            한 번에 처리해볼까..?
            <StyledDesc>* 한 명이 다 송금받아서 정산한다면?</StyledDesc>
          </StyledTitle>
          <StyledGiveMe>
            <StyledTossUl>
              {Object.keys(calculateList).map((payer, index) => {
                const { paymentTotal, sendList } = calculateList[payer];
                const tossTotal = Object.keys(sendList).reduce(
                  (sum, key) => sum + Math.floor(sendList[key] || 0),
                  0,
                );
                return (
                  <StyledTossLi key={index}>
                    <StyledTossPayer>{payer} :</StyledTossPayer>
                    <StyledTossPrice>
                      {tossTotal.toLocaleString()}원
                    </StyledTossPrice>
                  </StyledTossLi>
                );
              })}
              <StyledTossLi>
                <StyledTossPayer>Total :</StyledTossPayer>
                <StyledTossPrice>
                  {allTossList['totalPrice'].toLocaleString()}원
                </StyledTossPrice>
              </StyledTossLi>
            </StyledTossUl>
          </StyledGiveMe>
          <div>
            <StyledTossUl>
              {Object.keys(allTossList).map((payer, index) =>
                payer !== 'totalPrice' && allTossList[payer] !== 0 ? (
                  <StyledTossLi key={index}>
                    {payer}(이)가
                    <StyledTotalPrice>
                      {allTossList[payer].toLocaleString()}
                    </StyledTotalPrice>
                    &nbsp;원을 요청해요!
                  </StyledTossLi>
                ) : null,
              )}
            </StyledTossUl>
          </div>
        </>
      ) : null}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  ${({ theme }) => theme.layout.section};
`;
const StyledGiveMe = styled.div`
  color: #222;
  border-top: 1px solid #dedede;
  font-weight: bold;
  padding: 10px 0px;
  ul {
    margin-top: 10px;
    margin-left: 15px;
  }
`;
const StyledTitle = styled.div`
  font-size: 22px;
  color: #222;
  font-weight: bold;
`;
const StyledDesc = styled.div`
  font-size: 13px;
  color: #646464;
  margin: 10px 0px;
`;
const StyledTossUl = styled.ul`
  padding-left: 20px;
`;

const StyledTossLi = styled.li`
  margin-bottom: 5px;
  font-size: 15px;
  list-style-type: disc;
`;
const StyledTotalPrice = styled.span`
  width: 80px;
  margin-left: 5px;
  display: inline-block;
  text-align: right;
`;

const StyledTossPayer = styled.span`
  display: inline-block;
  width: 50px;
`;
const StyledTossPrice = styled.span`
  display: inline-block;
  width: 100px;
  text-align: right;
`;
