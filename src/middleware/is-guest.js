import { isLoggedIn as isLoggedInHelper } from '../helpers/auth';

export const isGuest = () => {
  return !isLoggedInHelper();
}