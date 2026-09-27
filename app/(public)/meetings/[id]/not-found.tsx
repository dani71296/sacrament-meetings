import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">404 - Meeting Not Found</h2>
            <p className="text-gray-600 max-w-md">
                Could not find the requested sacrament meeting record. It may have been deleted or the link is invalid.
            </p>
            <Link
                href="/meetings"
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-500"
            >
                Return to Meetings List
            </Link>
        </main>
    );
}