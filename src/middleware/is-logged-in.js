import { isLoggedIn as isLoggedInHelper } from '../helpers/auth';

export const isLoggedIn = () => {
  console.log('logged in running')
  return isLoggedInHelper();
}