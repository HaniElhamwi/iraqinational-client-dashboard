import { useTranslation } from 'react-i18next';
import ImageUploading from 'react-images-uploading';
import { useFormContext, Controller } from 'react-hook-form';

import { ProductFormData } from '@/types';

import { ImageView } from '.';

const CoverImage = () => {
  const {
    control,
    formState: { errors },
    setError,
  } = useFormContext<ProductFormData, ProductFormData>();

  const { t } = useTranslation();

  const maxNumber = 10;

  return (
    <div className="custom-file-container " data-upload-id="myFirstImage">
      <div className="label-container">
        <label>{t('product.cover_image')}</label>
      </div>

      <br />
      <br />
      <br />

      <Controller
        name="images"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <ImageUploading
              value={value}
              onChange={(newImages) => {
                const newValues = [...newImages];
                onChange(newValues);
                return;
              }}
              maxNumber={maxNumber}
              multiple
            >
              {({ imageList, onImageUpload, onImageRemove }) => (
                <>
                  <div className="upload__image-wrapper">
                    <button
                      type="button"
                      className={`custom-file-container__custom-file__custom-file-control ${errors.images && 'border-red-500'}`}
                      onClick={onImageUpload}
                    >
                      Choose File...
                    </button>
                    {/* {errors.image && (
                    <span className="text-red-500">{t(errors.image?.message || (errors?.image?.[0]?.key?.message as string | ''))}</span>
                  )} */}
                    <div className="flex flex-row flex-wrap w-full gap-5 justify-center">
                      &nbsp;
                      {(value || [])?.map((image: any, index: any) => {
                        return (
                          <div className="" key={index}>
                            <ImageView
                              key={index}
                              imageData={{
                                key: image.key,
                                dataURL: value[index]?.dataURL || value[index],
                              }}
                              onImageRemove={() => {
                                const deletedValue = value;
                                deletedValue.splice(index, 1);
                                onChange(deletedValue);
                              }}
                              onImageUpload={(key: string) => {
                                image.key = key;
                                onChange(imageList);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {imageList.length === 0 ? <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto" alt="" /> : ''}
                </>
              )}
            </ImageUploading>
          );
        }}
      />
    </div>
  );
};

export default CoverImage;
