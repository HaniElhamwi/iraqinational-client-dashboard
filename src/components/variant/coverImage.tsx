import { useTranslation } from 'react-i18next';
import ImageUploading from 'react-images-uploading';
import { useFormContext, Controller } from 'react-hook-form';

import { HomeFormData, ProductFormData } from '@/types';

import { ImageView } from './ImageView';
import { CategoryFormData } from '@/types/category-form-data';

const CoverImage = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CategoryFormData, CategoryFormData>();

  const { t } = useTranslation();

  const maxNumber = 1;

  return (
    <div className="custom-file-container max-w-xs" data-upload-id="myFirstImage">
      <div className="label-container">
        <label>{t('product.cover_image')}</label>
      </div>

      <br />
      <br />
      <br />

      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ImageUploading
            value={value}
            onChange={(value) => (value.length ? onChange([{ ...value[0], key: '' }]) : onChange([]))}
            maxNumber={maxNumber}
            multiple
          >
            {({ imageList, onImageUpload, onImageRemove }) => (
              <>
                <div className="upload__image-wrapper">
                  <button
                    type="button"
                    className={`custom-file-container__custom-file__custom-file-control ${errors.image && 'border-red-500'}`}
                    onClick={onImageUpload}
                  >
                    Choose File...
                  </button>
                  {/* {errors.image && (
                    <span className="text-red-500">{t(errors.image?.message || (errors?.image?.[0]?.key?.message as string | ''))}</span>
                  )} */}
                  &nbsp;
                  {imageList.map((image, index) => (
                    <ImageView
                      key={index}
                      imageData={value[index]}
                      onImageRemove={() => onImageRemove(index)}
                      onImageUpload={(key: string) => {
                        image.key = key;
                        onChange(imageList);
                      }}
                      //   removeImageKeyError={() => {
                      //     setError(`printAreas.${index}.key`, { message: '' });
                      //   }}
                    />
                  ))}
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                {imageList.length === 0 ? <img src="/assets/images/file-preview.svg" className="max-w-md w-full m-auto" alt="" /> : ''}
              </>
            )}
          </ImageUploading>
        )}
      />
    </div>
  );
};

export default CoverImage;
