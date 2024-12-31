import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: false,
    isDark: localStorage.getItem("theme")==="dark"?true:false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    toggleMode: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("theme",state.isDark?"dark":"light")
    },
  },
});
export const { toggleMenu, toggleMode } = appSlice.actions;
export default appSlice.reducer;
