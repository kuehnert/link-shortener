import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from "@material-ui/icons";
import React, { useEffect } from "react";
import PageLink from "../../components/PageLink";
import ShortLinkBox from "../../components/ShortLinkBox";
import history from "../../myhistory";
import { ShortLink, fetchShortLinks } from "features/links/ShortLinkSlice";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const CreateShortLinkButton = () => (
  <Fab
    color="secondary"
    aria-label="Add"
    className="Button"
    onClick={() => {
      history.push("/shortlinks/new");
    }}
  >
    <AddIcon />
  </Fab>
);

const ShortLinksPage: React.FC = () => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.links.list);

  useEffect(() => {
    console.log("Loading links");

    dispatch(fetchShortLinks());
  }, []);

  function onShortLinkDelete({ shortname }: ShortLink) {
    // deleteShortLink({ shortname });
  }

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
          onClick={() => onShortLinkDelete(shortlink)}
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

  const renderShortLink = (shortlink: ShortLink) => {
    const { title, shortname, weburl, description } = shortlink;
    const avatar = (
      <Avatar
        src={`https://besticon-demo.herokuapp.com/icon?url=${weburl}&size=32..128..256`}
        className="avatar"
      />
    );

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

          <ShortLinkBox shortname={shortname} />
        </CardContent>

        {false && renderButtons(shortlink)}
      </Card>
    );
  };

  const renderShortLinks = () => {
    return list.map(shortlink => renderShortLink(shortlink));
  };

  // const webShortLinks =
  //   props.data.listShortLinks && props.data.listShortLinks.items;

  // if (!webShortLinks) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {renderShortLinks()}

      {false && <CreateShortLinkButton />}
    </Grid>
  );
};

export default ShortLinksPage;
