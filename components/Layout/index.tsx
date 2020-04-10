import classNames from 'classnames';

import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={classNames(styles.Container, className)}>{children}</div>
  );
};

export default Layout;
