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
import { DepartmentFrom } from '@/components/drinks/departmentFrom';
import { DepartmentsFormData, DepartmentsFormSchema } from '@/types/departments';
import { useMutateCertifications, useMutateDepartment } from '@/hooks/drinks';
import { useGetDepartments } from '@/hooks/drinks/useQueryDrinks';

const Departments = () => {
  const dispatch = useDispatch();
  const [uploadLoading, setUploadLoading] = useState(false);
  const { uploadImage } = useUploadImage();

  const method = useForm<DepartmentsFormData, DepartmentsFormData>({
    resolver: valibotResolver(DepartmentsFormSchema),
    defaultValues: {
      images: [],
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('departments.certifications'));
  });

  const { t } = useTranslation();
  const router = useRouter();

  const { createCertifications, createCertificationsError, createCertificationsLoading } = useMutateCertifications();
  const { data, isError, isLoading } = useGetDepartments({ departmentName: 'certifications' });

  const handleCreateProduct = async (data: DepartmentsFormData) => {
    const imagesData = [];
    setUploadLoading(true);
    if (data?.images?.length) {
      for (const file of data.images) {
        if (file?.file) {
          const image = await uploadImage(file.file);
          imagesData.push(image);
        } else {
          imagesData.push(file);
        }
      }
      createCertifications({ images: imagesData });
      setUploadLoading(false);
    } else {
      //   createProduct({ ...data });
      setUploadLoading(false);
    }
  };

  useEffect(() => {
    if (data && !isLoading && !isError) {
      method.reset({
        images: data?.images,
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
          <DepartmentFrom />

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
