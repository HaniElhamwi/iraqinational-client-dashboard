import { ISearchOptions, UserFormData } from '@/types';
import { getApiHeader } from '@/utils';
import { useQuery } from 'react-query';

const fetchUsers = async ({ limit, page, direction = 'ASC', search = '' }: ISearchOptions) => {
  const headers = getApiHeader();
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  params.append('direction', direction);
  if (search) {
    params.append('name', search);
  }
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user?' + params, { credentials: 'include', headers });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const res = await response.json();

  return res;
};

export const useGetUsers = (page: number = 1, limit: number = 50, search: string = '', direction: 'ASC' | 'DESC' = 'ASC') => {
  const { data, isLoading, isError } = useQuery(
    ['categories', page, limit, search],
    () => fetchUsers({ direction: direction, limit: limit, page: page, search: search }),
    {
      keepPreviousData: true,
    },
  );

  return { data: data, isLoading, isError };
};

const fetchUser = async (userId: string) => {
  const headers = getApiHeader();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/' + userId, { credentials: 'include', headers });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const res = await response.json();

  return res;
};

export const useGetUser = (userId: string) => {
  const { data, isLoading, isError } = useQuery(['users', userId], (): Promise<UserFormData> => fetchUser(userId), {
    keepPreviousData: true,
  });

  return { data: data, isLoading, isError };
};
