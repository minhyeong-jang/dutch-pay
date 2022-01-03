import React, { FC } from 'react';

import { SharedContainer } from '../containers/Shared';
import { DutchPageTemplate } from './templates';

const SharedPage: FC = () => {
  return (
    <DutchPageTemplate>
      <SharedContainer />
      {/* <DutchContainer templateId={id} /> */}
    </DutchPageTemplate>
  );
};

export default SharedPage;
