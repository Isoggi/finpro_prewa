/** @format */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { users_role } from './interfaces/user.interface';
// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await auth();
  const user = session?.user;
  const { pathname } = request.nextUrl;
  console.log('middleware', user);
  if (user?.id && (pathname === '/masuk' || pathname === '/daftar')) {
    console.log(
      users_role[Number(user?.user_role)],
      users_role[Number(user?.user_role)] === 'tenant',
    );
    if (users_role[Number(user?.user_role)] === 'tenant') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (
    (user?.id && pathname.includes('/dashboard/')) ||
    pathname.endsWith('/dashboard')
  ) {
    if (users_role[Number(user?.user_role)] !== 'tenant') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  if (
    !user &&
    (pathname.includes('/properti/') || pathname.endsWith('/properti'))
  ) {
    return NextResponse.redirect(new URL('/masuk', request.url));
  }
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/masuk', '/daftar', '/e/:path*', '/properti/:path*'],
};
