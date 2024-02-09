import BlankLayout from '@/components/Layouts/BlankLayout';
import React from 'react';

function Login() {
  return <div>Register</div>;
}

Login.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};
export default Login;
