import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
    meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
    const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const badgeColor =
        meeting.meetingType === 'testimony'
            ? 'bg-purple-100 text-purple-800'
            : meeting.meetingType === 'stake'
                ? 'bg-amber-100 text-amber-800'
                : meeting.meetingType === 'general'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800';

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-500">{formattedDate}</span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${badgeColor}`}>
                        {meeting.meetingType}
                    </span>
                </div>

                <div className="space-y-1 text-sm text-slate-700 mb-4">
                    <p><span className="font-semibold text-slate-900">Presiding:</span> {meeting.presiding}</p>
                    <p><span className="font-semibold text-slate-900">Conducting:</span> {meeting.conducting}</p>
                    <p><span className="font-semibold text-slate-900">Sacrament Hymn:</span> #{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
                </div>
            </div>

            <Link
                href={`/meetings/${meeting.id}`}
                className="inline-block text-center text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline pt-3 border-t border-slate-100"
            >
                View Full Program →
            </Link>
        </div>
    );
}