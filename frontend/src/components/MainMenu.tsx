import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";
import { repairShortLinks } from "features/links/ShortLinkSlice";
import React from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() =>
  createStyles({
    menuButton: {
      marginLeft: -12,
      marginRight: 20
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
        onClick={handleClick}
      >
        <MenuIcon>Home</MenuIcon>
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleRepair}>Icons reparieren</MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;
