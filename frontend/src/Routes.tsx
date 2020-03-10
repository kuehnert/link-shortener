import React from "react";
import { Route, Switch } from "react-router-dom";
import ShortLinksPage from "./features/links/ShortLinksPage";
import LoginPage from "./features/users/LoginPage";
import SignUpPage from "./features/users/SignUpPage";
import SettingsPage from "./features/users/SettingsPage";
import NotFound from "./components/NotFound";
// import PageCreate from "./components/PageCreate";
// import PageEdit from "./components/PageEdit";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={ShortLinksPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/signup" exact component={SignUpPage} />
    <Route path="/settings" exact component={SettingsPage} />

    {/* <Route path="/pages/new" exact component={PageCreate} /> */}
    {/* <Route path="/pages/:shortname/edit" exact component={PageEdit} /> */}

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
