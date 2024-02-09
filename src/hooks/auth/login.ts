import { paths } from '@/paths';
import { useAuth } from '@/store';
import { LoginFormData } from '@/types/login-form-data';
import { setAuthToken } from '@/utils';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

export const useLogin = () => {
  const router = useRouter();
  const { login: loginHandler } = useAuth();
  const login = async (userData: LoginFormData) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/login/admin', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
        }),
      });
      const res = await response.json();

      return res;
    } catch (err) {
      console.error('update', err);
    }
  };
  const { mutateAsync, isLoading, error } = useMutation((requestData: LoginFormData) => login(requestData), {});
  return {
    login: mutateAsync,
    loginLoading: isLoading,
    loginError: error,
  };
};
