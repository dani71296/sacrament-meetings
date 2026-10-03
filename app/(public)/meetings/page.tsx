import Link from 'next/link';
import MeetingCard from '@/components/MeetingCard';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Meetings',
    description: 'Browse all upcoming and past sacrament meeting agendas.',
};

interface MeetingsPageProps {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
    const resolvedParams = await searchParams;
    const query = resolvedParams?.query || '';
    const currentPage = Number(resolvedParams?.page) || 1;

    // Consulta directa a la base de datos (con soporte de búsqueda y paginación)
    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-800">
                        Scheduled Meetings ({meetings.length})
                    </h3>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Search placeholder="Search meetings..." />
                    <Link
                        href="/meetings/create"
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 transition-colors shrink-0"
                    >
                        + Create New Meeting
                    </Link>
                </div>
            </div>

            {meetings.length === 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-slate-500">
                    No sacrament meetings found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                    ))}
                </div>
            )}

            <Pagination totalPages={totalPages} />
        </div>
    );
}