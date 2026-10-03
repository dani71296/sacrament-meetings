import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    // Se ejecuta en todas las rutas excepto archivos estáticos e imágenes
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};