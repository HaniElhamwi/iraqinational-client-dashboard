import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { Input, TextArea } from '@/shared';
import { UserRole } from '@/types';

interface ProductFormData {
  role: UserRole;
  username: string;
  verified: boolean;
  isDisabled: boolean;
}

export const UsersData = () => {
  const {
    register,
    control,
    formState: { errors },
  }: any = useFormContext<ProductFormData, ProductFormData>();

  const { t } = useTranslation();

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

                  {errors.categoryId && <div className="text-red-500">choose category</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
