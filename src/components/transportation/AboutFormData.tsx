import { useTranslation } from 'react-i18next';
import Select from 'react-select/async';
import { Controller, useFormContext } from 'react-hook-form';
import { customAlphabet } from 'nanoid';
import { Input, TextArea } from '@/shared';
import { ProductSearch, useUploadImage } from '@/hooks';
import { useEffect, useState } from 'react';
import { useGetCategories } from '@/hooks/variants';
import { TransportationAboutFormData } from '@/types/transportationAbout';

const nanoid = customAlphabet('1234567890', 12);

export const AboutFormData = () => {
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
  } = useFormContext<TransportationAboutFormData, TransportationAboutFormData>();

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
          <div className="w-full lg:w-1/2">
            {/* Slug */}
            <div className="flex flex-col items-start">
              {lan === 'en' && (
                <TextArea
                  id="description"
                  placeholder={t('product.description')}
                  label={t('product.description')}
                  error={errors.title?.en}
                  rows={5}
                  {...register('title.en')}
                />
              )}
              {lan === 'ar' && (
                <TextArea
                  id="description"
                  placeholder={t('product.description')}
                  label={t('product.description')}
                  error={errors.title?.ar}
                  rows={5}
                  {...register('title.ar')}
                />
              )}
            </div>
            {/* <div className="flex flex-col items-start mt-4">
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
                  {errors.category && <div className="text-red-500">{errors.category.message}</div>}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
