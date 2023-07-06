import { useState } from "react";
import { auth } from "../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

const useResetPassword = () => {
  const [message, setMessage] = useState(null);

  const resetPassword = async (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage({
          status: "success",
          message:
            "we sent an email to your email address, please check your email",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage({
          status: "error",
          message: "invalid email address",
        });
      });
  };

  return {
    resetPassword,
    setMessage,
    message,
  };
};

export default useResetPassword;
