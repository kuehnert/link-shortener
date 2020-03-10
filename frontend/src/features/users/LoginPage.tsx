import {
  Avatar,
  Button,
  Grid,
  Link,
  Container,
  Theme,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { FormHelperText } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "formik-material-ui";
import history from "../../myhistory";
import { login, LoginValues } from "./UserSlice";
import { RootState } from "../../store";

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
      maxWidth: 600,
      margin: "auto"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
);

const LoginPage: React.FC = () => {
  const { error } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = async (values: LoginValues) => {
    await dispatch(login(values));
    history.push("/");
  };

  return (
    <Container className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Anmelden
      </Typography>

      {error && <FormHelperText>{error}</FormHelperText>}

      <Formik
        onSubmit={handleSubmit}
        initialValues={{ email: "", password: "" }}
      >
        {({ touched, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              name="email"
              label="E-Mail"
              fullWidth
              component={TextField}
            />
            <Field
              name="password"
              label="Passwort"
              type="password"
              fullWidth
              component={TextField}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!touched || isSubmitting}
            >
              Anmelden
            </Button>
          </Form>
        )}
      </Formik>

      <Grid container>
        <Grid item xs>
          <Link component={RouterLink} to="#" variant="body2">
            Passwort vergessen?
          </Link>
        </Grid>
        <Grid item xs>
          <Link component={RouterLink} to="/signup" variant="body2">
            Kein Konto? Hier registrieren.
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
