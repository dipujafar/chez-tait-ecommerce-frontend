/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;

      // Store token in Cookies for middleware authentication
      Cookies.set("chez-tati-access-token", token, { path: "/" });
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      // Remove token from cookie
      Cookies.remove("chez-tati-access-token", { path: "/" });
    },
  },
});

// selectors
export const selectUser = (state: any) => state.auth.user;
export const selectToken = (state: any) => state.auth.token;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
