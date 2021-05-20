import axios from 'axios';

// TODO: pesquisar mais como usar os .envs para tipos de hambiente (test, dev, production)
export const getBaseURL = () => {
  const url = {
    development: process.env.REACT_APP_API_BASE_URL_DEV,
    production: process.env.REACT_APP_API_BASE_URL_PROD,
    test: process.env.REACT_APP_API_BASE_URL_TEST,
  };
  return url[process.env.NODE_ENV] || process.env.REACT_APP_API_BASE_URL_PROD;
};

const api = axios.create({
  baseURL: getBaseURL(),
});

export default api;
