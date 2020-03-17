import { Grid, Typography } from "@material-ui/core";
import { fetchShortLinks } from "features/links/ShortLinkSlice";
import { getUser } from "features/users/UserSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import CreateLinkButton from "./CreateLinkButton";
import LinkCard from "./LinkCard";

const ShortLinksPage: React.FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.links.list);

  useEffect(() => {
    if (list.length == 0) {
      dispatch(fetchShortLinks());
    }
  }, []);

  if (list.length === 0) {
    return (
      <div>
        <Typography variant="h4">
          Es befinden sich noch keine Links in der Datenbank.
        </Typography>
        {user && <CreateLinkButton />}
      </div>
    );
  }

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        {list.map(shortLink => (
          <LinkCard key={shortLink.shortname} shortLink={shortLink} />
        ))}
      </Grid>
      {user && <CreateLinkButton />}
    </div>
  );
};

export default ShortLinksPage;
