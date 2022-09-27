import httpService from './httpService';
import config from '../config.json';

const { apiUrl } = config;

const apiEndpoint = `/users`;

export function register(user) {
  return httpService.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
