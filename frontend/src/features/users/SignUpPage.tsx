import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { RootState } from "../../store";
import history from "../../myhistory";
import { signUp, SignUpValues } from "./UserSlice";

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
      alignItems: "center"
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

const initialValues = {
  firstname: "",
  lastname: "",
  schoolName: "",
  state: "",
  email: "",
  password: ""
};

const validate = (
  values: SignUpValues
): void | object | Promise<FormikErrors<SignUpValues>> => {
  const errors: { [key: string]: string } = {};

  if (!values.firstname) {
    errors.firstname = "Notwendig";
  }

  if (!values.lastname) {
    errors.lastname = "Notwendig";
  }

  if (!values.email) {
    errors.email = "Notwendig";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Ungültige E-Mail-Adresse";
  }

  return errors;
};

const SignUpPage: React.FC = () => {
  const { error } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = async (values: SignUpValues) => {
    await dispatch(signUp(values));
    history.push("/");
  };

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Bei Sokrates registrieren
      </Typography>

      {error && <FormHelperText>{error}</FormHelperText>}

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={validate}
      >
        {({ touched, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              name="firstname"
              label="Vorname"
              placeholder="Wilhelm"
              component={TextField}
            />
            <ErrorMessage name="firstname" />

            <Field
              name="lastname"
              label="Nachname"
              placeholder="Lempel"
              component={TextField}
            />

            <Field
              name="email"
              label="E-Mail"
              placeholder="lehrer.lempel@busch-schule.de"
              component={TextField}
            />

            <Field
              name="password"
              label="Passwort"
              type="password"
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
        <Grid item>
          <Link component={RouterLink} to="/login" variant="body2">
            Schon ein Konto? Hier anmelden.
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SignUpPage;
