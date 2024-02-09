import { useMutation, useQueryClient } from 'react-query';
import { CategoryFormData, ProductFormData } from '@/types';
import { toastBar } from '@/utils/comp/toastbar';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { catchError, getApiHeader } from '@/utils';
import { db } from '../../../firebase';
import { useRouter } from 'next/router';
import { paths } from '@/paths';

const createRandomId = () => {
  return Math.floor(Math.random() * 1000000);
};

const createCategory = async (category: CategoryFormData) => {
  const randomId = createRandomId();
  try {
    await setDoc(doc(db, 'home', randomId.toString()), {
      id: randomId.toString(),
      title: {
        en: category.enTitle,
        ar: category.arTitle,
      },
      description: {
        en: category.enDescription,
        ar: category.arDescription,
      },
      image: category.image,
      firstOption: {
        en: category.enFirstOption,
        ar: category.arFirstOption,
      },
      secondOption: {
        en: category.enSecondOption,
        ar: category.arSecondOption,
      },
      thirdOption: {
        en: category.enThirdOption,
        ar: category.arThirdOption,
      },
      fourthOption: {
        en: category.enFourthOption,
        ar: category.arFourthOption,
      },
    });
    toastBar({ message: 'Home Section Added  successfully' });
    return 'success';
  } catch (err) {
    console.error('update', err);
  }
};

export const useCreateCategory = () => {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = useMutation((requestData: CategoryFormData) => createCategory(requestData), {
    onSuccess: () => {
      router.push(paths.home.index);
    },
  });
  return {
    createCategory: mutateAsync,
    createCategoryLoading: isLoading,
    creteCategoryError: error,
  };
};

const editCategory = async (category: CategoryFormData) => {
  try {
    const washingtonRef = doc(db, 'home', category?.id || '12345');

    await updateDoc(washingtonRef, {
      title: {
        en: category.enTitle,
        ar: category.arTitle,
      },
      description: {
        en: category.enDescription,
        ar: category.arDescription,
      },
      image: category.image,
      firstOption: {
        en: category.enFirstOption,
        ar: category.arFirstOption,
      },
      secondOption: {
        en: category.enSecondOption,
        ar: category.arSecondOption,
      },
      thirdOption: {
        en: category.enThirdOption,
        ar: category.arThirdOption,
      },
      fourthOption: {
        en: category.enFourthOption,
        ar: category.arFourthOption,
      },
    });
    toastBar({ message: 'Category Edit Successfully' });
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
