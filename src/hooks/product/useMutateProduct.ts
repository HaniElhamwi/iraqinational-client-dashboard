import { useMutation, useQueryClient } from 'react-query';
import { ProductFormData } from '@/types';
import { toastBar } from '@/utils/comp/toastbar';
import { catchError, getApiHeader } from '@/utils';

const createProduct = async (product: ProductFormData) => {
  delete product.userId;
  delete product.id;
  const category = product.categoryId?.id.toString();
  const headers = getApiHeader();
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products', {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        ...product,
        category,
      }),
    });

    catchError(response);

    toastBar({ message: 'product added successfully' });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('update', err);
  }
};

export const useCreateProduct = () => {
  const { mutateAsync, isLoading, error } = useMutation((requestData: ProductFormData) => createProduct(requestData), {
    onSuccess: () => {
      //   router.push(paths.products.index);
    },
  });
  return {
    createProduct: mutateAsync,
    createProductLoading: isLoading,
    creteProductError: error,
  };
};

const updateProduct = async (product: ProductFormData) => {
  const headers = getApiHeader();
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products/' + product.id, {
      method: 'PUT',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        ...product,
        categoryId: '2',
        category: product?.categoryId?.id?.toString(),
      }),
    });
    catchError(response);
    toastBar({ message: 'product updated successfully' });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('update', err);
  }
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, error } = useMutation((requestData: ProductFormData) => updateProduct(requestData), {
    onSuccess: () => {
      //   router.push(paths.products.index);
    },
  });

  return {
    updateProduct: mutateAsync,
    updateProductLoading: isLoading,
    updateProductError: error,
  };
};

const deleteProduct = async (prodId: string) => {
  const headers = getApiHeader();

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/products/' + prodId, {
      method: 'DELETE',
      credentials: 'include',
      headers,
      body: JSON.stringify({}),
    });

    catchError(response);

    // toastBar({ message: 'product added successfully' });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('update', err);
  }
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, error } = useMutation((requestData: string) => deleteProduct(requestData), {
    onSuccess: () => {
      //   router.push(paths.products.index);
      queryClient.invalidateQueries('products/getAll');
    },
  });

  return {
    deleteProduct: mutateAsync,
    deleteProductLoading: isLoading,
    deleteProductError: error,
  };
};
