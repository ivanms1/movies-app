import Head from 'next/head';

import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <Head>
      <title>Movies App</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <h1>Welcome to the Movie App</h1>
  </Layout>
);

export default Home;
