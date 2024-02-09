import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { valibotResolver } from '@hookform/resolvers/valibot';

import 'react-quill/dist/quill.snow.css';

import { paths } from '@/paths';
import { ProductForm, Loader } from '@/components';
import { useGetProduct, useUpdateProduct, useUploadImage } from '@/hooks';
import { setPageTitle } from '@/store/themeConfigSlice';
import { ProductFormData, ProductFormSchema } from '@/types';

const AddProduct = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [uploadLoading, setUploadLoading] = useState(false);

  const { updateProduct, updateProductLoading } = useUpdateProduct();
  const { uploadImage } = useUploadImage();

  const { data, isError, isLoading } = useGetProduct(router?.query?.uid as string);

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
      published: false,
      city: '',
      showPlace: false,
      country: '',
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('Edit Product'));
  });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      method.reset({
        categoryId: data?.category,
        description: String(data?.description ?? ''),
        price: data?.price ?? '',
        quantity: data?.quantity,
        title: String(data?.title ?? ''),
        userId: data?.userId,
        id: data?.id,
        published: data?.published,
        city: data?.city,
        showPlace: data?.showPlace,
        country: data?.country,
        images: data?.images,
      });
    }
  }, [data, isError, isLoading, method]);

  const { t } = useTranslation();

  const handleEditProduct = async (prodData: ProductFormData) => {
    const imagesData = [];

    setUploadLoading(true);
    if (prodData?.images?.length) {
      for (const file of prodData.images) {
        if (typeof file !== 'string') {
          const image = await uploadImage(file.file);
          imagesData.push(image);
        } else {
          imagesData.push(file);
        }
      }

      updateProduct({ ...prodData, images: imagesData });
      setUploadLoading(false);
    } else {
      updateProduct({ ...prodData });
      setUploadLoading(false);
    }
  };

  const onSubmit = method.handleSubmit((data) => handleEditProduct(data));

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <div>
      {/* Show Loader if loading */}
      {isLoading && <Loader />}

      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href={paths.products.index} className="text-primary hover:underline">
            {t('product.product')}
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{t('product.edit_product')}</span>
        </li>
      </ul>

      <FormProvider {...method}>
        <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          <ProductForm />

          <button disabled={updateProductLoading || uploadLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {updateProductLoading || uploadLoading ? (
              <span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle" />
            ) : (
              t('product.update_product')
            )}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddProduct;
