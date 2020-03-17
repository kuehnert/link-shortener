import { Button, ButtonGroup, Paper, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ShortLinkBase } from "features/links/ShortLinkSlice";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import myhistory from "myhistory";
import React from "react";
// import { isValidShortname, isValidURL } from "../../utils/helpers";

const blankValues: ShortLinkBase = {
  description: "",
  hidden: false,
  shortname: "",
  title: "",
  weburl: "https://"
};

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    paper: {
      maxWidth: 700,
      marginTop: spacing(2),
      margin: "auto",
      padding: spacing(2)
    },
    buttonGroup: {
      marginTop: spacing(2),
      right: spacing(2)
    }
  })
);

export interface Props {
  shortLink?: ShortLinkBase;
  handleSubmit: (shortLink: ShortLinkBase) => void;
}

const LinkForm: React.FC<Props> = ({ shortLink, handleSubmit }) => {
  const classes = useStyles();
  const initialValues = (shortLink as ShortLinkBase) || blankValues;
  // const onChange = ({ target: { id, value } }) => {
  //   const newValue =
  //     id === "shortname" ? value.toLowerCase().replace(/\s/, "") : value;
  // };

  const handleCancel = () => {
    myhistory.goBack();
  };

  return (
    <Paper className={classes.paper}>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {() => (
          <Form>
            <Field
              name="shortname"
              label="Kurzname"
              autoFocus={true}
              component={TextField}
              autoComplete="off"
              spellCheck="off"
              fullWidth
            />

            <Field
              name="title"
              label="Seitenname"
              fullWidth
              component={TextField}
            />

            <Field
              name="weburl"
              label="URL"
              type="url"
              fullWidth
              component={TextField}
            />

            <Field
              name="description"
              label="Beschreibung"
              multiline
              rows="4"
              fullWidth
              component={TextField}
            />

            <ButtonGroup className={classes.buttonGroup}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
                className="Button"
              >
                Abbrechen
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="Button"
              >
                {true ? "speichern" : "erstellen"}
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default LinkForm;
