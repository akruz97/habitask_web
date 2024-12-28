
import axios from 'axios';

export const baseURL = 'http://localhost:7070/api'

const habitaskApi = axios.create({baseURL});

// middleware de axios para agregar token u otro valor a las llamadas de la api
habitaskApi.interceptors.request.use(async config => {
  const token = await sessionStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
    config.headers.authorization = token;
  }
  return config;
});

export default habitaskApi;
