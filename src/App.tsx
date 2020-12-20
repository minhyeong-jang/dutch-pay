import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "./modules/shared/routes";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import "antd/dist/antd.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Switch>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
