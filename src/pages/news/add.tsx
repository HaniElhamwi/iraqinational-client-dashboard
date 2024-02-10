import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardEvent, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import 'react-quill/dist/quill.snow.css';
// import { useProduct } from '@/hooks';
import { NewsFormData, NewsFormSchema } from '@/types';
import { setPageTitle } from '../../store/themeConfigSlice';
import { paths } from '@/paths';
import { useCreateNews, useUploadImage } from '@/hooks';
import { NewsForm } from '@/components';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { createNews, createNewsLoading, creteNewsError } = useCreateNews();
  const { uploadImage } = useUploadImage();

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
    dispatch(setPageTitle('Add Product'));
  });

  const { t } = useTranslation();

  const handleCreateNews = async (data: NewsFormData) => {
    delete data.createdAt;
    delete data.updatedAt;
    delete data.id;
    if (data.image[0]?.file) {
      const image = await uploadImage(data.image[0]?.file);
      createNews({ ...data, image });
      method.reset();
    } else {
      createNews(data);
      method.reset();
    }
  };

  const onSubmit = method.handleSubmit((e) => handleCreateNews(e));

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

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
          <button disabled={createNewsLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {createNewsLoading ? (
              <span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle" />
            ) : (
              t('news.add_news')
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
