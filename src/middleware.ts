import { NextRequest, NextResponse } from 'next/server';
import { Constants } from './redux';

const excludeUrls = [
  '/',
  '/karoke-events',
  '/password-otp',
  '/login',
  '/sign-up',
  '/sent-email',
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Normalize the protocol in production to handle Heroku-specific header issues
  const url = new URL(request.url);
  const protocol = request.headers.get('x-forwarded-proto');

  if (process.env.NODE_ENV === 'production' && protocol) {
    if (protocol.includes(',')) {
      // Use the first valid protocol from the "x-forwarded-proto" header
      url.protocol = protocol.split(',')[0];
    } else {
      url.protocol = protocol; // Assign directly if there's no comma
    }
  }

  // Exclude specific paths from authentication checks
  if (!excludeUrls.includes(pathname)) {
    const user = request.cookies.get(Constants.TOKEN); // Check for the user token

    if (!user) {
      // Redirect to the sign-in page if the user is not authenticated
      return NextResponse.redirect(new URL('/login', url.href));
    }
  }

  // Proceed to the next middleware or route handler
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
