import { redirect, notFound } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
    // Obtenemos la lista de reuniones ordenadas por fecha descendente
    const meetings = await getMeetings();

    // Si no hay reuniones, mostramos 404
    if (!meetings || meetings.length === 0) {
        notFound();
    }

    // Redirigimos a la primera reunión (la más reciente)
    redirect(`/meetings/${meetings[0].id}`);
}