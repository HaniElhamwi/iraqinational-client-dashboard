import { useTranslation } from 'react-i18next';
import { Input } from '@/shared';
import { useState } from 'react';
import { CategoryFormData } from '@/types/category-form-data';
import { useFormContext } from 'react-hook-form';

export const CategoryData = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CategoryFormData, CategoryFormData>();
  const [lan, setLan] = useState<'en' | 'ar'>('en');

  const { t } = useTranslation();

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
        <h5 className="text-lg font-semibold dark:text-white-light">{t('home.category_data')}</h5>
      </div>

      <div className="mt-4 px-4">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="mb-4 w-full lg:w-1/2 ltr:lg:mr-6 rtl:lg:ml-6">
            <div className="flex flex-col items-start">
              {lan === 'en' && (
                <Input
                  id={lan + 'Title'}
                  key={lan + 'Title'}
                  placeholder={t('product.product_name' + 'EN')}
                  error={errors['enTitle']}
                  label={t('product.product_name')}
                  required
                  {...register('enTitle' as 'enTitle' | 'arTitle', {})}
                />
              )}
              {lan === 'ar' && (
                <Input
                  id={lan + 'Title'}
                  key={lan + 'Title'}
                  placeholder={t('product.product_name' + 'AR')}
                  error={errors['arTitle']}
                  label={t('product.product_name')}
                  required
                  {...register('arTitle' as 'enTitle' | 'arTitle', {})}
                />
              )}
            </div>

            {/* <div className="mt-4 flex flex-col items-start">
              <Input
                id="price"
                placeholder={t('product.price')}
                error={errors.price}
                label={t('product.price')}
                required
                {...register('price')}
              />
              {errors.description && <span className="text-red-500">{t(`${errors.description?.message}`)}</span>}
            </div> */}
          </div>

          <div className="w-full lg:w-1/2">
            {/* Slug */}
            <div className="flex flex-col items-start">
              {/* <TextArea
                id="description"
                placeholder={t('product.description')}
                label={t('product.description')}
                error={errors[(lan + 'Description') as 'enDescription' | 'arDescription']}
                rows={5}
                {...register((lan + 'Description') as 'enDescription' | 'arDescription')}
              /> */}
              {/* {lan === 'en' && (
                <TextArea
                  id={lan + 'Description'}
                  key={lan + 'Description'}
                  placeholder={t('product.description' + 'EN')}
                  label={t('product.description')}
                  error={errors['enDescription']}
                  rows={5}
                  {...register((lan + 'Description') as 'enDescription' | 'arDescription', {
                    value: getValues('enDescription') || getValues('arDescription'),
                  })}
                />
              )} */}

              {/* {lan === 'ar' && (
                <TextArea
                  id={lan + 'Description'}
                  key={lan + 'Description'}
                  placeholder={t('product.description' + 'AR')}
                  label={t('product.description')}
                  error={errors['arDescription']}
                  rows={5}
                  {...register((lan + 'Description') as 'enDescription' | 'arDescription', {
                    value: getValues('enDescription') || getValues('arDescription'),
                  })}
                />
            )} */}
            </div>
            <div className="flex flex-col items-start mt-4">
              <div className="mt-4 w-full">
                {/* <label htmlFor="category">{t('category.category')}</label> */}
                <div className="custom-select">
                  {/* <Controller
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
                          defaultOptions={data}
                          value={value}
                          onChange={(e) => onChange(e)}
                        />
                      );
                    }}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
