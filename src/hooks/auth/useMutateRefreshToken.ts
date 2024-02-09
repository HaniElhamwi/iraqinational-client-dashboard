import { useAuth } from '@/store';
import { getApiHeader } from '@/utils';
import { useMutation } from 'react-query';

const refreshTokenHandler = async () => {
  const headers = getApiHeader();
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/refresh-token', {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({}),
    });
    const res = await response.json();
    if (res.accessToken) {
      localStorage.setItem('access_token', res.accessToken);
    }

    return res;
  } catch (err) {
    console.error('update', err);
  }
};

export const useRefreshToken = () => {
  const { login: loginHandler } = useAuth();
  const { mutateAsync, isLoading, error } = useMutation(() => refreshTokenHandler(), {
    onSuccess: (data) => {},
  });
  return {
    refreshToken: mutateAsync,
    refreshTokenLoading: isLoading,
    refreshTokenError: error,
  };
};
