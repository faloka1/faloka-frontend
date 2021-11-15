import { createSlice } from "@reduxjs/toolkit";

import { getExpirationTimestamp, isLoggedIn, getToken } from "../../helpers/auth";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: isLoggedIn(),
    token: getToken(),
    expirationTime: getExpirationTimestamp(),
    user: null,
  },
  reducers: {
    login(state, action) {
      const { token, expirationTime, user } = action.payload;

      state.token = token;
      state.expirationTime = expirationTime;
      state.isLoggedIn = true;
      state.user = user;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.expirationTime = null;
      state.user = null
    },
    setUser(state, action) {
      const { user } = action.payload;

      state.user = user;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;