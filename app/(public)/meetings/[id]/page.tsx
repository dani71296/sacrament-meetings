import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById, getMeetings } from '@/lib/meetings-db';

interface MeetingDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MeetingDetailPage({ params }: MeetingDetailPageProps) {
    const { id } = await params;

    // Convertimos el ID de la URL (string) a número para la consulta
    const numericId = parseInt(id, 10);

    // Si no es un número válido o no existe, manejamos la búsqueda
    const meetings = await getMeetings();
    const meeting = id === 'current'
        ? meetings[0]
        : await getMeetingById(numericId);

    if (!meeting) {
        notFound();
    }

    return <MeetingDetail meeting={meeting} />;
}