// @ts-ignore
import Cookies from 'js-cookie';

export const setAuthToken = (key: string, token: string) => {
  Cookies.set(key, token); // Set the token with a 7-day expiration
};

export const getAuthToken = (key: string) => {
  return Cookies.get(key);
};

export const removeAuthToken = (key: string) => {
  Cookies.remove(key);
};
