import React, { FC } from 'react';
import { useParams } from 'react-router';

import { DutchContainer } from '../containers';
import { DutchPageTemplate } from './templates';

interface RouterParams {
  id: string;
}

export const DutchPage: FC = () => {
  const { id } = useParams<RouterParams>();

  return (
    <DutchPageTemplate>
      <DutchContainer templateId={id} />
    </DutchPageTemplate>
  );
};
