import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import 'react-quill/dist/quill.snow.css';
// import { useProduct } from '@/hooks';
import { HomeFormData, HomeFormSchema } from '@/types';
import { setPageTitle } from '../../store/themeConfigSlice';
import { paths } from '@/paths';
import { useCreateCategory, useEditHome, useGetCategory, useUploadImage } from '@/hooks';
import { CategoryForm } from '../../../category/CategoryForm';
import { CategoryData } from '../../../category/CategoryData';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { createCategory, createCategoryLoading, creteCategoryError } = useCreateCategory();
  const { uploadImage } = useUploadImage();
  const [category, setCategory] = useState('transportation');

  const method = useForm<HomeFormData, HomeFormData>({
    resolver: valibotResolver(HomeFormSchema),
    defaultValues: {
      enTitle: '',
      arTitle: '',
      enDescription: '',
      arDescription: '',
      enFirstOption: '',
      arFirstOption: '',
      enSecondOption: '',
      arSecondOption: '',
      enThirdOption: '',
      arThirdOption: '',
      enFourthOption: '',
      arFourthOption: '',
      category: 'transportation',
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('Add Product'));
  });

  const { t } = useTranslation();
  const { updateCategory, updateCategoryError, updateCategoryLoading } = useEditHome({ homeName: category });

  const handleCreateCategory = async (data: HomeFormData) => {
    // if (data.image[0]?.file) {
    //   const image = await uploadImage(data.image[0]?.file);
    //   createCategory({ ...data, image });
    //   method.reset();
    // } else {
    //   createCategory(data);
    //   method.reset();
    // }
    // console.log(data);
    console.log(data);
    updateCategory(data);
  };

  const onSubmit = method.handleSubmit((e) => handleCreateCategory(e));

  const { data } = useGetCategory(category);

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  // get category from firebase using react query

  useEffect(() => {
    method.reset({
      arDescription: data?.description?.ar,
      enDescription: data?.description?.en,
      arTitle: data?.title?.ar,
      enTitle: data?.title?.en,
      arFirstOption: data?.firstoption.ar,
      enFirstOption: data?.firstoption.en,
      arSecondOption: data?.secondoption.ar,
      enFourthOption: data?.fourthoption.en,
      arFourthOption: data?.fourthoption.ar,
      arThirdOption: data?.thirdoption.ar,
      enThirdOption: data?.thirdoption.en,
      enSecondOption: data?.secondoption.en,
    });
  }, [data]);

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href={paths.home.index} className="text-primary hover:underline">
            {t('home.home')}
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{t('home.add_category')}</span>
        </li>
      </ul>

      <FormProvider {...method}>
        <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          {/* <CategoryForm /> */}
          <CategoryData setCategory={setCategory} category={category} />
          <button disabled={createCategoryLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {createCategoryLoading ? (
              <span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle" />
            ) : (
              t('home.add_category')
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
