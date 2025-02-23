import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/notes', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
