import { useTranslation } from 'react-i18next';

import Select from 'react-select/async';
import { Controller, useFormContext } from 'react-hook-form';
import { customAlphabet } from 'nanoid';

import { Input, TextArea } from '@/shared';
import { ProductFormData } from '@/types';
import { ProductSearch, useGetCategories, useUploadImage } from '@/hooks';
import { useState } from 'react';
import { countryList } from '@/data';

const nanoid = customAlphabet('1234567890', 12);

export const ProductData = () => {
  const [search, setSearch] = useState<ProductSearch>({
    page: 1,
    limit: 50,
    search: '',
    direction: 'ASC',
  });
  const [values, setValues] = useState([]);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProductFormData, ProductFormData>();

  const { data, isError, isLoading } = useGetCategories(search?.page, search.limit, search?.search, search.direction);

  const { uploadImage } = useUploadImage();

  const { t } = useTranslation();

  const filterColors = (inputValue: string) => {
    if (!inputValue.length) {
      return countryList;
    }
    const colourOptions = countryList;
    return colourOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<{ label: string; value: string }[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  return (
    <div>
      <div className="mb-5 ml-5 flex items-center justify-between ">
        <h5 className="text-lg font-semibold dark:text-white-light">{t('product.product_data')}</h5>
      </div>

      <div className="mt-4 px-4">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="mb-4 w-full lg:w-1/2 ltr:lg:mr-6 rtl:lg:ml-6">
            <div className="flex flex-col items-start">
              <Input
                id="title"
                placeholder={t('product.product_name')}
                error={errors.title}
                label={t('product.product_name')}
                required
                {...register('title')}
              />
            </div>

            <div className="mt-4 flex flex-col items-start">
              <Input
                id="price"
                placeholder={t('product.price')}
                error={errors.price}
                label={t('product.price')}
                required
                {...register('price')}
              />
              {errors.description && <span className="text-red-500">{t(`${errors.description?.message}`)}</span>}
            </div>
            <div className="mt-4 flex flex-col items-start">
              <Input
                id="quantity"
                placeholder={t('product.quantity')}
                error={errors.price}
                label={t('product.quantity')}
                required
                {...register('quantity')}
              />
              {errors.description && <span className="text-red-500">{t(`${errors.description?.message}`)}</span>}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            {/* Slug */}
            <div className="flex flex-col items-start">
              <TextArea
                id="description"
                placeholder={t('product.description')}
                label={t('product.description')}
                error={errors.description}
                rows={5}
                {...register('description')}
              />
            </div>
            <div className="flex flex-col items-start mt-4">
              <div className="mt-4 w-full">
                <label htmlFor="category">{t('category.category')}</label>
                <div className="custom-select">
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field: { name, onBlur, onChange, value } }) => {
                      return (
                        <Select
                          getOptionValue={(option: any) => `${option.id as string}`}
                          getOptionLabel={(option: any) => option.title as string}
                          placeholder={t('category.category')}
                          noOptionsMessage={() => t('no_options')}
                          instanceId="category_select"
                          defaultOptions={data?.data}
                          value={value}
                          onChange={(e) => onChange(e)}
                        />
                      );
                    }}
                  />
                  {errors.categoryId && <div className="text-red-500">choose category</div>}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start mt-3">
              <div className=" w-full">
                <label htmlFor="category">{t('users.published')}</label>
                <div className="custom-select">
                  <Controller
                    name="published"
                    control={control}
                    render={({ field: { name, value, onChange } }) => {
                      return (
                        <Select
                          getOptionValue={(option): string => option.value as any}
                          getOptionLabel={(option: any) => option?.title}
                          placeholder={t('users.role')}
                          noOptionsMessage={() => t('no_options')}
                          instanceId="category_select"
                          defaultOptions={[
                            { value: true, title: 'published' },
                            { value: false, title: 'disabled' },
                          ]}
                          name={name}
                          value={{ value: value, title: value ? 'published' : 'disabled' }}
                          onChange={(e) => onChange(e?.value)}
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>{' '}
            <div className="flex flex-col items-start mt-3">
              <div className=" w-full">
                <label htmlFor="category">{t('users.showPlace')}</label>
                <div className="custom-select">
                  <Controller
                    name="showPlace"
                    control={control}
                    render={({ field: { name, value, onChange } }) => {
                      return (
                        <Select
                          getOptionValue={(option): string => option.value as any}
                          getOptionLabel={(option: any) => option?.title}
                          placeholder={t('product.showPlace')}
                          noOptionsMessage={() => t('no_options')}
                          instanceId="category_select"
                          defaultOptions={[
                            { value: true, title: 'show place' },
                            { value: false, title: 'disabled' },
                          ]}
                          name={name}
                          value={{ value: value, title: value ? 'show place' : 'disabled' }}
                          onChange={(e) => onChange(e?.value)}
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>{' '}
            <div className="flex flex-col items-start mt-3">
              <div className=" w-full">
                <label htmlFor="category">{t('users.country')}</label>
                <div className="custom-select">
                  <Controller
                    name="country"
                    control={control}
                    render={({ field: { name, value, onChange } }) => {
                      return (
                        <Select
                          getOptionValue={(option) => option.value}
                          getOptionLabel={(option) => option.label}
                          placeholder={t('users.country')}
                          noOptionsMessage={() => t('no_options')}
                          instanceId="category_select"
                          name={name}
                          cacheOptions
                          loadOptions={promiseOptions}
                          value={{
                            value: value,
                            label: value,
                          }}
                          onChange={(e) => onChange(e?.value)}
                          isSearchable
                        />
                      );
                    }}
                  />
                  {errors.country && <span className="text-red-500">{t(`${errors.country?.message}`)}</span>}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-start">
              <Input
                id="city"
                placeholder={t('product.city')}
                error={errors.city}
                label={t('product.city')}
                required
                {...register('city')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
