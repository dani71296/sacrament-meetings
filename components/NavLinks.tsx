'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { name: 'Home', href: '/' },
    { name: 'All Meetings', href: '/meetings' },
    { name: 'Current Sunday', href: '/meetings/current' },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-2">
            {links.map((link) => {
                const isActive =
                    pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href) && link.href !== '/meetings/current');

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
        </nav>
    );
}