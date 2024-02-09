import { useMutation, useQueryClient } from 'react-query';
import { CategoryFormData, ProductFormData } from '@/types';
import { toastBar } from '@/utils/comp/toastbar';
import { catchError, getApiHeader } from '@/utils';

const createCategory = async (category: CategoryFormData) => {
  delete category.id;
  delete category.updatedAt;
  delete category.createdAt;

  //   if (product.categoryId) delete product.categoryId;

  const headers = getApiHeader();
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category', {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        ...category,
      }),
    });
    catchError(response);
    toastBar({ message: 'Category Added  successfully' });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('update', err);
  }
};

export const useCreateCategory = () => {
  const { mutateAsync, isLoading, error } = useMutation((requestData: CategoryFormData) => createCategory(requestData), {
    onSuccess: () => {
      //   router.push(paths.products.index);
    },
  });
  return {
    createCategory: mutateAsync,
    createCategoryLoading: isLoading,
    creteCategoryError: error,
  };
};

const editCategory = async (category: CategoryFormData) => {
  delete category.updatedAt;
  delete category.createdAt;
  const headers = getApiHeader();

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category/' + category.id, {
      method: 'PUT',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        ...category,
      }),
    });

    catchError(response);

    toastBar({ message: 'Category Edit Successfully' });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('update', err);
  }
};

export const useEditCategory = () => {
  const { mutateAsync, isLoading, error } = useMutation((requestData: CategoryFormData) => editCategory(requestData), {
    onSuccess: () => {
      //   router.push(paths.products.index);
    },
  });
  return {
    updateCategory: mutateAsync,
    updateCategoryLoading: isLoading,
    updateCategoryError: error,
  };
};

//  create delete category funciton
const deleteCategory = async (id: number) => {
  const headers = getApiHeader();
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category/' + id, {
      method: 'DELETE',
      credentials: 'include',
      headers,
    });

    catchError(response);
    toastBar({ message: 'Category Deleted Successfully' });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('update', err);
  }
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, error } = useMutation((id: number) => deleteCategory(id), {
    onSuccess: () => {
      //   router.push(paths.products.index);
      queryClient.invalidateQueries('categories/getAll');
    },
  });
  return {
    deleteCategory: mutateAsync,
    deleteCategoryLoading: isLoading,
    deleteCategoryError: error,
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
