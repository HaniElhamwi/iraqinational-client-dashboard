import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import { toastBar } from '@/utils/comp/toastbar';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const editDrinksMain = async (collection: string, field: string, data: any) => {
  try {
    await setDoc(doc(db, collection, field), data);
    toastBar({ message: 'operated successfully' });
    return 'success';
  } catch (err) {
    console.error('update', err);
  }
};

export const useMutateGlobal = ({ collection, field }: { collection: string; field: string }) => {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = useMutation((requestData: any) => editDrinksMain(collection, field, requestData), {
    onSuccess: () => {},
  });
  return {
    mutateAsync,
    isLoading,
    error,
  };
};
