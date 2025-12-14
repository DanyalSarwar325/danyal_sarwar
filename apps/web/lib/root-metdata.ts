import { Metadata } from 'next';

import { headers } from 'next/headers';

import appConfig from '~/config/app.config';

/**
 * @name generateRootMetadata
 * @description Generates the root metadata for the application
 */
export const generateRootMetadata = async (): Promise<Metadata> => {
  const headersStore = await headers();
  const csrfToken = headersStore.get('x-csrf-token') ?? '';

  return {
    title: 'Tech Blog',
    description: appConfig.description,
    metadataBase: new URL(appConfig.url),
    applicationName: 'Tech Blog',
    other: {
      'csrf-token': csrfToken,
    },
    openGraph: {
      url: appConfig.url,
      siteName: 'Tech Blog',
      title: 'Tech Blog',
      description: appConfig.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Tech Blog',
      description: appConfig.description,
    },
    icons: {
      icon: '/images/favicon/favicon.ico',
      apple: '/images/favicon/apple-touch-icon.png',
    },
  };
};
