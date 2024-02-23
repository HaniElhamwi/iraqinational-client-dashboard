import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { db } from '../../../firebase';

const fetchDepartments = async (departmentName: string) => {
  const docRef = doc(db, 'drinks', departmentName);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const useGetDepartments = ({ departmentName }: { departmentName: string }) => {
  const { data, isLoading, isError } = useQuery([], () => fetchDepartments(departmentName), {
    keepPreviousData: true,
  });

  return { data: data, isLoading, isError };
};

const fetchAbout = async () => {
  const docRef = doc(db, 'drinks', 'about');
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const useQueryDrinksAbout = () => {
  const { data, isLoading, isError } = useQuery([], () => fetchAbout(), {
    keepPreviousData: true,
  });

  return { data: data, isLoading, isError };
};
