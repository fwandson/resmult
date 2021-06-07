import axios from 'axios';

const delay = (amount: number) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.response.use(async (request) => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    await delay(3000);
  }
  return request;
});

export default api;
