import { AppProps } from 'next/app';
import { motion, AnimatePresence } from 'framer-motion';

import './styles.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, router, pageProps }: AppProps) {
  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    when: 'afterChildren',
  };
  return (
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
  );
}

export default MyApp;
