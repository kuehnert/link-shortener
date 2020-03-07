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
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import PageLink from "./PageLink";
import ShortLink from "./ShortLink";

const CreatePageButton = ({ history }) => (
  <Fab
    color="secondary"
    aria-label="Add"
    className="Button"
    onClick={() => {
      history.push("/pages/new");
    }}
  >
    <AddIcon />
  </Fab>
);

const PagesList: React.FC = () => {
  function onPageDelete({ shortname }) {
    this.props.deletePage({ shortname });
  }

  function onPageEdit({ shortname }) {
    this.props.history.push(`/pages/${shortname}/edit`);
  }

  const renderButtons = page => {
    return (
      <CardActions className="CardActions" disableSpacing>
        <IconButton
          size="small"
          color="secondary"
          onClick={() => this.onPageEdit(page)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          color="primary"
          onClick={() => this.onPageDelete(page)}
        >
          <DeleteIcon />
        </IconButton>
        <Typography className="hits" color="textSecondary">
          {page.hits} hit
          {page.hits > 1 && "s"}
        </Typography>
      </CardActions>
    );
  };

  const renderPage = (page, currentUser) => {
    const { title, shortname, weburl, description } = page;
    const avatar = (
      <Avatar
        src={`https://besticon-demo.herokuapp.com/icon?url=${weburl}&size=32..128..256`}
        className="avatar"
      />
    );

    return (
      <Card key={shortname} className="PageCard">
        <CardHeader
          className="CardHeader"
          title={title}
          avatar={avatar}
          subheader={description}
        />

        <CardContent className="CardContent">
          <PageLink page={page} />

          <ShortLink shortname={shortname} />
        </CardContent>

        {currentUser && this.renderButtons(page)}
      </Card>
    );
  };

  function renderPages(currentUser) {
    return this.props.data.listPages.items
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(page => this.renderPage(page, currentUser));
  }

  const webPages = this.props.data.listPages && this.props.data.listPages.items;

  if (!webPages) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {this.renderPages(data.currentUser)}
      {data.currentUser && <CreatePageButton history={this.props.history} />}
    </Grid>
  );
};

export default PagesList;
