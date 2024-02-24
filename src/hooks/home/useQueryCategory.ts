import { useQuery } from 'react-query';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { ProductSearch } from '..';
import { db } from '../../../firebase';

const fetchCategories = async (props: ProductSearch) => {
  const params = new URLSearchParams();
  params.append('page', props.page.toString());
  params.append('limit', props.limit.toString());
  params.append('direction', props.direction);
  params.append('admin', 'admin');

  //   if (props.search) params.append('name', props.search);

  //   const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category?' + params, { credentials: 'include' });
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const res = await response.json();
  //   return res;
  const q = query(collection(db, 'home'));

  const querySnapshot = await getDocs(q);
  const docs: any = [];
  querySnapshot.forEach((doc) => {
    docs.push(doc.data());
  });

  return docs;
};

export const useGetCategories = (page: number = 1, limit: number = 50, search: string = '', direction: 'ASC' | 'DESC' = 'ASC') => {
  const { data, isLoading, isError } = useQuery(
    ['categories/getAll', page, limit, search],
    () => fetchCategories({ direction: direction, limit: limit, page: page, search: search }),
    {
      keepPreviousData: true,
    },
  );

  return { data: data, isLoading, isError };
};

const fetchCategory = async (id: string) => {
  const docRef = doc(db, 'home', id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};
export const useGetCategory = (id: string) => {
  const { data, isLoading, isError } = useQuery(['categories', id], () => fetchCategory(id));
  return { data: data, isLoading, isError };
};

const fetchSections = async (field: string, id: string) => {
  const docRef = doc(db, field, id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};
export const useGetSections = (field: string, id: string) => {
  const { data, isLoading, isError } = useQuery(['categories', id], () => fetchSections(field, id));
  return { data: data, isLoading, isError };
};
