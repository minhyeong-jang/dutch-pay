import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import {
  CalculateGetPriceItem,
  CalculateItem,
  PaymentItem,
  UserItem,
} from '../../../types';
import {
  CalculateTabList,
  PersonalCalculate,
  TotalPayment,
} from '../components/Calculate';
import { StepHeader } from '../components/Layout';

interface Props {
  userList: UserItem[];
  paymentList: PaymentItem[];
}
export const CalculateContainer: FC<Props> = ({ userList, paymentList }) => {
  const [calculateList, setCalculateList] = useState<CalculateItem>({});
  const [calculateGetPriceList, setCalculateGetPriceList] =
    useState<CalculateGetPriceItem>({});
  const paymentTotal = useMemo(
    () => paymentList.reduce((prev, curr) => prev + curr.paymentPrice, 0),
    [paymentList],
  );

  useEffect(() => {
    const calculateList: CalculateItem = {};
    const sendList = userList.reduce(
      (prev, curr) => ({ ...prev, [curr.userName]: 0 }),
      {},
    );
    userList.map((user) => {
      calculateList[user.userName] = {
        paymentTotal: 0,
        tossTotal: 0,
        sendList: { ...sendList },
      };
    });

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
    Object.keys(calculateList).forEach((payerName) => {
      const tossTotal = Object.keys(calculateList[payerName].sendList).reduce(
        (sum, key) =>
          sum + Math.floor(calculateList[payerName].sendList[key] || 0),
        0,
      );
      calculateList[payerName].tossTotal = tossTotal;
    });
    setCalculateList(calculateList);
  }, [userList, paymentList]);

  useEffect(() => {
    const sendList: CalculateGetPriceItem = { totalPrice: 0 };

    userList.map((user) => {
      Object.keys(calculateList).map((payer) => {
        const floorToss = Math.floor(
          calculateList[payer].sendList[user.userName],
        );
        sendList['totalPrice'] += floorToss;
        sendList[user.userName] = sendList[user.userName]
          ? sendList[user.userName] + floorToss
          : floorToss;
      });
    });

    setCalculateGetPriceList(sendList);
  }, [calculateList]);

  if (!paymentTotal) {
    return (
      <StyledSection>
        <StepHeader description="정산결과 확인" title="Step3" />
        <StyledNoResult>결제내역을 먼저 입력해주세요 📝</StyledNoResult>
      </StyledSection>
    );
  }

  return (
    <StyledSection>
      <StepHeader description="정산결과 확인" title="Step3" />
      <TotalPayment paymentTotal={paymentTotal} />
      <PersonalCalculate
        calculateGetPriceList={calculateGetPriceList}
        calculateList={calculateList}
        userList={userList}
      />
      <CalculateTabList
        calculateGetPriceList={calculateGetPriceList}
        calculateList={calculateList}
        userList={userList}
      />
    </StyledSection>
  );
};

const StyledSection = styled.section`
  ${({ theme }) => theme.layout.section};
`;
const StyledNoResult = styled.div`
  font-size: 14px;
  margin: 20px 0px 10px;
  color: ${({ theme }) => theme.color.point};
`;
