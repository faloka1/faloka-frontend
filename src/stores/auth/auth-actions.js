import { authActions } from './auth-slice';
import {
  setExpirationTimestamp,
  login as processLogin,
  logout as processLogout,
  removeExpirationTimestamp
} from '../../helpers/auth';

export const login = (token, expiresIn) => {
  return async (dispatch) => {
    const now = Math.floor(Date.now());
    const later = now + (+expiresIn) * 1000 * 60;

    dispatch(authActions.login());
    processLogin(token);

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

    console.log(remainingTime);

    if (remainingTime > 0) {
      setTimeout(() => {
        dispatch(logout())
      }, remainingTime);
    } else {
      dispatch(logout());
    }
  };
};