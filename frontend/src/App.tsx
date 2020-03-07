import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/orange";
import AppBar from "components/AppBar";
import React from "react";
// import Counter from "./features/counter/Counter";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import Routes from "Routes";
import history from "./history";
import store from "./store";

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: lightBlue
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <AppBar />

          <div className="Main">
            <Routes />
          </div>
        </Router>
      </MuiThemeProvider>{" "}
    </Provider>
  );
};

export default App;
