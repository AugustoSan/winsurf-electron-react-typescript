import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useCustomDispatch, useCustomSelector } from "../hooks/redux";
import { setOpenDrawer } from "../redux/slice/menu";

export const AppBarCustom = (): JSX.Element => {
  const { openDrawer } = useCustomSelector((state) => state.menuSlice);
  const dispatch = useCustomDispatch();

  const handleDrawerToggle = () => {
    dispatch(setOpenDrawer(!openDrawer));
  };
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
