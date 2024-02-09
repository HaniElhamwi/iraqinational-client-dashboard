import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { valibotResolver } from '@hookform/resolvers/valibot';

import 'react-quill/dist/quill.snow.css';

// import { useProduct } from '@/hooks';
import { ProductForm } from '@/components';
import { ProductFormData, ProductFormSchema } from '@/types';

import { setPageTitle } from '../../store/themeConfigSlice';
import { paths } from '@/paths';
import { useCreateProduct, useUploadImage } from '@/hooks';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { createProduct, createProductLoading, creteProductError } = useCreateProduct();
  const [uploadLoading, setUploadLoading] = useState(false);
  const { uploadImage } = useUploadImage();

  const method = useForm<ProductFormData, ProductFormData>({
    resolver: valibotResolver(ProductFormSchema),
    defaultValues: {
      categoryId: {},
      description: '',
      price: '',
      quantity: '',
      images: [],
      title: '',
      userId: 0,
      id: '',
      city: '',
      country: '',
      showPlace: false,
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('Add Product'));
  });

  const { t } = useTranslation();

  const handleCreateProduct = async (data: ProductFormData) => {
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
      createProduct({ ...data, images: imagesData });
      method.reset();

      setUploadLoading(false);
    } else {
      createProduct({ ...data });
      method.reset();
      setUploadLoading(false);
    }
  };

  const onSubmit = method.handleSubmit((e) => handleCreateProduct(e));

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href={paths.products.index} className="text-primary hover:underline">
            {t('product.product')}
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{t('product.add_product')}</span>
        </li>
      </ul>

      <FormProvider {...method}>
        <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          <ProductForm />

          <button disabled={createProductLoading || uploadLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {createProductLoading || uploadLoading ? (
              <span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle" />
            ) : (
              t('product.add_product')
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
