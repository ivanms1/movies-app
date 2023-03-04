import { useState } from 'react';
import { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Navbar from '../components/Navbar';

import './styles.css';

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
  when: 'afterChildren',
};

function MyApp({ Component, router, pageProps }: AppProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <Hydrate state={pageProps.dehydratedState}>
        <AnimatePresence mode='wait'>
          <div className='homepage'>
            <Navbar />
            <motion.div
              transition={spring}
              key={router.pathname}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ x: 0, opacity: 0 }}
              id='page-transition-container'
            >
              <Component key={router.pathname} {...pageProps} />
            </motion.div>
          </div>
        </AnimatePresence>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
