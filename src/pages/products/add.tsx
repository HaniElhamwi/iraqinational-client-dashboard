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
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { toastBar } from '@/utils/comp/toastbar';
import { useRouter } from 'next/router';

const createRandomId = () => {
  return Math.floor(Math.random() * 1000000);
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const [uploadLoading, setUploadLoading] = useState(false);
  const { uploadImage } = useUploadImage();

  const method = useForm<ProductFormData, ProductFormData>({
    resolver: valibotResolver(ProductFormSchema),
    defaultValues: {
      enTitle: '',
      arTitle: '',
      enDescription: '',
      arDescription: '',
      image: [],
    },
  });

  useEffect(() => {
    dispatch(setPageTitle('Add Product'));
  });

  const { t } = useTranslation();
  const router = useRouter();

  const createProduct = async (product: ProductFormData) => {
    try {
      const washingtonRef = doc(db, 'products', product.category.title);
      const res = await updateDoc(washingtonRef, {
        products: arrayUnion({
          title: {
            en: product.enTitle,
            ar: product.arTitle,
          },
          image: product.image,
          id: createRandomId(),
          description: {
            en: product.enDescription,
            ar: product.arDescription,
          },
        }),
      });
      setUploadLoading(false);

      toastBar({ message: 'product added successfully' });
    } catch {
      setUploadLoading(false);
      toastBar({ message: 'Error adding the product' });
    }
  };

  const handleCreateProduct = async (data: ProductFormData) => {
    setUploadLoading(true);
    if (data.image[0]?.file) {
      const image = await uploadImage(data.image[0]?.file);
      createProduct({ ...data, image });
      method.reset();
      router.push(paths.products.index);
    } else {
      createProduct({ ...data });
      method.reset();
      router.push(paths.products.index);
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

          <button disabled={uploadLoading} type="submit" className="btn btn-primary mt-5 ml-5">
            {uploadLoading ? (
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
