import classNames from 'classnames';
import { NextSeo } from 'next-seo';

import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  seo?: {
    title: string;
    description: string;
    openGraph: {
      title: string;
      description: string;
      images: {
        url: string;
        width?: number;
        height?: number;
        alt?: string;
      }[];
    };
  };
}

const DEFAULT_SEO_IMAGE =
  'https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80';

const Layout = ({ children, className, seo }: LayoutProps) => {
  return (
    <div className={classNames(styles.Container, className)}>
      {children}
      <NextSeo
        title={seo?.title ?? 'Movie App'}
        description={seo?.description ?? 'Movie App'}
        openGraph={{
          title: seo?.openGraph?.title ?? 'Movie App',
          description: seo?.openGraph?.description ?? 'Movie App',
          images: [
            {
              url: seo?.openGraph?.images[0].url ?? DEFAULT_SEO_IMAGE,
              width: seo?.openGraph?.images[0].width ?? 1200,
              height: seo?.openGraph?.images[0].height ?? 630,
              alt: seo?.openGraph?.images[0].alt ?? 'Movie App',
            },
            ...(seo?.openGraph?.images ?? []).slice(1),
          ],
        }}
      />
    </div>
  );
};

export default Layout;
