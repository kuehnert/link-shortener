import { Grid } from "@material-ui/core";
import { fetchShortLinks } from "features/links/ShortLinkSlice";
import { getUser } from "features/users/UserSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import LinkCard from "./LinkCard";
import CreateLinkButton from "./CreateLinkButton";

const ShortLinksPage: React.FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.links.list);

  useEffect(() => {
    dispatch(fetchShortLinks());
  }, []);

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {list.map(shortlink => (
        <LinkCard key={shortlink.shortname} shortlink={shortlink} />
      ))}

      {user && <CreateLinkButton />}
    </Grid>
  );
};

export default ShortLinksPage;
