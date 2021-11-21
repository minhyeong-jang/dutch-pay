import React, { FC } from 'react';
import { useParams } from 'react-router';

import { DutchContainer } from '../containers';
import { DutchPageTemplate } from './templates';

const SamplePage: FC = () => {
  return (
    <DutchPageTemplate>
      {/* <DutchContainer templateId={id} /> */}
    </DutchPageTemplate>
  );
};

export default SamplePage;
