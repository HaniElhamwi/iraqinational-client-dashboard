import 'file-upload-with-preview/dist/style.css';

import { useTranslation } from 'react-i18next';
import CoverImage from './coverImage';

// import CoverImage from './CoverImage';

export const ImageData = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-5">
      <div className="mb-5 ml-5 flex items-center justify-between ">
        <h5 className="text-lg font-semibold dark:text-white-light">{t('product.product_images')}</h5>
      </div>

      <div className="m-8">
        {' '}
        <CoverImage />
      </div>
    </div>
  );
};
