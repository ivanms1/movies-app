import { AppProps } from 'next/app';
import { motion, AnimatePresence } from 'framer-motion';

import './styles.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, router, pageProps }: AppProps) {
  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 260,
    when: 'afterChildren',
  };
  return (
    <AnimatePresence>
      <div className='homepage'>
        <Navbar />
        <motion.div
          transition={spring}
          key={router.pathname}
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          exit={{ scale: 0 }}
          id='page-transition-container'
        >
          <Component key={router.pathname} {...pageProps} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default MyApp;
