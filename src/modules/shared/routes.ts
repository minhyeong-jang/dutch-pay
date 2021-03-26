import { RouteProps } from 'react-router-dom';

import { AboutPage } from '../about/pages';
import { DutchPage } from '../dutch/pages';

export const routes: RouteProps[] = [
  {
    component: AboutPage,
    exact: true,
    path: `/`,
  },
  {
    component: DutchPage,
    exact: true,
    path: `/calc`,
  },
];
