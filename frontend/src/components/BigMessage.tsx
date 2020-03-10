import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    paper: {
      background: palette.grey[300],
      color: palette.secondary.contrastText,
      margin: "auto",
      marginTop: spacing(10),
      minHeight: "30vh",
      padding: spacing(4),
      width: "50vw"
    }
  })
);

interface Props {
  title?: string;
  children: any;
}

const BigMessage: React.FC<Props> = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      {title && <Typography variant="h3">{title}</Typography>}
      {children}
    </Paper>
  );
};

export default BigMessage;
