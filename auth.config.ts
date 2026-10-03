import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            // Protege las rutas administrativas de meetings
            const isProtected = nextUrl.pathname.startsWith('/meetings/new') ||
                nextUrl.pathname.includes('/edit');

            if (isProtected) {
                if (isLoggedIn) return true;
                return false; // Redirige automáticamente a /login
            }

            if (isLoggedIn && nextUrl.pathname === '/login') {
                return Response.redirect(new URL('/meetings', nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;