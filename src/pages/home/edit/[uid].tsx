import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardEvent, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import 'react-quill/dist/quill.snow.css';
import { CategoryFormData, CategoryFormSchema } from '@/types';

import { setPageTitle } from '../../../store/themeConfigSlice';
import { paths } from '@/paths';
import { useEditCategory, useGetCategory, useUploadImage } from '@/hooks';
import { CategoryForm } from '@/components/category/CategoryForm';
import { useRouter } from 'next/router';

const EditProduct = () => {
  const dispatch = useDispatch();
  const { updateCategory, updateCategoryError, updateCategoryLoading } = useEditCategory();
  const { uploadImage } = useUploadImage();
  const router = useRouter();

  const { data, isLoading } = useGetCategory((router.query.uid || '') as string);

  const method = useForm<CategoryFormData, CategoryFormData>({
    resolver: valibotResolver(CategoryFormSchema),
    defaultValues: {
      title: undefined,
      image: '',
      description: '',
      published: false,
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('Add Product'));
  });

  const { t } = useTranslation();

  const handleUpdateCategory = async (categoryData: CategoryFormData) => {
    if (categoryData.image[0]?.file) {
      const image = await uploadImage(categoryData.image[0]?.file);
      updateCategory({ ...categoryData, image });
    } else {
      updateCategory({ ...categoryData, image: data.image });
    }
  };

  const onSubmit = method.handleSubmit((e) => handleUpdateCategory(e));

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  useEffect(() => {
    if (data && !isLoading) {
      method.reset({
        description: String(data?.description ?? ''),
        image: [
          {
            key: data?.image,
            dataURL: data?.image,
          },
        ],
        title: String(data?.title ?? ''),
        id: data?.id,
        published: data?.published,
      });
    }
  }, [isLoading, data]);

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href={paths.home.index} className="text-primary hover:underline">
            {t('home.home')}
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{t('home.edit_category')}</span>
        </li>
      </ul>

      <FormProvider {...method}>
        <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          <CategoryForm />
          <button disabled={updateCategoryLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {updateCategoryLoading ? (
              <span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle" />
            ) : (
              t('category.edit_category')
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditProduct;
