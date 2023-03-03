import Link from 'next/link';

import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <Link href='/'>Home</Link>
      <Link href='/popular'>Most popular</Link>
      <Link href='/search'>Search</Link>
    </div>
  );
};

export default Navbar;
