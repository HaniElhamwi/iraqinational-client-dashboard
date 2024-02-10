import { useQuery } from 'react-query';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../../firebase';

export interface ProductSearch {
  page: number;
  limit: number;
  search: string;
  direction: 'ASC' | 'DESC';
}

const fetchProducts = async (props: ProductSearch) => {
  const q = query(collection(db, 'products'));

  const querySnapshot = await getDocs(q);
  const products: any = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data?.products) {
      data.products.forEach((product: any) => {
        products.push({
          ...product,
          category: data?.category['en'],
          categoryId: data?.categoryId,
        });
      });
    }
  });
  return products;
};

export const useGetProducts = (page: number = 1, limit: number = 50, search: string = '', direction: 'ASC' | 'DESC' = 'ASC') => {
  const { data, isLoading, isError } = useQuery(
    ['products/getAll', page, limit, search],
    async () => fetchProducts({ direction: direction, limit: limit, page: page, search: search }),
    {
      keepPreviousData: true,
    },
  );

  return { data: data, isLoading, isError };
};

export const useGetProduct = (id: string) => {
  const fetchProduct = async (id: string) => {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (err) {
      console.log(err);
    }
  };
  const { data, isLoading, isError } = useQuery(['product', id], async () => fetchProduct(id), {
    onSuccess: () => {},
    onError: () => {},
  });

  return { data: data, isLoading, isError };
};
