import Loading from "components/Loading";
import {
  fetchShortLinks,
  updateShortLink
} from "features/links/ShortLinkSlice";
import myhistory from "myhistory";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store";
import LinkForm from "./LinkForm";

export interface MatchParams {
  shortname: string;
}

const PageEdit: React.FC<RouteComponentProps<MatchParams>> = props => {
  const dispatch = useDispatch();
  const { shortname } = props.match.params;
  const shortLink = useSelector((state: RootState) =>
    state.links.list.find(l => l.shortname === shortname)
  );

  useEffect(() => {
    if (shortLink == null) {
      dispatch(fetchShortLinks());
    }
  }, []);

  const handleSubmit = (values: any) => {
    dispatch(updateShortLink(values));
    myhistory.push("/");
  };

  if (!shortLink) {
    return <Loading />;
  }

  return (
    <div>
      <h3>Seite für „{shortname}“ bearbeiten</h3>

      <LinkForm shortLink={shortLink} handleSubmit={handleSubmit} />
    </div>
  );
};

export default PageEdit;
