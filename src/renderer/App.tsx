import React from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { AppBarCustom } from "./components/AppBar";
import { MenuItem } from "./components/MenuItem";
import { useCustomSelector } from "./hooks/redux";
import { Provider } from "react-redux";
import store from "./redux/store";
import { DrawerCustom } from "./components/DrawerCustom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppCustom: React.FC = () => {
  const { openDrawer } = useCustomSelector((state) => state.menuSlice);

  console.log("openDrawer:", openDrawer);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarCustom />
      <DrawerCustom />
      <Main open={openDrawer}>
        <Toolbar />
        <Typography paragraph>
          Welcome to your Electron React TypeScript Dashboard!
        </Typography>
      </Main>
    </Box>
  );
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppCustom />
    </Provider>
  );
};
