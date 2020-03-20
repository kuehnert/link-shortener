import {
  Avatar,
  Container,
  FormHelperText,
  Grid,
  Link,
  Theme,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { RootState } from "../../store";
import UserForm from "./UserForm";
import { signUp, SignUpValues } from "./UserSlice";
import myhistory from "myhistory";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: 400
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
    }
  })
);

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: ""
};

const SignUpPage: React.FC = () => {
  const { error } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = async (values: SignUpValues) => {
    dispatch(signUp(values));
    myhistory.push("/");
  };

  return (
    <Container className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Registrieren
      </Typography>

      {error && <FormHelperText>{error}</FormHelperText>}

      <UserForm initialValues={initialValues} handleSubmit={handleSubmit} />

      <Grid container>
        <Grid item xs>
          <Link component={RouterLink} to="#" variant="body2">
            Passwort vergessen?
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to="/login" variant="body2">
            Schon ein Konto? Hier anmelden.
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUpPage;
