import { IconButton, Theme } from "@material-ui/core";
import MUIAppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { getUser } from "features/users/UserSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import MainMenu from "./MainMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    grow: {
      flexGrow: 1
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    }
  })
);

const AppBar: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(getUser);

  return (
    <div className={classes.root}>
      <MUIAppBar position="static">
        <Toolbar>
          <MainMenu />

          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            Marienschule Links
          </Typography>

          {/* <div className={classes.grow} />
            <SearchField /> */}

          <div className={classes.grow} />

          {!user && (
            <Button color="inherit" component={Link} to="/login">
              Anmelden
            </Button>
          )}
          {user && <SignOutButton />}
        </Toolbar>
      </MUIAppBar>
    </div>
  );
};

export default AppBar;
