import { Fab } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import React from "react";
import history from "../../myhistory";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: spacing(2),
      right: spacing(2)
    }
  })
);

const CreateLinkButton: React.FC = () => {
  const classes = useStyles();

  return (
    <Fab
      color="secondary"
      aria-label="Add"
      className={classes.fab}
      onClick={() => {
        history.push("/shortlinks/new");
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default CreateLinkButton;
