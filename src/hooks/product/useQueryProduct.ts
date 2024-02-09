import { useQuery } from 'react-query';
import { redirect } from 'next/navigation';

export interface ProductSearch {
  page: number;
  limit: number;
  search: string;
  direction: 'ASC' | 'DESC';
}

const fetchProducts = async (props: ProductSearch) => {
  const params = new URLSearchParams();
  params.append('page', props.page.toString());
  params.append('limit', props.limit.toString());
  params.append('direction', props.direction);
  params.append('admin', 'admin');

  if (props.search) {
    params.append('name', props.search);
  }
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products?' + params, { credentials: 'include' });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const res = await response.json();

  return res;
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
  const fetchProduct = async (id: number) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products/' + id);

      const res = await response.json();

      if (res.statusCode == 400) throw new Error('product not found');

      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const { data, isLoading, isError } = useQuery(['product', id], async () => fetchProduct(parseInt(id)), {
    onSuccess: () => {},
    onError: () => {},
  });

  return { data: data, isLoading, isError };
};
