import Image from 'next/image';

import { useUploadImage } from '@/hooks';

interface ImageViewProps {
  imageData: {
    file?: File;
    key: string;
    dataURL?: string;
  };

  onImageRemove: () => void;
  removeImageKeyError?: () => void;
  onImageUpload?: (key: string) => void;
}

export const ImageView = (props: ImageViewProps) => {
  const { imageData, onImageRemove, onImageUpload, removeImageKeyError } = props;

  //   const { uploadImage, uploadImageIsLoading } = useUploadImage('product-cover-image');
  //   const { deleteImage, deleteImageIsLoading } = useDeleteImage();

  const handleDelete = async () => {
    try {
      //   if (imageData.key) await deleteImage({ key: imageData.key });
      onImageRemove();
    } catch (error) {}
  };

  return (
    <div>
      <div
        style={{
          width: 300,
          height: 400,
          backgroundColor: 'white',
          display: 'flex',
          borderRadius: 4,
          position: 'relative',
        }}
      >
        <Image src={imageData.dataURL || ''} alt="img" fill style={{ objectFit: 'cover' }} sizes="(max-width: 300px) 100vw, 300px" />

        {/* {(uploadImageIsLoading || deleteImageIsLoading) && ( */}
        {/* <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
          className="flex items-center justify-center"
        >
          <div className="spinner-border text-primary" role="status">
            <span className="animate-spin border-4 border-primary border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto mb-10"></span>
          </div>
        </div> */}
        {/* )} */}

        <button
          type="button"
          onClick={handleDelete}
          // disabled={uploadImageIsLoading || deleteImageIsLoading}
          className="bg-danger flex items-center justify-center"
          style={{
            position: 'absolute',
            right: 2,
            top: 2,
            borderRadius: 20,
            width: 22,
            height: 22,
          }}
        >
          <span className="font-size-20 text-white">x</span>
        </button>
      </div>
    </div>
  );
};
