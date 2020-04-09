import Head from 'next/head';

import Layout from '../components/Layout';

const Home = () => (
  <Layout>
    <Head>
      <title>Movies App</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <div className='homepage'>
      <h1>Welcome to the Movie App</h1>
    </div>
  </Layout>
);

export default Home;
