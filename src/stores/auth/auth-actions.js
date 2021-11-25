import { authActions } from './auth-slice';
import { cartActions } from '../cart/cart-slice';
import {
  setExpirationTimestamp,
  login as saveLoginToken,
  logout as processLogout,
  removeExpirationTimestamp,
  getExpirationTimestamp,
} from '../../helpers/auth';
import postLoginData from '../../helpers/api/post-login-data';
import postLogoutData from '../../helpers/api/post-logout-data';
import getUserProfile from '../../helpers/api/get-user-profile';
import { BASE_CONTENT_URL } from '../../config/api';

export const initAuth = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(runLogoutTimer(getExpirationTimestamp()));

      const isLoggedIn = getState().auth.isLoggedIn;

      if (isLoggedIn) {
        const userDataResponse = await getUserProfile();
        const userData = userDataResponse.data;
        const user = {
          name: userData.name,
          profile_photo: `${BASE_CONTENT_URL}${userData.photo_profile_url}`,
          email: userData.email,
          phone_number: userData.phone_number,
          addresses: userData.addresses,
        };

        dispatch(authActions.setUser({ user }));
      }

    } catch (error) {
      dispatch(logout());
    }
  }
};

export const login = (loginData) => {
  return async (dispatch) => {
    const response = await postLoginData(loginData);

    const { access_token: token, expires_in: expiresIn } = response.data;

    const now = Math.floor(Date.now());
    const later = now + (+expiresIn) * 1000;

    saveLoginToken(token);
    setExpirationTimestamp(later);

    const userDataResponse = await getUserProfile();
    const userData = userDataResponse.data;
    const user = {
      name: userData.name,
      profile_photo: `${BASE_CONTENT_URL}${userData.photo_profile_url}`,
      email: userData.email,
      phone_number: userData.phone_number,
      addresses: userData.addresses,
    };

    dispatch(authActions.login({ token, expirationTime: later, user }));
    dispatch(runLogoutTimer(later));
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await postLogoutData();
    } catch (err) {
      console.log(err);
    }

    removeLoggedInAttribute(dispatch);
  };
};

export const runLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    const now = Math.floor(Date.now());
    const remainingTime = expirationTime - now;

    if (remainingTime > 0) {
      setTimeout(() => {
        removeLoggedInAttribute(dispatch);
      }, remainingTime);
    } else {
      removeLoggedInAttribute(dispatch);
    }
  };
};

const removeLoggedInAttribute = (dispatch) => {
  dispatch(authActions.logout());

  processLogout();
  removeExpirationTimestamp();
  dispatch(cartActions.resetCart());
};