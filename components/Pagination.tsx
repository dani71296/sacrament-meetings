'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handlePageChange = (pageNumber: number) => {
        replace(createPageURL(pageNumber));
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 hover:bg-gray-100"
            >
                Anterior
            </button>

            <span className="text-sm font-medium">
                Página {currentPage} de {totalPages}
            </span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 hover:bg-gray-100"
            >
                Siguiente
            </button>
        </div>
    );
}