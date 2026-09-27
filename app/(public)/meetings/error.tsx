'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
            <p className="text-gray-600 max-w-md">
                An unexpected error occurred while loading or processing the meeting data.
            </p>
            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => reset()}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-500"
                >
                    Try again
                </button>
                <Link
                    href="/meetings"
                    className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-300"
                >
                    Go back to Meetings
                </Link>
            </div>
        </main>
    );
}