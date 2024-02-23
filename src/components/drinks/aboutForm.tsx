import { AboutFormData } from './AboutFormData';
import { ImageData } from './ImageData';

export const AboutForm = () => {
  return (
    <>
      <div className="flex flex-col gap-2.5 pt-5 xl:flex-row">
        <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
          {/* Product data fields */}

          <AboutFormData />
          {/* Image data fields */}
        </div>

        {/* Right side */}
        {/* <ProductRightSide /> */}
      </div>
    </>
  );
};
