import { clientRequest } from './request';

export const processPayment = async ({
  amount,
  nonce,
}: {
  amount: number;
  nonce: string;
}) => {
  const response = await clientRequest().post('/payment/process-payment', {
    amount,
    nonce,
  });
  return response.data || {};
};
