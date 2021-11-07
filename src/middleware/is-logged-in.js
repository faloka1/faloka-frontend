import { isLoggedIn as isLoggedInHelper } from '../helpers/auth';

export const isLoggedIn = () => {
  return isLoggedInHelper();
}