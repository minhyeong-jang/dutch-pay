import 'antd/dist/antd.css';

import React, { Suspense } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { Analytics } from './modules/shared/anlaytics';
import { convertRouteItem } from './modules/shared/routes';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import redux from './redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    convertRouteItem.map((route, index) => (
      <Route key={index} path={route.path} element={<route.element />} />
    )),
  ),
);

const App = () => {
  return (
    <Provider store={redux}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Analytics />
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
