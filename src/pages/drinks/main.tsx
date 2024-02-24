import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import 'react-quill/dist/quill.snow.css';
// import { useProduct } from '@/hooks';
import { setPageTitle } from '../../store/themeConfigSlice';
import { paths } from '@/paths';
import { useCreateCategory, useEditHome, useGetCategory, useGetSections, useUploadImage } from '@/hooks';
import { CategoryForm } from '../../../category/CategoryForm';
import { CategoryData } from '../../../category/CategoryData';
import { MainData } from '@/components/drinks/MainData';
import { DrinksHomeFormData, DrinksHomeFormSchema } from '@/types/drinks-home';
import { useMutateDrinksMain } from '@/hooks/drinks';

const MainDrinks = () => {
  const dispatch = useDispatch();
  const { uploadImage } = useUploadImage();

  const method = useForm<DrinksHomeFormData, DrinksHomeFormData>({
    resolver: valibotResolver(DrinksHomeFormSchema),
    defaultValues: {
      dinar: {
        description: {
          ar: '',
          en: '',
        },
        title: {
          ar: '',
          en: '',
        },
      },
      hindirin: {
        description: {
          ar: '',
          en: '',
        },
        title: {
          ar: '',
          en: '',
        },
      },
      nutritional: {
        description: {
          ar: '',
          en: '',
        },
        title: {
          ar: '',
          en: '',
        },
      },
      rayan: {
        title: {
          ar: '',
          en: '',
        },
      },
      softdrinks: {
        title: {
          ar: '',
          en: '',
        },
      },
      steelbul: {
        title: {
          ar: '',
          en: '',
        },
      },
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('Add Product'));
  });

  const { t } = useTranslation();
  const { updateDrinksMain, createAboutLoading } = useMutateDrinksMain();

  const handleCreateCategory = async (data: DrinksHomeFormData) => {
    console.log('data', data);
    updateDrinksMain(data);
  };

  const onSubmit = method.handleSubmit((e) => handleCreateCategory(e));

  const { data } = useGetSections('drinks', 'main');

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  // get category from firebase using react query

  useEffect(() => {
    method.reset({
      dinar: {
        description: {
          ar: data?.dinar?.description?.ar || '',
          en: data?.dinar?.description?.en || '',
        },
        title: {
          ar: data?.dinar?.title?.ar || '',
          en: data?.dinar?.title?.en || '',
        },
      },
      hindirin: {
        description: {
          ar: data?.hindirin?.description?.ar || '',
          en: data?.hindirin?.description?.en || '',
        },
        title: {
          ar: data?.hindirin?.title?.ar || '',
          en: data?.hindirin?.title?.en || '',
        },
      },
      nutritional: {
        description: {
          ar: data?.nutritional?.description?.ar || '',
          en: data?.nutritional?.description?.en || '',
        },
        title: {
          ar: data?.nutritional?.title?.ar || '',
          en: data?.nutritional?.title?.en || '',
        },
      },
      rayan: {
        title: {
          ar: data?.rayan?.title?.ar || '',
          en: data?.rayan?.title?.en || '',
        },
        description: {
          ar: data?.rayan?.description?.ar || '',
          en: data?.rayan?.description?.en || '',
        },
      },
      softdrinks: {
        title: {
          ar: data?.softdrinks?.title?.ar || '',
          en: data?.softdrinks?.title?.en || '',
        },
        description: {
          ar: data?.softdrinks?.description?.ar || '',
          en: data?.softdrinks?.description?.en || '',
        },
      },
      steelbul: {
        title: {
          ar: data?.steelbul?.title?.ar || '',
          en: data?.steelbul?.title?.en || '',
        },
        description: {
          ar: data?.steelbul?.description?.ar || '',
          en: data?.steelbul?.description?.en || '',
        },
      },
    });
  }, [data]);

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href={paths.drinks.main} className="text-primary hover:underline">
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
          <MainData />
          <button disabled={createAboutLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {createAboutLoading ? (
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

export default MainDrinks;
