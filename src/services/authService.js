import jwtDecode from 'jwt-decode'; // export default function from module
import httpService from './httpService';
import config from '../config.json';

const { apiUrl } = config;
const apiEndpoint = `/auth`;
const tokenKey = 'auth-token';

httpService.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    console.warn('User not logged in', ex);
    return null;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function login(email, password) {
  console.log('authService login()');
  const { data: jwt } = await httpService.post(apiEndpoint, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  console.log('logout()');
  try {
    localStorage.removeItem(tokenKey);
  } catch (ex) {
    console.warn(ex);
  }
}

export default { login, logout, getCurrentUser, loginWithJwt, getJwt };
