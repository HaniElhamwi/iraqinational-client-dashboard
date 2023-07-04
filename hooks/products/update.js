import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState } from "react";

function useUpdateProduct() {
  const [loading, setLoading] = useState(false);
  const washingtonRef = doc(db, "products", "products");

  const updateProduct = async (data) => {
    setLoading(true);
    await updateDoc(washingtonRef, {
      products: data,
    });
    setLoading(false);
  };

  return {
    updateProduct,
  };
}

export default useUpdateProduct;
