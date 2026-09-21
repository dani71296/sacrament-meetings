import MeetingCard from '@/components/MeetingCard';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-800">
                    Scheduled Meetings ({meetings.length})
                </h3>
                <Search placeholder="Search meetings..." />
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