import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      color: "white"
    }
  })
);

const SignInButton: React.FC = () => {
  const classes = useStyles();

  return (
    <Button
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      className={classes.button}
      component={Link}
      to="/login"
      endIcon={<AccountCircle />}
    >
      Anmelden
    </Button>
  );
};

export default SignInButton;
