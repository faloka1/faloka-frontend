import { authActions } from './auth-slice';
import {
  setExpirationTimestamp,
  login as saveLoginToken,
  logout as processLogout,
  removeExpirationTimestamp,
  getToken
} from '../../helpers/auth';
import axios from 'axios';

const logoutURL = "http://192.168.100.7:8000/api/auth/logout";

export const login = (token, expiresIn) => {
  return async (dispatch) => {
    const now = Math.floor(Date.now());
    const later = now + (+expiresIn) * 1000 * 60;

    dispatch(authActions.login({ token, expirationTime: later }));
    saveLoginToken(token);

    setExpirationTimestamp(later);
    dispatch(runLogoutTimer(later));
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    axios.post(
      logoutURL,
      {},
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      },
    );

    dispatch(
      authActions.logout()
    );

    processLogout();
    removeExpirationTimestamp();
  };
};

export const runLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    const now = Math.floor(Date.now());
    const remainingTime = expirationTime - now;

    if (remainingTime > 0) {
      setTimeout(() => {
        dispatch(authActions.logout())
      }, remainingTime);
    } else {
      dispatch(authActions.logout());
    }
  };
};