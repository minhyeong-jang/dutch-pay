import 'antd/dist/antd.css';

import React, { Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { routes } from './modules/shared/routes';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Switch>
              {routes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
            </Switch>
          </Suspense>
        </HashRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
