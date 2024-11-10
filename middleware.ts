import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/halaman-utama','/cipta-ulasan'];
const publicRoutes = ['/'];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // 3. Check for the 'token' cookie
    const token = cookies().get('token')?.value;

    // 4. Redirect to '/' with a message if the token is missing on protected routes
    if (isProtectedRoute && !token) {
        const url = new URL('/', req.nextUrl);
        url.searchParams.set('error', 'no-authenticate'); // Add a message or error code
        return NextResponse.redirect(url);
    }

    // 5. If authenticated and on a public route, optionally redirect to a dashboard or another page
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/halaman-utama', req.nextUrl));
    }

    // 6. Allow the request to proceed
    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
