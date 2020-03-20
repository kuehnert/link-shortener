import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { repairShortLinks } from "features/links/ShortLinkSlice";
import { logout } from "features/users/UserSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    colorInherit: {
      color: "white"
    }
  })
);

const MainMenu: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRepair = () => {
    dispatch(repairShortLinks());
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.colorInherit}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleRepair}>Icons reparieren</MenuItem>
        <MenuItem onClick={handleLogout}>Abmelden</MenuItem>
      </Menu>
    </>
  );
};

export default MainMenu;
