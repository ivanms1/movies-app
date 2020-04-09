import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

import Layout from '../components/Layout';

import movies from '../assets/movies.svg';

import styles from './index.module.css';

const Home = () => (
  <Layout>
    <Head>
      <title>Movies App</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <div className={styles.Home}>
      <h1 className={styles.Title}>Welcome to the Movie App</h1>
      <div className={styles.Subtitles}>
        <Link href='/popular'>
          <motion.p whileHover={{ scale: 1.2, rotate: 5 }}>
            Discover popular movies
          </motion.p>
        </Link>
        <img className={styles.Image} src={movies} alt='movies' />
        <Link href='/popular'>
          <motion.p whileHover={{ scale: 1.2, rotate: -5 }}>
            Search your favorite movies
          </motion.p>
        </Link>
      </div>
    </div>
  </Layout>
);

export default Home;
