import { Typography } from "@material-ui/core";
import { ShortLink } from "features/links/ShortLinkSlice";
import React from "react";

export interface Props {
  shortlink: ShortLink;
}

const ShortLinkLink: React.FC<Props> = ({ shortlink }) => {
  const { weburl } = shortlink;
  const formattedURL = weburl.replace(/^(https:\/\/)?(www\.)?|\/.*$/g, "");

  const handleClick = () => {
    console.log("Click! :)");
  };

  return (
    <Typography className="ShortLinkLink">
      <a href={weburl} target="new" onClick={handleClick}>
        {formattedURL}
      </a>
    </Typography>
  );
};

export default ShortLinkLink;
