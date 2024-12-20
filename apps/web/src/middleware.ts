/** @format */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const { redirect, next } = NextResponse;
  const session = await auth();
  const user = session?.user;

  console.log('middleware', user);
  if (user?.id && (pathname === '/masuk' || pathname === '/daftar')) {
    if (user?.user_role === 'tenant') {
      return redirect(new URL('/dashboard', request.url));
    }
    return redirect(new URL('/', request.url));
  }

  if (
    (user?.id && pathname.includes('/dashboard/')) ||
    pathname.endsWith('/dashboard')
  ) {
    if (user?.user_role !== 'tenant') {
      return redirect(new URL('/', request.url));
    }
  }

  if (
    !user &&
    (pathname.includes('/pesanan/') || pathname.endsWith('/pesanan'))
  ) {
    return redirect(new URL('/masuk', request.url));
  }

  if (
    !user &&
    (pathname.includes('/periksa/') || pathname.endsWith('/periksa'))
  ) {
    return redirect(new URL('/masuk', request.url));
  }

  return next();
}

export const config = {
  matcher: [
    '/masuk',
    '/daftar',
    '/dashboard/:path*',
    '/pesanan/:path*',
    '/periksa/:path*',
  ],
};
