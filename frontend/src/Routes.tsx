import React from "react";
import { Route, Switch } from "react-router-dom";
import PagesList from "./components/PagesList";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
// import SignUp from "./components/SignUp";
import PageCreate from "./components/PageCreate";
import PageEdit from "./components/PageEdit";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={PagesList} />
    <Route path="/login" exact component={Login} />
    {/* <Route path="/signup" exact component={SignUp} /> */}

    <Route path="/pages/new" exact component={PageCreate} />
    <Route path="/pages/:shortname/edit" exact component={PageEdit} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
