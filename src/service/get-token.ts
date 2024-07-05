import { clientRequest } from './request';

export const getToken = async () => {
  const response = await clientRequest().get('/payment/token');
  return response.data || {};
};
