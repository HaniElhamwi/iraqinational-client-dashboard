import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ProductSearch } from '..';
import { getApiHeader } from '@/utils';

const fetchNews = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/news', { credentials: 'include' });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const res = await response.json();
  return res;
};

export const useGetNews = () => {
  const { data, isLoading, isError } = useQuery(['news/getAll'], () => fetchNews(), {
    keepPreviousData: true,
  });

  return { data: data, isLoading, isError };
};

const fetchSingleNews = async (id: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/news/' + id, { credentials: 'include' });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const res = await response.json();
  return res;
};

export const useGetSingleNews = (id: string) => {
  const { data, isLoading, isError } = useQuery(['news', id], () => fetchSingleNews(id));

  return { data: data, isLoading, isError };
};

