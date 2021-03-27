import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { PaymentItem, UserItem } from '../hooks';

interface Props {
  userList: UserItem[];
  paymentList: PaymentItem[];
}
interface CalculateObj {
  [key: string]: {
    paymentTotal: number;
    tossList: {
      [key: string]: number;
    };
  };
}
interface TossObj {
  [key: string]: number;
}

export const CalculateContainer: FC<Props> = ({ userList, paymentList }) => {
  const [calculateList, setCalculateList] = useState<CalculateObj>({});
  const [allPaymentTotal, setAllPaymentTotal] = useState(0);
  const [allTossList, setAllTossList] = useState<TossObj>({});

  useEffect(() => {
    if (!userList.length || !paymentList.length) return;

    const calculateList: CalculateObj = {};
    const tossList = userList.reduce(
      (prev, curr) => ({ ...prev, [curr.userName]: 0 }),
      {},
    );
    userList.map((user) => {
      calculateList[user.userName] = {
        paymentTotal: 0,
        tossList: { ...tossList },
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

        const differencePrice = payerInfo.tossList[partName] - perPersonPayment;
        if (differencePrice >= 0) {
          payerInfo.tossList[partName] = differencePrice;
        } else {
          payerInfo.tossList[partName] = 0;
          participantInfo.tossList[payerName] += -differencePrice;
        }
      });
    });
    setCalculateList(calculateList);
  }, [userList, paymentList]);

  useEffect(() => {
    const allPaymentTotal = paymentList.reduce(
      (prev, curr) => prev + curr.paymentPrice,
      0,
    );
    setAllPaymentTotal(allPaymentTotal);
  }, [paymentList]);

  useEffect(() => {
    const allTossList: TossObj = { totalPrice: 0 };

    userList.map((user) => {
      Object.keys(calculateList).map((payer) => {
        const floorToss = Math.floor(
          calculateList[payer].tossList[user.userName],
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
      <StyledTitle>
        결제 정보&nbsp;
        <StyledPayment>
          {allPaymentTotal.toLocaleString()} / {userList.length} =&nbsp;
          {(allPaymentTotal / userList.length).toLocaleString()}원
        </StyledPayment>
      </StyledTitle>
      <StyledDesc>
        * 모든 결제를 더치페이 하지 않기 때문에 오차가 있을 수 있습니다.
      </StyledDesc>
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

              <StyledTossUl>
                {Object.keys(tossList).map((participant, index) =>
                  tossList[participant] ? (
                    <StyledTossLi key={index}>
                      {payer} -&gt; {participant} :&nbsp;
                      {Math.floor(tossList[participant]).toLocaleString()}원
                    </StyledTossLi>
                  ) : null,
                )}
              </StyledTossUl>
            </StyledLi>
          );
        })}
      </StyledUl>
      {Object.keys(allTossList).length > 0 ? (
        <>
          <StyledTitle>
            한 번에 처리해볼까..?
            <StyledDesc>* 한 명이 다 송금받아서 정산한다면?</StyledDesc>
          </StyledTitle>
          <StyledGiveMe>
            <StyledTossUl>
              {Object.keys(calculateList).map((payer, index) => {
                const { paymentTotal, tossList } = calculateList[payer];
                const tossTotal = Object.keys(tossList).reduce(
                  (sum, key) => sum + Math.floor(tossList[key] || 0),
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
const StyledDesc = styled.div`
  font-size: 13px;
  color: #646464;
  margin: 10px 0px;
`;
const StyledUl = styled.ul`
  padding: 0;
`;
const StyledLi = styled.li`
  padding: 10px 10px;
  border-bottom: 1px solid #dedede;
  list-style: none;

  &:last-child {
    border-bottom: none;
  }
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
