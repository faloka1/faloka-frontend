export const login = (token) => {
  localStorage.setItem('token', token);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  localStorage.getItem('token');
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  return false;
};

export const setExpirationTimestamp = (expTime) => {
  localStorage.setItem('expiration_timestamp', expTime);
};

export const getExpirationTimestamp = () => {
  return localStorage.getItem('expiration_timestamp');
};

export const removeExpirationTimestamp = () => {
  localStorage.removeItem('expiration_timestamp');
};