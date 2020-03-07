import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    notfound: {
      color: palette.secondary.contrastText,
      background: palette.secondary.main,
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
      <h3>Tut mit leid, Seite nicht gefunden!</h3>
    </div>
  );
};

export default NotFound;
