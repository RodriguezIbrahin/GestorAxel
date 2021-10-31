import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Copyright from "./components/Copyright";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
      </Switch>
      <Route path="/" component={Copyright} />
    </BrowserRouter>
  );
}

export default App;
