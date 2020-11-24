import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "./modules/shared/routes";

function App() {
  return (
    <>
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
