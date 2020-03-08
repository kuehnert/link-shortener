import { IconButton, Snackbar, Button } from "@material-ui/core";
import {
  Close as CloseIcon,
  FileCopyOutlined as CopyIcon
} from "@material-ui/icons";
import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

export interface Props {
  shortname: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5)
    },
    button: {
      margin: theme.spacing(1),
      backgroundColor: "#336",
      color: "white",
      textTransform: "initial",
      fontFamily:
        "Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New"
    },
    buttonHover: {
      backgroundColor: "green !important",
      color: "#FFF"
    },
    label: {
      marginLeft: "18px",
      marginRight: "18px"
    },
    iconSmall: {
      fontSize: 16,
      marginLeft: theme.spacing(1)
    }
  })
);

const ShortLinkBox: React.FC<Props> = ({ shortname }) => {
  const classes = useStyles();

  const handleClick = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log("Done"))
      .catch(err => console.log("Error: ", err));
  };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   this.setState({ open: false });
  // };

  const url = `l.mso.onl/${shortname}`;

  return (
    <>
      <Button
        variant="contained"
        classes={{ root: classes.button, label: classes.label }}
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
        open={true}
        autoHideDuration={1000}
        // onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">In Zwischenablage kopiert: {url}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            // onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </>
  );
};

export default ShortLinkBox;
