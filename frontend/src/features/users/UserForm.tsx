import { Button, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Field, Form, Formik, FormikErrors } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { SignUpValues } from "./UserSlice";

interface Props {
  initialValues: SignUpValues;
  handleSubmit: (values: SignUpValues) => Promise<void>;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: spacing(1)
    },
    submit: {
      margin: spacing(3, 0, 2)
    }
  })
);

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

const UserForm: React.FC<Props> = ({ initialValues, handleSubmit }) => {
  const classes = useStyles();

  return (
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
            fullWidth
            component={TextField}
          />

          <Field
            name="lastname"
            label="Nachname"
            placeholder="Lempel"
            fullWidth
            component={TextField}
          />

          <Field
            name="email"
            label="E-Mail"
            placeholder="lehrer.lempel@busch-schule.de"
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
  );
};

export default UserForm;
