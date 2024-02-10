import { useMutation, useQueryClient } from 'react-query';
import { ProductFormData } from '@/types';
import { toastBar } from '@/utils/comp/toastbar';
import { catchError, getApiHeader } from '@/utils';
import { db } from '../../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const createProduct = async (product: ProductFormData) => {
  try {
    const washingtonRef = doc(db, 'products', product.category);

    await updateDoc(washingtonRef, {
      products: [
        {
          title: {
            en: product.enTitle,
            ar: product.arTitle,
          },
          image: product.image,
        },
      ],
    });

    toastBar({ message: 'product added successfully' });

    return ['success'];
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
  try {
    console.log(product);

    const docRef = doc(db, 'products', product.categoryId as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const productsData = docSnap.data().products.map((prod: any) => {
        if (prod.id === product.id) {
          prod = {
            title: {
              en: product.enTitle,
              ar: product.arTitle,
            },
            description: {
              en: product.enDescription,
              ar: product.arDescription,
            },
            image: product.image,
            id: product.id,
          };
        }
        return prod;
      });
      const washingtonRef = doc(db, 'products', product.categoryId as string);
      await updateDoc(washingtonRef, {
        products: productsData,
      });
      toastBar({ message: 'product updated successfully' });
    } else {
      toastBar({ message: 'No such document!' });
    }
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
