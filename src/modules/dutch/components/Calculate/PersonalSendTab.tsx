import React, { FC } from 'react';
import styled from 'styled-components';

import { CalculateItem } from '../../../../types';

interface Props {
  calculateList: CalculateItem;
}
export const PersonalSendTab: FC<Props> = ({ calculateList }) => {
  return (
    <StyledContainer>
      {Object.keys(calculateList).map((payer, index) => {
        const { sendList } = calculateList[payer];
        return (
          <StyledTossUl key={index}>
            {Object.keys(sendList).map((participant, index) =>
              sendList[participant] ? (
                <StyledTossLi key={index}>
                  {payer} -&gt; {participant} :&nbsp;
                  {Math.floor(sendList[participant]).toLocaleString()}원
                </StyledTossLi>
              ) : null,
            )}
          </StyledTossUl>
        );
      })}
    </StyledContainer>
  );
};
const StyledContainer = styled.div``;

const StyledTossUl = styled.ul`
  padding-left: 20px;
`;
const StyledTossLi = styled.li`
  margin-bottom: 5px;
  font-size: 15px;
  list-style-type: disc;
`;
