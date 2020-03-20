import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    notfound: {
      margin: spacing(2),
      paddingTop: 100,
      textAlign: "center"
    }
  })
);

const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.notfound}>
      <h3>Tut mit leid, diese Seite gibt es nicht.</h3>

      <Button component={Link} to="/" variant="contained">
        Zurück zur Hauptseite
      </Button>
    </div>
  );
};

export default NotFound;
