import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || '';

export const clientRequest = (headers?: any) => {
  return axios.create({
    baseURL: API_URL,
    headers,
  });
};
