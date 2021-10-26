import { authActions } from './auth-slice';
import {
  setExpirationTimestamp,
  login as saveLoginToken,
  logout as processLogout,
  removeExpirationTimestamp,
} from '../../helpers/auth';
import postLoginData from '../../helpers/api/post-login-data';
import postLogoutData from '../../helpers/api/post-logout-data';

export const login = (loginData) => {
  return async (dispatch) => {
    const response = await postLoginData(loginData);

    const { access_token: token, expires_in: expiresIn } = response.data;

    const now = Math.floor(Date.now());
    const later = now + (+expiresIn) * 1000 * 60;

    dispatch(authActions.login({ token, expirationTime: later }));
    saveLoginToken(token);

    setExpirationTimestamp(later);
    dispatch(runLogoutTimer(later));
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      postLogoutData();
    } catch (err) {
      console.log(err);
    }

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