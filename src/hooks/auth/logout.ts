import { toastBar } from '@/utils/comp/toastbar';
import { useRouter } from 'next/router';

export const useLogout = (userId: string) => {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/logout/' + userId, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toastBar({ message: 'logout successfully' });
      router.push('/login');
      const res = await response.json();
      return res;
    } catch (err) {
      console.error('update', err);
    }
  };

  return { logout };
};
