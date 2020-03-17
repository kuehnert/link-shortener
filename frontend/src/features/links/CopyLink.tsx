import { Button, IconButton, Snackbar, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Close as CloseIcon,
  FileCopyOutlined as CopyIcon
} from "@material-ui/icons";
import React, { useState } from "react";

export interface Props {
  shortname: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5)
    },
    button: {
      width: "fill-available",
      margin: theme.spacing(1),
      backgroundColor: "#336",
      color: "white",
      textTransform: "initial",
      fontFamily:
        "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New",
      "&:hover": {
        backgroundColor: "green !important",
        color: "#FFF"
      }
    },
    iconSmall: {
      fontSize: 16,
      marginLeft: theme.spacing(1)
    }
  })
);

const CopyLink: React.FC<Props> = ({ shortname }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setOpen(true))
      .catch(err => console.log("Error: ", err));
  };

  const handleClose = (
    _: React.MouseEvent<HTMLAnchorElement> | React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const url = `l.mso.onl/${shortname}`;

  return (
    <>
      <Button
        variant="contained"
        className={classes.button}
        size="small"
        onClick={() => handleClick(url)}
      >
        {url}
        <CopyIcon className={classes.iconSmall} />
      </Button>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">
            &quot;{url}&quot; in die Zwischenablage kopiert
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </>
  );
};

export default CopyLink;
