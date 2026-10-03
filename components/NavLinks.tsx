'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleSignOut } from '@/lib/actions';

const links = [
    { name: 'Home', href: '/' },
    { name: 'All Meetings', href: '/meetings' },
    { name: 'Current Sunday', href: '/meetings/current' },
];

interface NavLinksProps {
    isAuthenticated?: boolean;
}

export default function NavLinks({ isAuthenticated = false }: NavLinksProps) {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-2">
            {links.map((link) => {
                const isActive =
                    pathname === link.href ||
                    (link.href !== '/' &&
                        pathname.startsWith(link.href) &&
                        link.href !== '/meetings/current');

                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive
                                ? 'bg-amber-500 text-slate-900 font-semibold'
                                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        {link.name}
                    </Link>
                );
            })}

            {/* Botón dinámico según el estado de la sesión */}
            {isAuthenticated ? (
                <form action={handleSignOut}>
                    <button
                        type="submit"
                        className="px-3 py-1.5 rounded-md text-sm font-medium text-red-200 bg-red-900/60 hover:bg-red-800 hover:text-white transition-colors ml-2"
                    >
                        Sign Out
                    </button>
                </form>
            ) : (
                <Link
                    href="/login"
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ml-2 ${pathname === '/login'
                            ? 'bg-amber-500 text-slate-900 font-semibold'
                            : 'bg-blue-600 text-white hover:bg-blue-500'
                        }`}
                >
                    Sign In
                </Link>
            )}
        </nav>
    );
}