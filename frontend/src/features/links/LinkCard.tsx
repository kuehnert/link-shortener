import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import { ShortLink } from "features/links/ShortLinkSlice";
import React from "react";
import history from "../../myhistory";
import CopyLink from "./CopyLink";
import PageLink from "./PageLink";
import { getUser } from "features/users/UserSlice";
import { useSelector } from "react-redux";

interface Props {
  shortlink: ShortLink;
}

const LinkCard: React.FC<Props> = ({ shortlink }) => {
  const { title, shortname, weburl, description } = shortlink;
  const user = useSelector(getUser);

  const avatar = (
    <Avatar
      src={`https://besticon-demo.herokuapp.com/icon?url=${weburl}&size=32..128..256`}
      className="avatar"
    />
  );

  // function onShortLinkDelete({ shortname }: ShortLink) {
  //   deleteShortLink({ shortname });
  // }

  function onShortLinkEdit({ shortname }: ShortLink) {
    history.push(`/shortlinks/${shortname}/edit`);
  }

  const renderButtons = (shortlink: ShortLink) => {
    return (
      <CardActions className="CardActions" disableSpacing>
        <IconButton
          size="small"
          color="secondary"
          onClick={() => onShortLinkEdit(shortlink)}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          size="small"
          color="primary"
          // onClick={() => onShortLinkDelete(shortlink)}
        >
          <DeleteIcon />
        </IconButton>

        <Typography className="hits" color="textSecondary">
          {shortlink.hits} hit
          {shortlink.hits > 1 && "s"}
        </Typography>
      </CardActions>
    );
  };

  return (
    <Card key={shortname} className="ShortLinkCard">
      <CardHeader
        className="CardHeader"
        title={title}
        avatar={avatar}
        subheader={description}
      />

      <CardContent className="CardContent">
        <PageLink shortlink={shortlink} />

        <CopyLink shortname={shortname} />
      </CardContent>

      {user && renderButtons(shortlink)}
    </Card>
  );
};

export default LinkCard;
