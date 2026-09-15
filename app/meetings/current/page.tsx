import { redirect } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';

async function fetchMeetings(): Promise<SacramentMeeting[]> {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : 'http://localhost:3000';

    const res = await fetch(`${baseUrl}/api/meetings`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        return [];
    }

    return res.json();
}

export default async function CurrentMeetingPage() {
    const meetings = await fetchMeetings();

    if (meetings.length === 0) {
        redirect('/meetings');
    }

    // Busca una reunión que coincida con la fecha de hoy o selecciona la más reciente (id: 1)
    const today = new Date().toISOString().split('T')[0];
    const currentMeeting = meetings.find((m) => m.date === today) || meetings[0];

    redirect(`/meetings/${currentMeeting.id}`);
}