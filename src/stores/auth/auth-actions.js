import { authActions } from './auth-slice';
import {
  setExpirationTimestamp,
  login as saveLoginToken,
  logout as processLogout,
  removeExpirationTimestamp
} from '../../helpers/auth';

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
  return (dispatch) => {
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
        dispatch(logout())
      }, remainingTime);
    } else {
      dispatch(logout());
    }
  };
};