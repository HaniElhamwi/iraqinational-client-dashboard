import { useState } from "react";
import { storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function useUploadImage() {
  const [imageUrl, setImageUrl] = useState("");

  const uploadFile = async ({ file }) => {
    const storageRef = ref(storage, `/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    let image = "";
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrl(() => url);
            image = url;
            // @ts-ignore
            resolve(); // Resolve the promise when the download URL is obtained
          });
        }
      );
    });

    return {
      image,
    };
  };

  return {
    uploadFile,
  };
}

export default useUploadImage;
