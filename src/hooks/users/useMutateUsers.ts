import { catchError, getApiHeader } from '@/utils';
import { toastBar } from '@/utils/comp/toastbar';
import { useMutation } from 'react-query';

interface IUpdateUser {
  role: 'admin' | 'user' | 'seller';
  isDisabled: boolean;
  verified: boolean;
  userId?: string;
}

const updateUser = async (updateUserData: IUpdateUser) => {
  const userId = updateUserData.userId;

  const headers = getApiHeader();

  if (updateUserData.userId) delete updateUserData.userId;
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/' + userId, {
      method: 'PUT',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        ...updateUserData,
      }),
    });

    catchError(response);

    toastBar({ message: 'user updated successfully' });
    return await response.json();
  } catch (err) {
    console.error('update', err);
  }
};

export const useUpdateUser = () => {
  const { mutateAsync, isLoading, error } = useMutation((requestData: IUpdateUser) => updateUser(requestData), {
    onSuccess: () => {
      //   router.push(paths.products.index);
    },
  });
  return {
    updateUser: mutateAsync,
    updateUserLoading: isLoading,
    updateUserError: error,
  };
};
