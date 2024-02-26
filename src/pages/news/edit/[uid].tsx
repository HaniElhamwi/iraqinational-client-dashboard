import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardEvent, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import 'react-quill/dist/quill.snow.css';
import { HomeFormSchema, NewsFormData, NewsFormSchema } from '@/types';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { paths } from '@/paths';
import { useEditNews, useGetSingleNews, useUploadImage } from '@/hooks';
import { useRouter } from 'next/router';
import { NewsForm } from '@/components';

const EditProduct = () => {
  const dispatch = useDispatch();
  const { updateNews, updateNewsError, updateNewsLoading } = useEditNews();
  const { uploadImage } = useUploadImage();
  const router = useRouter();

  const { data, isLoading } = useGetSingleNews((router.query.uid || '') as string);

  const method = useForm<NewsFormData, NewsFormData>({
    resolver: valibotResolver(NewsFormSchema),
    defaultValues: {
      title: undefined,
      image: '',
      description: '',
      link: '',
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('Edit News'));
  });

  const { t } = useTranslation();

  const handleUpdateCategory = async (newsData: NewsFormData) => {
    try {
      if (newsData.image[0]?.file) {
        const image = await uploadImage(newsData.image[0]?.file);
        updateNews({ ...newsData, image });
      } else {
        updateNews({ ...newsData, image: data.image });
      }
    } catch (er) {
      console.log(er);
    }
  };

  //   @ts-ignore
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
        link: data?.link,
        subject: data?.subject,
      });
    }
  }, [data?.length, isLoading]);

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href={paths.news.index} className="text-primary hover:underline">
            {t('news.news')}
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{t('news.add_news')}</span>
        </li>
      </ul>

      <FormProvider {...method}>
        <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          <NewsForm />
          <button disabled={updateNewsLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {updateNewsLoading ? (
              <span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle" />
            ) : (
              t('news.edit_news')
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditProduct;
