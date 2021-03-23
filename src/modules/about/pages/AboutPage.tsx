import React, { FC } from 'react';

import { AboutContainer } from '../containers';
import { AboutPageTemplate } from './templates';

export const AboutPage: FC = () => {
  return (
    <AboutPageTemplate>
      <AboutContainer />
    </AboutPageTemplate>
  );
};
