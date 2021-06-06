import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// TODO: pesquisar depois -> como usar interceptions para testes

export default api;
