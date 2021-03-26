import React, { FC } from 'react';

import { ContentHeader } from '../../../shared/components/content';

interface Props {
  templateName: string;
}
export const TemplateSection: FC<Props> = ({ templateName }) => {
  return <ContentHeader>{templateName}</ContentHeader>;
};
