import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../../../firebase';

const fetchDepartments = async () => {
  const docRef = doc(db, 'drinks', 'departments');
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const useGetDepartments = () => {
  const { data, isLoading, isError } = useQuery([], () => fetchDepartments(), {
    keepPreviousData: true,
  });

  return { data: data, isLoading, isError };
};
