import { AppBar as MuiAppBar, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography, IconButton, Toolbar } from "@material-ui/core";
import { getUser } from "features/users/UserSlice";
import React from "react";
import { useSelector } from "react-redux";
import MainMenu from "./MainMenu";
import SignInButton from "./SignInButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: -theme.spacing(2),
      marginRight: theme.spacing(1)
    },
    title: {
      display: "none",
      color: "white",
      fontWeight: "normal",
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
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <Avatar alt="MSO Link Shortener" src="/launcher-icon-1x.png" />
          </IconButton>

          <Typography
            className={classes.title}
            variant="h5"
            color="inherit"
            noWrap
          >
            Marienschule Opladen – ShortLinks
          </Typography>

          {/* <div className={classes.grow} />
            <SearchField /> */}

          <div className={classes.grow} />

          {!user && <SignInButton />}
          {user && <MainMenu />}
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

export default AppBar;
