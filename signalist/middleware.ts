import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ['/watchlist'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    if (!isProtected) {
        return NextResponse.next();
    }

    try {
        const sessionCookie = getSessionCookie(request);
        
        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
}

export const config = {
    matcher: [
        '/watchlist/:path*',
    ],
};
