import React from "react";
import { Color } from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert } from "../features/globals/GlobalSlice";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: {
      bottom: 90
    }
  })
);

const types: Color[] = ["error", "warning", "info", "success"];

const Alerts: React.FC = () => {
  const { alerts } = useSelector((state: RootState) => state.globals);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = (type: string) => {
    dispatch(clearAlert(type as Color));
  };

  return (
    <>
      {types.map((type: Color) => {
        const message = alerts[type];

        return message == null ? null : (
          <Snackbar
            open
            autoHideDuration={5000}
            onClose={() => handleClose(type)}
            key={type}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            className={classes.snackbar}
          >
            <MuiAlert elevation={6} variant="filled" severity={type}>
              {message}
            </MuiAlert>
          </Snackbar>
        );
      })}
    </>
  );
};

export default Alerts;
