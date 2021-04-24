import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from '../components/Navbar';

import './styles.css';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600,
      cacheTime: 3600,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, router, pageProps }: AppProps) {
  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    when: 'afterChildren',
  };
  return (
    <QueryClientProvider client={client}>
      <AnimatePresence exitBeforeEnter>
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
    </QueryClientProvider>
  );
}

export default MyApp;
