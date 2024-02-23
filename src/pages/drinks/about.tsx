import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import 'react-quill/dist/quill.snow.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { paths } from '@/paths';
import { useUploadImage } from '@/hooks';
import { useRouter } from 'next/router';
import { useMutateDrinksAbout } from '@/hooks/drinks';
import { useQueryDrinksAbout } from '@/hooks/drinks/useQueryDrinks';
import { DrinkAboutFormData, DrinkAboutFormSchema } from '@/types/drinkAbout';
import { AboutForm } from '@/components/drinks/aboutForm';

const Departments = () => {
  const dispatch = useDispatch();
  const [uploadLoading, setUploadLoading] = useState(false);
  const { uploadImage } = useUploadImage();

  const method = useForm<DrinkAboutFormData, DrinkAboutFormData>({
    resolver: valibotResolver(DrinkAboutFormSchema),
    defaultValues: {
      arDescription: '',
      arSubTitle: '',
      arTitle: '',
      enDescription: '',
      enSubTitle: '',
      enTitle: '',
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('departments.certifications'));
  });

  const { t } = useTranslation();
  const router = useRouter();

  const { data, isError, isLoading } = useQueryDrinksAbout();
  const { createAbout, createAboutError, createAboutLoading } = useMutateDrinksAbout();

  console.log(data);
  const handleCreateProduct = async (data: DrinkAboutFormData) => {
    setUploadLoading(true);
    createAbout({
      arDescription: data.arDescription,
      arSubTitle: data.arSubTitle,
      arTitle: data.arTitle,
      enDescription: data.enDescription,
      enSubTitle: data.enSubTitle,
      enTitle: data.enTitle,
    });
    setUploadLoading(false);
  };

  useEffect(() => {
    if (data && !isLoading && !isError) {
      method.reset({
        arDescription: data?.description?.ar,
        arSubTitle: data?.subTitle?.ar,
        arTitle: data?.title?.ar,
        enDescription: data?.description?.en,
        enSubTitle: data?.subTitle?.en,
        enTitle: data?.title?.en,
      });
    }
  }, [data, isError, isLoading, method]);

  const onSubmit = method.handleSubmit((e) => handleCreateProduct(e));

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href={paths.products.index} className="text-primary hover:underline">
            {t('drinks.certifications')}
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{t('drinks.certifications')}</span>
        </li>
      </ul>

      <FormProvider {...method}>
        <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          <AboutForm />

          <button disabled={uploadLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {uploadLoading ? (
              <span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle" />
            ) : (
              t('save')
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Departments;
