import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlankLayout from '@/components/Layouts/BlankLayout';
import Link from 'next/link';
import Dropdown from '@/components/Dropdown';
import { IRootState, useAuth } from '@/store';
import { useTranslation } from 'react-i18next';
import IconCaretDown from '@/components/icon/IconCaretDown';
import IconMail from '@/components/icon/IconMail';
import IconLockDots from '@/components/icon/IconLockDots';
import IconInstagram from '@/components/icon/IconInstagram';
import IconFacebookCircle from '@/components/icon/IconFacebookCircle';
import IconTwitter from '@/components/icon/IconTwitter';
import IconGoogle from '@/components/icon/IconGoogle';
import { setPageTitle, toggleLocale, toggleRTL } from '@/store/themeConfigSlice';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { LoginFormData, LoginFormSchema } from '@/types/login-form-data';
import { Input } from '@/shared';
import { useLogin } from '@/hooks';
import { toastBar } from '@/utils/comp/toastbar';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '@/../firebase';

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(setPageTitle('Login'));
  });

  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const setLocale = (flag: string) => {
    setFlag(flag);
    if (flag.toLowerCase() === 'ae') {
      dispatch(toggleRTL('rtl'));
    } else {
      dispatch(toggleRTL('ltr'));
    }
  };
  const [flag, setFlag] = useState('');
  useEffect(() => {
    setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
  }, []);

  const { t, i18n } = useTranslation();
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: valibotResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toastBar({
          message: 'Login Success',
          err: false,
        });
        setLoading(false);
        router.push('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toastBar({
          message: 'Use not Found',
          err: true,
        });
        setLoading(false);
      });
  };

  const onSubmit = (data: LoginFormData) => handleLogin(data);
  return (
    <div>
      <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        <div className="relative flex  max-w-[600px]  w-full   flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:flex-row lg:gap-10 xl:gap-0">
          <div className="relative flex flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 justify-center items-center  w-full">
            <div className="flex w-full  items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
              <img src="/assets/images/logo.png" alt="Logo" className=" h-[60px]" />
              <div className="dropdown ms-auto w-max">
                {flag && (
                  <Dropdown
                    offset={[0, 8]}
                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                    button={
                      <>
                        <div>
                          <img
                            src={`/assets/images/flags/${flag.toUpperCase()}.svg`}
                            alt="image"
                            className="h-5 w-5 rounded-full object-cover"
                          />
                        </div>
                        <div className="text-base font-bold uppercase">{flag}</div>
                        <span className="shrink-0">
                          <IconCaretDown />
                        </span>
                      </>
                    }
                  >
                    <ul className="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                      {themeConfig.languageList.map((item: any) => {
                        return (
                          <li key={item.code}>
                            <button
                              type="button"
                              className={`flex w-full rounded-lg hover:text-primary ${
                                i18n.language === item.code ? 'bg-primary/10 text-primary' : ''
                              }`}
                              onClick={() => {
                                dispatch(toggleLocale(item.code));
                                i18n.changeLanguage(item.code);
                                setLocale(item.code);
                              }}
                            >
                              <img
                                src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                                alt="flag"
                                className="h-5 w-5 rounded-full object-cover"
                              />
                              <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </Dropdown>
                )}
              </div>
            </div>
            <form className="w-full lg:mt-16" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
              </div>
              <div className="space-y-5 dark:text-white">
                <div>
                  <label htmlFor="Email">Email</label>
                  <div className="relative text-white-dark">
                    <Input
                      id="email"
                      placeholder="Enter Email"
                      className="form-input ps-10 placeholder:text-white-dark"
                      error={errors.email}
                      required
                      {...register('email')}
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconMail fill={true} />
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="Password">Password</label>
                  <div className="relative text-white-dark">
                    <Input
                      id="password"
                      placeholder="Enter Password"
                      className="form-input ps-10 placeholder:text-white-dark"
                      {...register('password')}
                      error={errors.password}
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconLockDots fill={true} />
                    </span>
                  </div>
                </div>
                <div>
                  <label className="flex cursor-pointer items-center">
                    <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                    <span className="text-white-dark">Subscribe to weekly newsletter</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                >
                  {loading ? (
                    <span className="animate-spin border-[3px] border-success border-l-transparent rounded-full w-6 h-6 inline-block align-middle" />
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>

              <div className="relative my-7 text-center md:mb-9">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
              </div>
              <div className="mb-10 md:mb-[60px]">
                <ul className="flex justify-center gap-3.5 text-white">
                  <li>
                    <Link
                      href="#"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconInstagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconFacebookCircle />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconTwitter fill={true} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                    >
                      <IconGoogle />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="text-center dark:text-white">
                Don not have an account ?&nbsp;
                <div className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">SIGN UP</div>
              </div>
            </form>
            <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}.Akram All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
Login.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};
export default Login;
