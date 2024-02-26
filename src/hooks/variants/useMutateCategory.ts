import { useMutation, useQueryClient } from 'react-query';
import { HomeFormData, ProductFormData } from '@/types';
import { toastBar } from '@/utils/comp/toastbar';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { catchError, getApiHeader } from '@/utils';
import { db } from '../../../firebase';
import { useRouter } from 'next/router';
import { paths } from '@/paths';
import { CategoryFormData } from '@/types/category-form-data';

const createRandomId = () => {
  return Math.floor(Math.random() * 1000000);
};

const createCategory = async (category: CategoryFormData) => {
  const randomId = createRandomId();
  try {
    await setDoc(doc(db, 'products', category.enTitle), {
      id: randomId.toString(),
      category: {
        en: category.enTitle,
        ar: category.arTitle,
      },
      image: category.image,
      categoryId: category.enTitle,
    });
    toastBar({ message: 'Category  Added  successfully' });
    return 'success';
  } catch (err) {
    console.error('update', err);
  }
};

export const useCreateCategory = () => {
  const router = useRouter();
  const { mutateAsync, isLoading, error } = useMutation((requestData: CategoryFormData) => createCategory(requestData), {
    onSuccess: () => {
      router.push(paths.category.index);
    },
  });
  return {
    createCategory: mutateAsync,
    createCategoryLoading: isLoading,
    creteCategoryError: error,
  };
};

const editCategory = async (category: HomeFormData) => {
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
      //    @ts-ignore
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
  const { mutateAsync, isLoading, error } = useMutation((requestData: HomeFormData) => editCategory(requestData), {
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
const deleteCategory = async (categoryId: string) => {
  const headers = getApiHeader();
  try {
    await deleteDoc(doc(db, 'products', categoryId));
    toastBar({ message: 'Category Deleted Successfully' });
    return 'success';
  } catch (err) {
    console.error('update', err);
  }
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, error } = useMutation((categoryId: string) => deleteCategory(categoryId), {
    onSuccess: () => {
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
