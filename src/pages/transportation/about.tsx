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
import { AboutForm } from '@/components/drinks/aboutForm';
import { TransportationForm } from '@/components/transportation/TransportationMainForm';
import { useQueryGlobal } from '@/hooks/global';
import { useMutateGlobal } from '@/hooks/global/useMutateGlobal';
import { TransportationAboutFormData, TransportationAboutFormSchema } from '@/types/transportationAbout';
import { AboutFormData } from '@/components/transportation/AboutFormData';

const Transportation = () => {
  const dispatch = useDispatch();
  const [uploadLoading, setUploadLoading] = useState(false);
  const { uploadImage } = useUploadImage();

  const method = useForm<TransportationAboutFormData, TransportationAboutFormData>({
    resolver: valibotResolver(TransportationAboutFormSchema),
    defaultValues: {
      title: {
        ar: '',
        en: '',
      },
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('departments.certifications'));
  });

  const { t } = useTranslation();
  const router = useRouter();

  const { data, isError, isLoading } = useQueryGlobal({ collection: 'transportation', document: 'about' });
  const { error, isLoading: updateLoading, mutateAsync } = useMutateGlobal({ collection: 'transportation', field: 'about' });

  console.log(data);
  const handleCreateProduct = async (data: TransportationAboutFormData) => {
    setUploadLoading(true);
    mutateAsync({
      ar: data.title.ar,
      en: data.title.en,
    });

    setUploadLoading(false);
  };

  useEffect(() => {
    if (data && !isLoading && !isError) {
      method.reset({
        title: {
          ar: data.ar,
          en: data.en,
        },
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
          <AboutFormData />

          <button disabled={uploadLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {uploadLoading || isLoading || uploadLoading ? (
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

export default Transportation;
