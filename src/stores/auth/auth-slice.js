import { createSlice } from "@reduxjs/toolkit";

import { getExpirationTimestamp, isLoggedIn } from "../../helpers/auth";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: isLoggedIn(),
    expirationTime: getExpirationTimestamp(),
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice;