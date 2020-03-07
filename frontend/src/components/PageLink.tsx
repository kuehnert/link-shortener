import { Typography } from "@material-ui/core";
import React, { Component } from "react";

export interface Props {
  page: Link;
}

const PageLink: React.FC = ({ page }) => {
  const { weburl } = page;
  const formattedURL = weburl.replace(/^(https:\/\/)?(www\.)?|\/.*$/g, "");

  return (
    <Typography className="PageLink">
      <a href={weburl} target="new" onClick={() => handleClick(page)}>
        {formattedURL}
      </a>
    </Typography>
  );
};

export default PageLink;
