import React, { FC } from 'react';

import { DutchContainer } from '../containers';
import { DutchPageTemplate } from './templates';

export const DutchPage: FC = () => {
  return (
    <DutchPageTemplate>
      <DutchContainer />
      {/* <CalculateContainer userList={userList} paymentList={paymentList} /> */}
    </DutchPageTemplate>
  );
};
