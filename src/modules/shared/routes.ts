import { RouteProps } from 'react-router-dom';

import { AboutPage } from '../about/pages';
import { DutchPage } from '../dutch/pages';

const prefix = '/';

export const routes: RouteProps[] = [
  {
    component: AboutPage,
    path: prefix,
  },
  {
    component: DutchPage,
    path: `${prefix}/calc`,
  },
];
