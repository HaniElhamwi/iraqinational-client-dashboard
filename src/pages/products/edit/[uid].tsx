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
  const [product, setProduct] = useState<any>(null);

  const { data, isError, isLoading } = useGetProduct(router?.query?.uid as string);
  // get product params

  const method = useForm<ProductFormData, ProductFormData>({
    resolver: valibotResolver(ProductFormSchema),
    defaultValues: {
      arDescription: '',
      arTitle: '',
      category: '',
      enDescription: '',
      enTitle: '',
      image: '',
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('Edit Product'));
  });

  useEffect(() => {
    if (product) {
      method.reset({
        arDescription: product?.description['ar'],
        arTitle: product?.title['ar'],
        category: 'ttttttt',
        categoryId: router?.query?.uid as string,
        enDescription: product?.description['en'],
        enTitle: product?.title['en'],
        image: [
          {
            key: product?.image,
            dataURL: product?.image,
          },
        ],
        id: product?.id,
      });
    }
  }, [product]);

  const { t } = useTranslation();

  const handleEditProduct = async (prodData: ProductFormData) => {
    console.log('its updateing productss');
    setUploadLoading(true);
    const image: string = prodData.image[0].dataURL;
    if (prodData.image[0]?.file) {
      const image = await uploadImage(prodData.image[0]?.file);
      updateProduct({ ...prodData, image });
      setUploadLoading(false);
    } else {
      updateProduct({ ...prodData, image });
      setUploadLoading(false);
    }
    router.push(paths.products.index);
  };

  const onSubmit = method.handleSubmit((data) => handleEditProduct(data));

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  useEffect(() => {
    if (data) {
      const product = data?.products?.filter((product: any) => product.id == router.query.product);

      if (product) {
        setProduct(product[0]);
      } else {
        router.push(paths.products.index);
      }
    }
  }, [data]);

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
