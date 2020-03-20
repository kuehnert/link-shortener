import {
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline,
  Container
} from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/blue";
import MuiAppBar from "components/AppBar";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import Routes from "Routes";
import history from "./myhistory";
import store from "./store";
import Alerts from "./components/Alerts";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#ff9100" },
    secondary: lightBlue,
    background: {
      default: "#faebd7"
    }
  },
  overrides: {
    // MuiCssBaseline: {
    //   "@global": {
    //     body: {
    //       color: "white",
    //       background: "radial-gradient(circle at 49% 55%, #faebd7, #ffffff)"
    //     }
    //   }
    // },
    MuiContainer: {
      root: {
        marginTop: 16
      }
    },
    MuiCardContent: {
      root: { "&:last-child": { paddingBottom: 0 } }
    }
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <MuiAppBar />
          <Alerts />

          <Container className="Main" maxWidth="lg">
            <Routes />
          </Container>
        </Router>
      </MuiThemeProvider>{" "}
    </Provider>
  );
};

export default App;
