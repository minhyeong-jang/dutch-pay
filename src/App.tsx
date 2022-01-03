import 'antd/dist/antd.css';

import React, { Suspense } from 'react';
import { HashRouter, Route, Routes, useRoutes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Analytics } from './modules/shared/anlaytics';
import { routes } from './modules/shared/routes';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';

function App() {
  const routing = useRoutes(routes);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Analytics />
        {/* <HashRouter> */}
        <Suspense
          fallback={<div style={{ minHeight: '100vh' }}>Loading...</div>}
        >
          {routing}
        </Suspense>
        {/* </HashRouter> */}
      </ThemeProvider>
    </>
  );
}

export default App;
