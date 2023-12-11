import React, { FC, LazyExoticComponent } from 'react';
import { RouteObject } from 'react-router';

import { LazyAboutPage } from '../about/pages';
import { LazyDutchPage, LazySamplePage, LazySharedPage } from '../dutch/pages';
import { RootPage } from '../dutch/pages/RootPage';
import { PathRouteProps } from 'react-router-dom';

export type RouteMap = RouteMapParent[];
export interface RouteMapParent {
  prefix: string;
  children: RouteMapChild[];
}
export interface RouteMapChild extends Pick<PathRouteProps, 'path'> {
  element: LazyExoticComponent<() => JSX.Element> | FC;
}

export const routes: RouteMap = [
  {
    prefix: `/`,
    children: [
      {
        element: LazyAboutPage,
        path: '',
      },
    ],
  },
  {
    children: [
      {
        element: LazySamplePage,
        path: `sample`,
      },
      {
        element: LazySharedPage,
        path: `shared`,
      },
      {
        element: LazyDutchPage,
        path: `:id`,
      },
      {
        element: RootPage,
        path: '',
      },
    ],
    prefix: `calc`,
  },
];

export const convertRouteItem = routes.reduce(
  (previous: RouteMapChild[], next) => {
    return [
      ...previous,
      ...next.children.map((item) => ({
        ...item,
        path: `${next.prefix}${item.path}`,
      })),
    ];
  },
  [],
);
