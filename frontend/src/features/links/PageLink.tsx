import { Typography } from "@material-ui/core";
import { ShortLink } from "features/links/ShortLinkSlice";
import React from "react";

export interface Props {
  shortLink: ShortLink;
}

const ShortLinkLink: React.FC<Props> = ({ shortLink }) => {
  const { weburl } = shortLink;
  const formattedURL = weburl.replace(/^(https:\/\/)?(www\.)?|\/.*$/g, "");

  return (
    <Typography className="ShortLinkLink" align="center">
      <a href={weburl} target="new">
        {formattedURL}
      </a>
    </Typography>
  );
};

export default ShortLinkLink;
