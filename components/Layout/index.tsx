import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className={styles.Container}>{children}</div>;
};

export default Layout;
