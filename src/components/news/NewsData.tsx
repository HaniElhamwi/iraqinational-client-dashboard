import { useTranslation } from 'react-i18next';

import Select from 'react-select/async';
import { Controller, useFormContext } from 'react-hook-form';
import { customAlphabet } from 'nanoid';

import { Input, TextArea } from '@/shared';
import { NewsFormData, ProductFormData } from '@/types';
import { useGetCategories } from '@/hooks';

export const NewsData = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NewsFormData, NewsFormData>();

  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-5 ml-5 flex items-center justify-between ">
        <h5 className="text-lg font-semibold dark:text-white-light">{t('news.news_data')}</h5>
      </div>

      <div className="mt-4 px-4">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="mb-4 w-full lg:w-1/2 ltr:lg:mr-6 rtl:lg:ml-6">
            <div className="flex flex-col items-start">
              <Input
                id="title"
                placeholder={t('news.news_title')}
                error={errors.title}
                label={t('news.news_title')}
                required
                {...register('title')}
              />
            </div>

            <div className="flex flex-col items-start mt-3">
              <Input
                id="subject"
                placeholder={t('news.news_subject')}
                error={errors.subject}
                label={t('news.news_subject')}
                required
                {...register('subject')}
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            {/* Slug */}
            <div className="flex flex-col items-start">
              <TextArea
                id="description"
                placeholder={t('news.description')}
                label={t('news.description')}
                error={errors.description}
                rows={5}
                {...register('description')}
              />
            </div>
            <div className="flex flex-col items-start mt-3">
              <Input id="links" placeholder={t('news.links')} error={errors.link} label={t('news.links')} required {...register('link')} />
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
