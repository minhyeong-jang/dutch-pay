import React, { FC } from 'react';

import { AboutContainer } from '../containers';
import { AboutPageTemplate } from './templates';

const AboutPage: FC = () => {
  return (
    <AboutPageTemplate>
      <AboutContainer />
    </AboutPageTemplate>
  );
};

export default AboutPage;
