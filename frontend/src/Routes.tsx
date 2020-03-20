import React from "react";
import { Route, Switch } from "react-router-dom";
import ShortLinksPage from "./features/links/ShortLinksPage";
import LoginPage from "./features/users/LoginPage";
import SignUpPage from "./features/users/SignUpPage";
// import SettingsPage from "./features/users/SettingsPage.bk";
import NotFound from "./components/NotFound";
import CreateLinkPage from "./features/editing/CreateLinkPage";
import EditLinkPage from "./features/editing/EditLinkPage";
import ProtectedRoute from "components/ProtectedRoute";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={ShortLinksPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/signup" exact component={SignUpPage} />

    {/* <ProtectedRoute path="/settings" exact component={SettingsPage} /> */}

    <ProtectedRoute path="/shortlinks/new" exact component={CreateLinkPage} />
    <ProtectedRoute
      path="/shortlinks/:shortname/edit"
      exact
      component={EditLinkPage}
    />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
