import { createSlice } from "@reduxjs/toolkit";

const initialStateSidebar = () => {
  try {
    return localStorage.getItem("appbar.open") === "true";
  } catch (e) {
    return true;
  }
};

export const appbarSlice = createSlice({
  name: "appbar",
  initialState: {
    open: initialStateSidebar(),
  },
  reducers: {
    toggleSidebar: (state) => {
      const newState = !state.open;
      state.open = newState;
      localStorage.setItem("appbar.open", newState);
    },
  },
});

export const { toggleSidebar } = appbarSlice.actions;
export default appbarSlice.reducer;