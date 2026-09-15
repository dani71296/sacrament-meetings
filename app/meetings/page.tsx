import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

async function fetchMeetings(): Promise<SacramentMeeting[]> {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/meetings`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch sacrament meetings data.');
    }

    return res.json();
}

export default async function MeetingsPage() {
    const meetings = await fetchMeetings();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">
                    Scheduled Meetings ({meetings.length})
                </h3>
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
        </div>
    );
}