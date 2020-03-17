import { Avatar, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";

interface Props {
  icon: string;
}
const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    avatar: {
      margin: 0,
      width: spacing(7),
      height: spacing(7)
    }
  })
);

const IconAvatar: React.FC<Props> = ({ icon }) => {
  const classes = useStyles();

  if (icon == null || !icon.startsWith("data:")) {
    return null;
  }

  return <Avatar src={icon} className={classes.avatar} />;
};

export default IconAvatar;
