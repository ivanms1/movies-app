import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
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
