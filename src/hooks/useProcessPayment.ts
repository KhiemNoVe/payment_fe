import { useMutation } from '@tanstack/react-query';
import { processPayment } from '../service';

const useProcessPayment = () => {
  return useMutation({
    mutationKey: ['process_payment'],
    mutationFn: processPayment,
    onSuccess: (_data) => {
      if (_data.success) alert('Success !');
    },
  });
};

export default useProcessPayment;
