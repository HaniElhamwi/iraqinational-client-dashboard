import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardEvent, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { valibotResolver } from '@hookform/resolvers/valibot';

import 'react-quill/dist/quill.snow.css';

// import { useProduct } from '@/hooks';
import { HomeFormData, HomeFormSchema, UserFormData, UserFormSchema } from '@/types';

import { setPageTitle } from '../../../store/themeConfigSlice';
import { paths } from '@/paths';
// @ts-ignore
import { useCreateCategory, useEditCategory, useGetCategory, useGetUser, useUpdateUser } from '@/hooks';
import { CategoryForm } from '../../../../category/CategoryForm';
import { useRouter } from 'next/router';
import { Profile, UsersForm } from '@/components';

const EditProduct = () => {
  const dispatch = useDispatch();

  const { updateUser, updateUserError, updateUserLoading } = useUpdateUser();
  const router = useRouter();

  const { data, isLoading } = useGetUser((router.query.uid || '') as string);

  const method = useForm<UserFormData, UserFormData>({
    resolver: valibotResolver(UserFormSchema),
    defaultValues: {
      companyName: '',
      companyTaxNumber: '',
      email: '',
      id: '',
      phoneNumber: '',
      role: undefined,
      username: '',
      verified: false,
      website: '',
      isDisabled: undefined,
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('Add Product'));
  });

  const { t } = useTranslation();

  const onSubmit = method.handleSubmit((e) => {
    updateUser({
      isDisabled: method.getValues('isDisabled'),
      role: method.getValues('role') as 'admin' | 'user' | 'seller',
      userId: (router.query.uid || '') as string,
      verified: method.getValues('verified'),
    });
  });

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  useEffect(() => {
    if (data && !isLoading) {
      method.reset({
        companyName: data.companyName,
        companyTaxNumber: data.companyTaxNumber,
        email: data.email,
        id: data.id,
        phoneNumber: data.phoneNumber,
        role: data.role,
        username: data.username,
        verified: data.verified,
        website: data.website,
        isDisabled: data.isDisabled,
      });
    }
  }, [isLoading, data]);

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href={paths.users.index} className="text-primary hover:underline">
            {t('users.users')}
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{t('users.edit_user')}</span>
        </li>
      </ul>

      <FormProvider {...method}>
        <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          <Profile />
          <button disabled={updateUserLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {updateUserLoading ? (
              <span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle" />
            ) : (
              t('users.edit_user')
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditProduct;
