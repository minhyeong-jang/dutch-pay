import React from 'react';
import { RouteObject } from 'react-router';

import { LazyAboutPage } from '../about/pages';
import { LazyDutchPage, LazySamplePage, LazySharedPage } from '../dutch/pages';
import { RootPage } from '../dutch/pages/RootPage';

export const routes: RouteObject[] = [
  {
    element: <LazyAboutPage />,
    path: `/`,
  },
  {
    children: [
      {
        element: <LazySamplePage />,
        path: `sample`,
      },
      {
        element: <LazySharedPage />,
        path: `shared`,
      },
      {
        element: <LazyDutchPage />,
        path: `:id`,
      },
      {
        element: <RootPage />,
        path: '',
      },
    ],
    path: `calc`,
  },
];
