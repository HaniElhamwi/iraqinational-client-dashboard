import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useState } from "react";
import { useRouter } from "next/router";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        router.push("/products");
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return {
    signin,
    loading,
  };
};
export default useSignIn;
