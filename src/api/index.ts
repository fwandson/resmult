import axios from 'axios';

const delay = (amount: number) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.response.use(async (request) => {
  if (['development', 'test'].some((elem) => elem === process.env.NODE_ENV)) {
    await delay(Number(process.env.REACT_APP_API_DELAY));
  }
  return request;
});

export default api;
