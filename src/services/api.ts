import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wallhaven.cc/api/v1',
});

api.interceptors.request.use(async cfg => {
  const apiKey = localStorage.getItem('api-key');
  if (!cfg.params) {
    cfg.params = {};
  }
  cfg.params.apikey = apiKey;
  return cfg;
});

export default api;
