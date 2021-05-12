import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Connect from "../client/Connect";
import ContractFun from "../client/ImportContract";
import NavBar from "./navbar";

export default function Routes() {
  return (
    <Router>
      <div>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <Connect />
          </Route>
          <Route path="/importContract">
            <ContractFun />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
