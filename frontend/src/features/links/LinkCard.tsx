import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { ShortLink, deleteShortLink } from "features/links/ShortLinkSlice";
import React from "react";
import history from "../../myhistory";
import CopyLink from "./CopyLink";
// import PageLink from "./PageLink";
import { getUser } from "features/users/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import IconAvatar from "./IconAvatar";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";

interface Props {
  shortLink: ShortLink;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: { margin: theme.spacing(1), width: "280px" },
    header: {
      padding: theme.spacing(1),
      paddingBottom: 0,
      cursor: "pointer"
    },
    content: {
      padding: 0
    },
    actions: {
      position: "relative",
      backgroundColor: theme.palette.grey[200],
      color: "black",
      margin: 0,
      marginTop: theme.spacing(1),
      padding: 0,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    hits: {
      position: "absolute",
      right: theme.spacing(2)
    }
  })
);

const LinkCard: React.FC<Props> = ({ shortLink }) => {
  const { icon, title, shortname, description, weburl } = shortLink;
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(getUser);

  const handleClick = (event: React.MouseEvent) => {
    window.location.href = weburl;
  };

  function handleShortLinkDelete() {
    dispatch(deleteShortLink(shortLink));
  }

  function handleShortLinkEdit() {
    history.push(`/shortLinks/${shortLink.shortname}/edit`);
  }

  const renderButtons = (shortLink: ShortLink) => {
    return (
      <CardActions className={classes.actions}>
        <IconButton
          size="small"
          color="secondary"
          onClick={handleShortLinkEdit}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          size="small"
          color="primary"
          onClick={handleShortLinkDelete}
        >
          <DeleteIcon />
        </IconButton>

        <Typography className={classes.hits} color="textSecondary">
          {shortLink.hits} hit
          {shortLink.hits > 1 && "s"}
        </Typography>
      </CardActions>
    );
  };

  return (
    <Card key={shortname} className={classes.card} raised>
      <CardHeader
        className={classes.header}
        title={title}
        avatar={icon && <IconAvatar icon={icon} />}
        subheader={description}
        onClick={handleClick}
      />

      <CardContent className={classes.content}>
        {/* <PageLink shortLink={shortLink} /> */}
        <CopyLink shortname={shortname} />
      </CardContent>

      {user && renderButtons(shortLink)}
    </Card>
  );
};

export default LinkCard;
