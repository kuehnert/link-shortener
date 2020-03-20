import { Grid } from "@material-ui/core";
import { fetchShortLinks } from "features/links/ShortLinkSlice";
import { getUser } from "features/users/UserSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import CreateLinkButton from "./CreateLinkButton";
import LinkCard from "./LinkCard";
import { useLocation } from "react-router-dom";
import { setAlert } from "features/globals/GlobalSlice";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ShortLinksPage: React.FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.links.list);
  const query = useQuery();

  useEffect(() => {
    const notFound = query.get("notfound");
    if (notFound) {
      dispatch(
        setAlert({
          type: "warning",
          message: `Link nicht gefunden: ${notFound}`
        })
      );
    }

    if (list.length == 0) {
      dispatch(fetchShortLinks());
    }
  }, []);

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        {list.map(shortLink => (
          <Grid item xs={6} sm={3} key={shortLink.shortname}>
            <LinkCard key={shortLink.shortname} shortLink={shortLink} />
          </Grid>
        ))}
      </Grid>

      {user && <CreateLinkButton />}
    </div>
  );
};

export default ShortLinksPage;
