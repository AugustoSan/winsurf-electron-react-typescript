import React from "react";
import { IItemMenu } from "../../main/interfaces";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

interface IDataProps {
  item: IItemMenu;
}

export const MenuItem = ({ item }: IDataProps): JSX.Element => {
  const { title, href, icon } = item;
  return (
    <ListItem button>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};
