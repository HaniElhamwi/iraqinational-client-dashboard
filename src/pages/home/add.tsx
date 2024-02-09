import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardEvent, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { valibotResolver } from '@hookform/resolvers/valibot';

import 'react-quill/dist/quill.snow.css';

// import { useProduct } from '@/hooks';
import { CategoryFormData, CategoryFormSchema } from '@/types';

import { setPageTitle } from '../../store/themeConfigSlice';
import { paths } from '@/paths';
import { useCreateCategory, useUploadImage } from '@/hooks';
import { CategoryForm } from '@/components/category/CategoryForm';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { createCategory, createCategoryLoading, creteCategoryError } = useCreateCategory();
  const { uploadImage } = useUploadImage();

  const method = useForm<CategoryFormData, CategoryFormData>({
    resolver: valibotResolver(CategoryFormSchema),
    defaultValues: {
      title: undefined,
      image: '',
      description: '',
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('Add Product'));
  });

  const { t } = useTranslation();

  const handleCreateCategory = async (data: CategoryFormData) => {
    delete data.createdAt;
    delete data.updatedAt;
    delete data.id;
    if (data.image[0]?.file) {
      const image = await uploadImage(data.image[0]?.file);
      createCategory({ ...data, image });
      method.reset();
    } else {
      createCategory(data);
      method.reset();
    }
  };

  const onSubmit = method.handleSubmit((e) => handleCreateCategory(e));

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href={paths.home.index} className="text-primary hover:underline">
            {t('home.home')}
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{t('category.add_category')}</span>
        </li>
      </ul>

      <FormProvider {...method}>
        <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          <CategoryForm />
          <button disabled={createCategoryLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {createCategoryLoading ? (
              <span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle" />
            ) : (
              t('category.add_category')
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
