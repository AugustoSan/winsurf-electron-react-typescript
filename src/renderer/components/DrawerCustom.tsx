import { Drawer, List, Box, Toolbar } from "@mui/material";
import { useCustomSelector } from "../hooks/redux";
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { MenuItem } from "./MenuItem";
import { ListItemIconCustom } from "./ListItemIconCustom";
import { useState } from "react";

const drawerWidth = 240;

export const DrawerCustom = (): JSX.Element => {
  const { openDrawer } = useCustomSelector((state) => state.menuSlice);
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={openDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemIconCustom
            primary={{ title: "Dashboard", href: "/", icon: <DashboardIcon /> }}
            items={[
              {
                title: "Graficas",
                href: "/graficas",
                icon: <DashboardIcon />,
              },
              {
                title: "Tablas",
                href: "/tablas",
                icon: <SettingsIcon />,
              },
            ]}
            open={open}
            handleOpen={() => setOpen(!open)}
          />
          <MenuItem
            item={{ title: "Dashboard", href: "/", icon: <DashboardIcon /> }}
          />
          <MenuItem
            item={{
              title: "Ventas",
              href: "/ventas",
              icon: <SettingsIcon />,
            }}
          />
          <MenuItem
            item={{
              title: "Configuración",
              href: "/configuracion",
              icon: <SettingsIcon />,
            }}
          />
        </List>
      </Box>
    </Drawer>
  );
};
