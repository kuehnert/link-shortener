import { Snackbar } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import MuiAlert, { Color } from "@material-ui/lab/Alert";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../features/globals/GlobalSlice";
import { RootState } from "../store";

const useStyles = makeStyles(() =>
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
