import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

// ? Set in .env files. Configures api url development and production
// ? Formerly used const { apiUrl } = config, 
// ? where apiUrl = "http://localhost:3090/api" in development
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// REACT_APP_API_URL=http://localhost:3090/api  // development
// REACT_APP_API_URL=https://vast-ravine-16609.herokuapp.com/api // production

// defined when user is logged in and undefined when not so header won't be set
export function setJwt(jsonWebToken) {
  axios.defaults.headers.common['x-auth-token'] = jsonWebToken;
}
// These errors are handled globally, so needn't repeat in each component.
// (sucess, error => ... )
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log('Logging an error', error);
    logger.log(error);
    toast.error(`An unexpected error occured...${error.message}`);
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
