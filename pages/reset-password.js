import React, { useState } from "react";
import { Stack, Snackbar, Alert } from "@mui/material";
import useResetPassword from "../hooks/useResetPassword";
import Link from "next/link";

const Page = () => {
  const { resetPassword, setMessage, message } = useResetPassword();

  const [userData, setUserData] = useState({
    email: "",
  });
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img className="w-8 h-8 mr-2" src="/ferox-transparent.png" alt="logo" />
        Sial
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Reset your account password
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                onClick={(e) => {
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start"></div>
            </div>
            <Link href="/login" style={{ color: "white" }}>
              Login
            </Link>
            <button
              onClick={() => {
                resetPassword(userData.email);
              }}
              className="w-full text-white bg-[red] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {message && (
          <Snackbar autoHideDuration={2000} open onClose={() => setMessage("")}>
            <Alert severity={message?.status || "error"} sx={{ width: "100%" }}>
              {message?.message || ""}
            </Alert>
          </Snackbar>
        )}
      </Stack>
    </div>
  );
};
export default Page;
