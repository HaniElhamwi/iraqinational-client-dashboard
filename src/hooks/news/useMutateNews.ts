import { useMutation, useQueryClient } from 'react-query';
import { NewsFormData } from '@/types';
import { toastBar } from '@/utils/comp/toastbar';
import { catchError, getApiHeader } from '@/utils';

const createNews = async (news: NewsFormData) => {
  delete news.id;
  delete news.updatedAt;
  delete news.createdAt;

  const headers = getApiHeader();
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/news', {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        ...news,
      }),
    });
    catchError(response);
    toastBar({ message: 'News Added  successfully' });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('update', err);
  }
};

export const useCreateNews = () => {
  const { mutateAsync, isLoading, error } = useMutation((requestData: NewsFormData) => createNews(requestData), {
    onSuccess: () => {
      //   router.push(paths.products.index);
    },
  });
  return {
    createNews: mutateAsync,
    createNewsLoading: isLoading,
    creteNewsError: error,
  };
};

const editNews = async (news: NewsFormData) => {
  delete news.updatedAt;
  delete news.createdAt;
  const headers = getApiHeader();

  news.id = news?.id?.toString();

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/news/' + news.id, {
      method: 'PUT',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        ...news,
      }),
    });

    catchError(response);

    toastBar({ message: 'News Edit Successfully' });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('update', err);
  }
};

export const useEditNews = () => {
  const { mutateAsync, isLoading, error } = useMutation((requestData: NewsFormData) => editNews(requestData), {
    onSuccess: () => {
      //   router.push(paths.products.index);
    },
  });
  return {
    updateNews: mutateAsync,
    updateNewsLoading: isLoading,
    updateNewsError: error,
  };
};

//  create delete category funciton
const deleteNews = async (id: number) => {
  const headers = getApiHeader();
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/news/' + id, {
      method: 'DELETE',
      credentials: 'include',
      headers,
    });

    catchError(response);
    toastBar({ message: 'News Deleted Successfully' });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('update', err);
  }
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, error } = useMutation((id: number) => deleteNews(id), {
    onSuccess: () => {
      //   router.push(paths.products.index);
      queryClient.invalidateQueries('news/getAll');
    },
  });
  return {
    deleteNews: mutateAsync,
    deleteNewsLoading: isLoading,
    deleteNewsError: error,
  };
};

// const updateProduct = async (product: ProductFormData) => {
//   try {
//     const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products/' + product.id, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         ...product,
//         categoryId: '2',
//         category: product?.categoryId?.id?.toString(),
//       }),
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     toastBar({ message: 'product updated successfully' });
//     const res = await response.json();
//     return res;
//   } catch (err) {
//     console.error('update', err);
//   }
// };

// export const useUpdateProduct = () => {
//   const { mutateAsync, isLoading, error } = useMutation((requestData: ProductFormData) => updateProduct(requestData), {
//     onSuccess: () => {
//       //   router.push(paths.products.index);
//     },
//   });

//   return {
//     updateProduct: mutateAsync,
//     updateProductLoading: isLoading,
//     updateProductError: error,
//   };
// };
