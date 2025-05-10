import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ShoppingCart as SalesIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
// import { Link } from "react-router-dom";
import { IItemMenu } from "../../main/interfaces";

interface IDataProps {
  primary: IItemMenu;
  items: IItemMenu[];
  open: boolean;
  handleOpen: () => void;
}

export const ListItemIconCustom = ({
  primary,
  items,
  open,
  handleOpen,
}: IDataProps): JSX.Element => {
  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>{primary.icon}</ListItemIcon>
        <ListItemText primary={primary.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {items.map((item) => (
          <ListItemButton
            key={item.title}
            sx={{ pl: 4 }}
            onClick={() => {
              console.log(item);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </Collapse>
    </>
  );
};
