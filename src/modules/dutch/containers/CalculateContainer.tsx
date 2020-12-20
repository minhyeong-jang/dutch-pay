import React, { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { PaymentItem } from "../hooks";

interface Props {
  userList: string[];
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
  const [allPaymentTotal, setAllPaymentTotal] = useState(0);
  const [allTossList, setAllTossList] = useState<TossObj>({});
  const [calculateList, setCalculateList] = useState<CalculateObj>({});
  const initialList = useMemo(
    () =>
      userList.reduce(
        (o, key) =>
          Object.assign(o, {
            [key]: {
              paymentTotal: 0,
              tossList: userList.reduce(
                (o, key) => Object.assign(o, { [key]: 0 }),
                {}
              ),
            },
          }),
        {}
      ),
    []
  );

  useEffect(() => {
    let userPayment: CalculateObj = initialList;
    let allPaymentTotal = 0;

    paymentList.map((payment) => {
      const { paymentPrice, participants, payerName } = payment;
      const perPersonPayment = paymentPrice / participants.length;
      let payerInfo = userPayment[payerName];
      allPaymentTotal += paymentPrice;

      payerInfo.paymentTotal += paymentPrice;

      participants.map((participant) => {
        if (participant === payerName) {
          return;
        }
        let participantInfo = userPayment[participant];

        const differencePrice =
          payerInfo.tossList[participant] - perPersonPayment;
        if (differencePrice >= 0) {
          payerInfo.tossList[participant] = differencePrice;
        } else {
          payerInfo.tossList[participant] = 0;
          participantInfo.tossList[payerName] += -differencePrice;
        }
      });
    });
    setCalculateList(userPayment);
    setAllPaymentTotal(allPaymentTotal);
  }, []);

  useEffect(() => {
    let allTossList: TossObj = { totalPrice: 0 };

    userList.map((user) => {
      Object.keys(calculateList).map((payer) => {
        const floorToss = Math.floor(calculateList[payer].tossList[user]);
        allTossList["totalPrice"] += floorToss;
        allTossList[user] = allTossList[user]
          ? allTossList[user] + floorToss
          : floorToss;
      });
    });

    setAllTossList(allTossList);
  }, [calculateList]);

  return (
    <>
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
            0
          );

          return (
            <StyledLi key={index}>
              <StyledPayerInfo>
                <StyledPlayer>{payer}</StyledPlayer>
                <StyledPayment>
                  결제 금액 : {paymentTotal.toLocaleString()}원 / 송금 금액 :{" "}
                  {tossTotal.toLocaleString()}원 / 총 여행 경비 :{" "}
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
                  ) : null
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
                  0
                );
                return (
                  <StyledTossLi>
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
                  {allTossList["totalPrice"].toLocaleString()}원
                </StyledTossPrice>
              </StyledTossLi>
            </StyledTossUl>
          </StyledGiveMe>
          <div>
            <StyledTossUl>
              {Object.keys(allTossList).map((payer, index) =>
                payer !== "totalPrice" && allTossList[payer] !== 0 ? (
                  <StyledTossLi key={index}>
                    {payer}(이)가
                    <StyledTotalPrice>
                      {allTossList[payer].toLocaleString()}
                    </StyledTotalPrice>
                    &nbsp;원을 요청해요!
                  </StyledTossLi>
                ) : null
              )}
            </StyledTossUl>
          </div>
        </>
      ) : null}
    </>
  );
};

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
