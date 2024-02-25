import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { paths } from '@/paths';
import { BoxIcon } from '@/svg';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';

const Sidebar = () => {
  const router = useRouter();
  const [currentMenu, setCurrentMenu] = useState<string>('');
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [router.pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll('.sidebar ul a.active');
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove('active');
    }
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    selector?.classList.add('active');
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
          semidark ? 'text-white-dark' : ''
        }`}
      >
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <Image className="ml-[5px]  flex-none" src="/assets/images/logo.png" alt="logo" width={130} height={100} />
              <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline"></span>
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto h-5 w-5">
                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  opacity="0.5"
                  d="M16.9998 19L10.9998 12L16.9998 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {/* Start nav bar */}
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`}
                  onClick={() => toggleMenu('dashboard')}
                >
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 group-hover:!text-primary"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                        fill="currentColor"
                      />
                      <path
                        d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t('dashboard')}
                    </span>
                  </div>

                  <div className={currentMenu === 'dashboard' ? 'rotate-90' : 'rtl:rotate-180'}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <Link href={paths.index}>{t('sales')}</Link>
                    </li>
                    <li>
                      <Link href="/analytics">{t('analytics')}</Link>
                    </li>
                    <li>
                      <Link href="/finance">{t('finance')}</Link>
                    </li>
                    <li>
                      <Link href="/crypto">{t('crypto')}</Link>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <svg
                  className="hidden h-5 w-4 flex-none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>{t('e-commerce')}</span>
              </h2>

              <li className="nav-item">
                <ul>
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${currentMenu === 'product' ? 'active' : ''} nav-link group w-full`}
                      onClick={() => toggleMenu('product')}
                    >
                      <div className="flex items-center">
                        <BoxIcon />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('product.product')}
                        </span>
                      </div>

                      <div className={currentMenu === 'product' ? '!rotate-90' : 'rtl:rotate-180'}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'product' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href={paths.products.index}>{t('list')}</Link>
                        </li>
                        <li>
                          <Link href={paths.products.add}>{t('add')}</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>

                <ul>
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${currentMenu === 'home' ? 'active' : ''} nav-link group w-full`}
                      onClick={() => toggleMenu('home')}
                    >
                      <div className="flex items-center">
                        <BoxIcon />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('home.home')}
                        </span>
                      </div>

                      <div className={currentMenu === 'home' ? '!rotate-90' : 'rtl:rotate-180'}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'home' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href={paths.home.index}>{t('list')}</Link>
                        </li>
                        <li>{/*    <Link href={paths.home.add}>{t('add')}</Link> */}</li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>

                <ul>
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${currentMenu === 'drinks' ? 'active' : ''} nav-link group w-full`}
                      onClick={() => toggleMenu('drinks')}
                    >
                      <div className="flex items-center">
                        <BoxIcon />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('drinks.drinks')}
                        </span>
                      </div>

                      <div className={currentMenu === 'home' ? '!rotate-90' : 'rtl:rotate-180'}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'drinks' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href={paths.drinks.main}>{t('Main')}</Link>
                        </li>
                        <li>
                          <Link href={paths.drinks.departments}>{t('departments')}</Link>
                        </li>
                        <li>
                          <Link href={paths.drinks.certifications}>{t('certifications')}</Link>
                        </li>
                        <li>
                          <Link href={paths.drinks.about}>{t('About')}</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>

                {/* transportation */}
                <ul>
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${currentMenu === 'transportation' ? 'active' : ''} nav-link group w-full`}
                      onClick={() => toggleMenu('transportation')}
                    >
                      <div className="flex items-center">
                        <BoxIcon />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('transportation')}
                        </span>
                      </div>

                      <div className={currentMenu === 'transportation' ? '!rotate-90' : 'rtl:rotate-180'}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'transportation' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href={paths.transportation.index}>{t('transportation')}</Link>
                        </li>
                        <li>
                          <Link href={paths.transportation.about}>{t('About')}</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>
                {/*  transportation */}

                {/* Grain */}
                <ul>
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${currentMenu === 'grain' ? 'active' : ''} nav-link group w-full`}
                      onClick={() => toggleMenu('grain')}
                    >
                      <div className="flex items-center">
                        <BoxIcon />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('Grain')}
                        </span>
                      </div>

                      <div className={currentMenu === 'grain' ? '!rotate-90' : 'rtl:rotate-180'}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'grain' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href={paths.grain.index}>{t('Grain')}</Link>
                        </li>
                        <li>
                          <Link href={paths.grain.about}>{t('About')}</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>
                {/*  Grain */}
                <ul>
                  {/*  */}

                  <ul>
                    <li className="menu nav-item">
                      <button
                        type="button"
                        className={`${currentMenu === 'category' ? 'active' : ''} nav-link group w-full`}
                        onClick={() => toggleMenu('category')}
                      >
                        <div className="flex items-center">
                          <BoxIcon />
                          <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                            {t('category.category')}
                          </span>
                        </div>

                        <div className={currentMenu === 'category' ? '!rotate-90' : 'rtl:rotate-180'}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9 5L15 12L9 19"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>

                      <AnimateHeight duration={300} height={currentMenu === 'category' ? 'auto' : 0}>
                        <ul className="sub-menu text-gray-500">
                          <li>
                            <Link href={paths.category.index}>{t('list')}</Link>
                          </li>
                          <li>
                            <Link href={paths.category.add}>{t('add')}</Link>
                          </li>
                        </ul>
                      </AnimateHeight>

                      <AnimateHeight duration={300} height={currentMenu === 'drinks' ? 'auto' : 0}>
                        <ul className="sub-menu text-gray-500">
                          <li>
                            <Link href={paths.category.index}>{t('department')}</Link>
                          </li>
                          <li></li>
                        </ul>
                      </AnimateHeight>
                    </li>
                  </ul>

                  {/*  */}
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`}
                      onClick={() => toggleMenu('users')}
                    >
                      <div className="flex items-center">
                        <BoxIcon />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('users.users')}
                        </span>
                      </div>

                      <div className={currentMenu === 'users' ? '!rotate-90' : 'rtl:rotate-180'}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href={paths.users.index}>{t('list')}</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>
                <ul>
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${currentMenu === 'news' ? 'active' : ''} nav-link group w-full`}
                      onClick={() => toggleMenu('news')}
                    >
                      <div className="flex items-center">
                        <BoxIcon />
                        <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                          {t('news.news')}
                        </span>
                      </div>

                      <div className={currentMenu === 'news' ? '!rotate-90' : 'rtl:rotate-180'}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'news' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href={paths.news.index}>{t('list')}</Link>
                        </li>
                        <li>
                          <Link href={paths.news.add}>{t('add')}</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
