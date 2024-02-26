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

const deleteProduct = async (product: ProductFormData) => {
  try {
    const docRef = doc(db, 'products', product.categoryId as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const productsData = docSnap.data().products.filter((prod: any) => prod.id !== product.id);
      const washingtonRef = doc(db, 'products', product.categoryId as string);
      await updateDoc(washingtonRef, {
        products: productsData,
      });
      toastBar({ message: 'product deleted successfully' });
    } else {
      toastBar({ message: 'No such document!' });
    }
  } catch (err) {
    console.error('update', err);
  }
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading, error } = useMutation((requestData: ProductFormData) => deleteProduct(requestData), {
    onSuccess: () => {
      queryClient.invalidateQueries('products/getAll');
    },
  });

  return {
    deleteProduct: mutateAsync,
    deleteProductLoading: isLoading,
    deleteProductError: error,
  };
};
