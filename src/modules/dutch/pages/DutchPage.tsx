import React, { FC } from 'react';
import { useParams } from 'react-router';

import { DutchContainer } from '../containers';
import { DutchPageTemplate } from './templates';

const DutchPage: FC = () => {
  const { id = '' } = useParams();

  return (
    <DutchPageTemplate>
      <DutchContainer templateId={id} />
    </DutchPageTemplate>
  );
};

export default DutchPage;
