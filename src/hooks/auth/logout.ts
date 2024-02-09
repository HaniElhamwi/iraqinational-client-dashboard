import { toastBar } from '@/utils/comp/toastbar';
import { signOut } from '@firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../../firebase';

export const useLogout = (userId: string) => {
  const router = useRouter();
  const logout = async () => {
    try {
      signOut(auth)
        .then(() => {
          toastBar({ message: 'logout successfully' });
          router.push('/login');
        })
        .catch((error) => {
          // An error happened.
          console.error('logout', error);
          toastBar({ message: 'Something went wrong', err: true });
        });
    } catch (err) {
      console.error('update', err);
    }
  };

  return { logout };
};
