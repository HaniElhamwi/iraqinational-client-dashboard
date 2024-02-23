import { DepartmentsFormData } from '@/types/departments';
import { toastBar } from '@/utils/comp/toastbar';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { db } from '../../../firebase';

const createDepartments = async (images: DepartmentsFormData) => {
  try {
    await setDoc(doc(db, 'drinks', 'departments'), {
      images: [...images.images],
    });
    toastBar({ message: 'Department images uploaded successfully' });
    return 'success';
  } catch (err) {
    console.error('update', err);
  }
};

export const useMutateDepartment = () => {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = useMutation((requestData: DepartmentsFormData) => createDepartments(requestData), {
    onSuccess: () => {},
  });
  return {
    createDepartment: mutateAsync,
    createDepartmentLoading: isLoading,
    createDepartmentError: error,
  };
};
