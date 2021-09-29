import { createSlice } from "@reduxjs/toolkit";

import { getExpirationTimestamp, isLoggedIn, getToken } from "../../helpers/auth";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: isLoggedIn(),
    token: getToken(),
    expirationTime: getExpirationTimestamp(),
  },
  reducers: {
    login(state, action) {
      const { token, expirationTime } = action.payload;

      state.token = token;
      state.expirationTime = expirationTime;
      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.expirationTime = null;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;