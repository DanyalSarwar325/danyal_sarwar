'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationMenuItem } from '@kit/ui/navigation-menu';
import { cn, isRouteActive } from '@kit/ui/utils';

const getClassName = (path: string, currentPathName: string) => {
  const isActive = isRouteActive(path, currentPathName);

  return cn(
    `inline-flex w-max text-sm font-medium transition-colors duration-300`,
    {
      'text-white hover:text-blue-100': !isActive,
      'text-white font-semibold': isActive,
    },
  );
};

export function SiteNavigationItem({
  path,
  children,
}: React.PropsWithChildren<{
  path: string;
}>) {
  const currentPathName = usePathname();
  const className = getClassName(path, currentPathName);

  return (
    <NavigationMenuItem key={path}>
      <Link className={className} href={path}>
        {children}
      </Link>
    </NavigationMenuItem>
  );
}
