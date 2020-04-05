import Link from 'next/link';

import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <Link href='/popular'>
        <a>Most popular</a>
      </Link>
      <Link href='/search'>
        <a>Search</a>
      </Link>
      <Link href='/tv'>
        <a>TV</a>
      </Link>
    </div>
  );
};

export default Navbar;
