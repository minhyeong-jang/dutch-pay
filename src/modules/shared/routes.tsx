import AboutPage from 'modules/about/pages/AboutPage';
import DutchPage from 'modules/dutch/pages/DutchPage';
import React from 'react';
import { RouteObject } from 'react-router';

// import { LazyAboutPage } from '../about/pages';
import { LazySamplePage, LazySharedPage } from '../dutch/pages';
import { RootPage } from '../dutch/pages/RootPage';

export const routes: RouteObject[] = [
  {
    element: <AboutPage />,
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
        element: <DutchPage />,
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
