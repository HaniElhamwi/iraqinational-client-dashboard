import Head from 'next/head';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { ReactElement, ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { appWithI18Next } from 'ni18n';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

import { queryClient } from '@/utils';
import { ni18nConfig } from '@/ni18n.config';

import store, { AuthProvider } from '../store';
import '../styles/tailwind.css';
import DefaultLayout from '../components/Layouts/DefaultLayout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <Provider store={store}>
      <Head>
        <title>Dashboard</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};
export default appWithI18Next(App, ni18nConfig);
