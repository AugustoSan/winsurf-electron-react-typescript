import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMenuSlice {
  selectOption: string;
  id: number | null;
  openDrawer: boolean;
}

const initialState: IMenuSlice = {
  selectOption: "/",
  id: 0,
  openDrawer: true,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSelectMenu: (state, action: PayloadAction<string>) => {
      console.log("entro en setSelectMenu");
      state.selectOption = action.payload;
    },
    setIdMenu: (state, action: PayloadAction<number | null>) => {
      console.log("entro en setIdMenu");
      state.id = action.payload;
    },
    setOpenDrawer: (state, action: PayloadAction<boolean>) => {
      console.log("entro en setOpenDrawer");
      state.openDrawer = action.payload;
    },
  },
});

export const { setSelectMenu, setIdMenu, setOpenDrawer } = menuSlice.actions;

export default menuSlice.reducer;
