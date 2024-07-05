import { useQuery } from '@tanstack/react-query';
import { getToken } from '../service';

const useGetToken = () => {
  return useQuery({
    queryKey: ['get_token'],
    queryFn: getToken,
  });
};

export default useGetToken;
