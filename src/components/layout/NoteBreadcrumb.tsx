'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export default function NoteBreadcrumb() {
  const pathname = usePathname();
  const splittedPathname = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {splittedPathname.map((path, index) => {
          if (index === splittedPathname.length - 1) {
            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">{decodeURIComponent(path)}</BreadcrumbPage>
                </BreadcrumbItem>
              </Fragment>
            );
          } else {
            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink className="capitalize hover:underline" asChild>
                    <Link href={'/' + splittedPathname.slice(0, index + 1).join('/')}>
                      {decodeURIComponent(path)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
