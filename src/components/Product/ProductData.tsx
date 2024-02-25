import { useTranslation } from 'react-i18next';
import Select from 'react-select/async';
import { Controller, useFormContext } from 'react-hook-form';
import { customAlphabet } from 'nanoid';
import { Input, TextArea } from '@/shared';
import { ProductFormData } from '@/types';
import { ProductSearch, useUploadImage } from '@/hooks';
import { useEffect, useState } from 'react';
import { useGetCategories } from '@/hooks/variants';

export const ProductData = () => {
  const [lan, setLan] = useState('en');
  const [search, setSearch] = useState<ProductSearch>({
    page: 1,
    limit: 50,
    search: '',
    direction: 'ASC',
  });
  const [categories, setCategories] = useState();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProductFormData, ProductFormData>();

  const { data, isError, isLoading } = useGetCategories(search?.page, search.limit, search?.search, search.direction);

  const { t } = useTranslation();

  useEffect(() => {
    const options: any = [];
    if (data?.length > 0) {
      data?.map((item: any) => {
        options.push({ title: item.categoryId, id: item.categoryId });
      });

      setCategories(options);
    }
  }, [data]);

  return (
    <div>
      <div className="flex flex-row justify-center">
        {' '}
        <button
          type="button"
          className={`${lan == 'ar' ? 'bg-primary text-white' : ''} btn btn-outline-info ltr:rounded-r-none rtl:rounded-l-none`}
          onClick={() => setLan('ar')}
        >
          Arabic
        </button>
        <button
          type="button"
          className={`${lan == 'en' ? 'bg-primary text-white' : ''} btn btn-outline-info rounded`}
          onClick={() => setLan('en')}
        >
          English
        </button>
      </div>
      <div className="mb-5 ml-5 flex items-center justify-between ">
        <h5 className="text-lg font-semibold dark:text-white-light">{t('product.product_data')}</h5>
      </div>

      <div className="mt-4 px-4">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="mb-4 w-full lg:w-1/2 ltr:lg:mr-6 rtl:lg:ml-6">
            <div className="flex flex-col items-start">
              {lan === 'en' && (
                <Input
                  id="title"
                  placeholder={t('product.product_name')}
                  error={errors.enTitle}
                  label={t('product.product_name')}
                  required
                  {...register('enTitle')}
                />
              )}
              {lan === 'ar' && (
                <Input
                  id="title"
                  placeholder={t('product.product_name')}
                  error={errors.arTitle}
                  label={t('product.product_name')}
                  required
                  {...register('arTitle')}
                />
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            {/* Slug */}
            <div className="flex flex-col items-start">
              {lan === 'en' && (
                <TextArea
                  id="description"
                  placeholder={t('product.description')}
                  label={t('product.description')}
                  error={errors.enDescription}
                  rows={5}
                  {...register('enDescription')}
                />
              )}
              {lan === 'ar' && (
                <TextArea
                  id="description"
                  placeholder={t('product.description')}
                  label={t('product.description')}
                  error={errors.arDescription}
                  rows={5}
                  {...register('arDescription')}
                />
              )}
            </div>
            <div className="flex flex-col items-start mt-4">
              <div className="mt-4 w-full">
                <label htmlFor="category">{t('category.category')}</label>
                <div className="custom-select">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => {
                      return (
                        <Select
                          getOptionValue={(option: any) => `${option.id as string}`}
                          getOptionLabel={(option: any) => option.title as string}
                          placeholder={t('category.category')}
                          noOptionsMessage={() => t('no_options')}
                          instanceId="category_select"
                          defaultOptions={categories}
                          value={value}
                          onChange={(e) => onChange(e)}
                        />
                      );
                    }}
                  />
                  {errors && <div className="text-red-500">{errors?.arDescription?.type}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
