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

    // Convertimos el ID de la URL (string) a número para que coincida con getMeetingById(id: number)
    const numericId = parseInt(id, 10);

    // Si no es un número válido, tomamos la primera reunión por defecto
    const meeting = !isNaN(numericId)
        ? getMeetingById(numericId)
        : getMeetings()[0];

    if (!meeting) {
        notFound();
    }

    return <MeetingDetail meeting={meeting} />;
}