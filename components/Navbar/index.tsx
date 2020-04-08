import Link from 'next/link';

import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/popular'>
        <a>Most popular</a>
      </Link>
      <Link href='/search'>
        <a>Search</a>
      </Link>
    </div>
  );
};

export default Navbar;
