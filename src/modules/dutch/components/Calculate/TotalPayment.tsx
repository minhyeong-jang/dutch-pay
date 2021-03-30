import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { PaymentItem } from '../../../../types';

interface Props {
  paymentList: PaymentItem[];
}
const TotalPaymentComponent: FC<Props> = ({ paymentList }) => {
  const allPaymentTotal = paymentList.reduce(
    (prev, curr) => prev + curr.paymentPrice,
    0,
  );
  return (
    <StyledContainer>
      이번 모임은
      <StyledPayment>{allPaymentTotal.toLocaleString()}</StyledPayment>원을
      사용했어요!
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;
const StyledPayment = styled.span`
  color: ${({ theme }) => theme.color.point};
  font-weight: bold;
  font-size: 20px;
  margin: 0 3px 0px 8px;
`;

export const TotalPayment = memo(TotalPaymentComponent);
