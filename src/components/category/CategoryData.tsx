import { useTranslation } from 'react-i18next';

import Select from 'react-select/async';
import { Controller, useFormContext } from 'react-hook-form';
import { customAlphabet } from 'nanoid';

import { Input, TextArea } from '@/shared';
import { CategoryFormData, ProductFormData } from '@/types';
import { useGetCategories } from '@/hooks';
import { useState } from 'react';

export const CategoryData = () => {
  const {
    register,
    control,
    getValues,
    setValue,

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
                  {...register((lan + 'Title') as 'enTitle' | 'arTitle', {
                    value: getValues('enTitle') || getValues('arTitle'),
                  })}
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
                  {...register((lan + 'Title') as 'enTitle' | 'arTitle', {
                    value: getValues('enTitle') || getValues('arTitle'),
                  })}
                />
              )}
            </div>
            <div className="flex flex-col items-start mt-3">
              {/* <Input
                id="first option"
                placeholder={t('home.firstOption')}
                error={errors[(lan + 'FirstOption') as 'enFirstOption' | 'arFirstOption'] as any}
                label={t('home.firstOption')}
                required
                {...register((lan + 'FirstOption') as 'enFirstOption' | 'arFirstOption')}
              /> */}
              {lan === 'en' && (
                <Input
                  id={lan + 'FirstOption'}
                  key={lan + 'FirstOption'}
                  placeholder={t('home.firstOption' + 'EN')}
                  error={errors['enFirstOption']}
                  label={t('home.firstOption')}
                  required
                  {...register((lan + 'FirstOption') as 'enFirstOption' | 'arFirstOption', {
                    value: getValues('enFirstOption') || getValues('arFirstOption'),
                  })}
                />
              )}
              {lan === 'ar' && (
                <Input
                  id={lan + 'FirstOption'}
                  key={lan + 'FirstOption'}
                  placeholder={t('home.firstOption' + 'AR')}
                  error={errors['arFirstOption']}
                  label={t('home.firstOption')}
                  required
                  {...register((lan + 'FirstOption') as 'enFirstOption' | 'arFirstOption', {
                    value: getValues('enFirstOption') || getValues('arFirstOption'),
                  })}
                />
              )}
            </div>

            <div className="flex flex-col items-start mt-3">
              {/* <Input
                id="second option"
                placeholder={t('home.secondOption')}
                error={errors[(lan + 'SecondOption') as 'enSecondOption' | 'arSecondOption']}
                label={t('home.secondOption')}
                required
                {...register((lan + 'SecondOption') as 'enSecondOption' | 'arSecondOption')}
              /> */}
              {lan === 'en' && (
                <Input
                  id={lan + 'SecondOption'}
                  key={lan + 'SecondOption'}
                  placeholder={t('home.secondOption' + 'EN')}
                  error={errors['enSecondOption']}
                  label={t('home.secondOption')}
                  required
                  {...register((lan + 'SecondOption') as 'enSecondOption' | 'arSecondOption', {
                    value: getValues('enSecondOption') || getValues('arSecondOption'),
                  })}
                />
              )}
              {lan === 'ar' && (
                <Input
                  id={lan + 'SecondOption'}
                  key={lan + 'SecondOption'}
                  placeholder={t('home.secondOption' + 'AR')}
                  error={errors['arSecondOption']}
                  label={t('home.secondOption')}
                  required
                  {...register((lan + 'SecondOption') as 'enSecondOption' | 'arSecondOption', {
                    value: getValues('enSecondOption') || getValues('arSecondOption'),
                  })}
                />
              )}
            </div>

            <div className="flex flex-col items-start mt-3">
              {/* <Input
                id="third option"
                placeholder={t('home.thirdOption')}
                error={errors[(lan + 'ThirdOption') as 'enThirdOption' | 'arThirdOption']}
                label={t('home.thirdOption')}
                required
                {...register((lan + 'ThirdOption') as 'enThirdOption' | 'arThirdOption')}
              /> */}
              {lan === 'en' && (
                <Input
                  id={lan + 'ThirdOption'}
                  key={lan + 'ThirdOption'}
                  placeholder={t('home.thirdOption' + 'EN')}
                  error={errors['enThirdOption']}
                  label={t('home.thirdOption')}
                  required
                  {...register((lan + 'ThirdOption') as 'enThirdOption' | 'arThirdOption', {
                    value: getValues('enThirdOption') || getValues('arThirdOption'),
                  })}
                />
              )}

              {lan === 'ar' && (
                <Input
                  id={lan + 'ThirdOption'}
                  key={lan + 'ThirdOption'}
                  placeholder={t('home.thirdOption' + 'AR')}
                  error={errors['arThirdOption']}
                  label={t('home.thirdOption')}
                  required
                  {...register((lan + 'ThirdOption') as 'enThirdOption' | 'arThirdOption', {
                    value: getValues('enThirdOption') || getValues('arThirdOption'),
                  })}
                />
              )}
            </div>

            <div className="flex flex-col items-start mt-3">
              {/* <Input
                id="fourth option"
                placeholder={t('home.fourthOption')}
                error={errors[(lan + 'FourthOption') as 'enFourthOption' | 'arFourthOption']}
                label={t('home.fourthOption')}
                required
                {...register((lan + 'FourthOption') as 'enFourthOption' | 'arFourthOption')}
              /> */}
              {lan === 'en' && (
                <Input
                  id={lan + 'FourthOption'}
                  key={lan + 'FourthOption'}
                  placeholder={t('home.fourthOption' + 'EN')}
                  error={errors['enFourthOption']}
                  label={t('home.fourthOption')}
                  required
                  {...register((lan + 'FourthOption') as 'enFourthOption' | 'arFourthOption', {
                    value: getValues('enFourthOption') || getValues('arFourthOption'),
                  })}
                />
              )}
              {lan === 'ar' && (
                <Input
                  id={lan + 'FourthOption'}
                  key={lan + 'FourthOption'}
                  placeholder={t('home.fourthOption' + 'AR')}
                  error={errors['arFourthOption']}
                  label={t('home.fourthOption')}
                  required
                  {...register((lan + 'FourthOption') as 'enFourthOption' | 'arFourthOption', {
                    value: getValues('enFourthOption') || getValues('arFourthOption'),
                  })}
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
              {lan === 'en' && (
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
              )}

              {lan === 'ar' && (
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
              )}
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
