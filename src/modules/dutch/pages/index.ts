import { lazy } from 'react';

export const LazyDutchPage = lazy(() => import('./DutchPage'));
export const LazySamplePage = lazy(() => import('./SamplePage'));
export const LazySharedPage = lazy(() => import('./SharedPage'));
