import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:18080/api',
});
