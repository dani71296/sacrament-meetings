import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

// En Next.js 15, params se maneja como una Promesa en la definición del tipo
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Ajuste de tipo para Next.js 15
) {
    try {
        // 1. Resolvemos la promesa de params y extraemos el ID (como string)
        const { id } = await params;

        // 2. CORRECCIÓN CLAVE: Convertimos el ID de string a número
        const numericId = parseInt(id, 10);

        // 3. Validamos que la conversión haya sido exitosa y sea un número válido
        if (isNaN(numericId) || numericId <= 0) {
            return NextResponse.json(
                { error: 'Invalid meeting ID provided. ID must be a positive number.' },
                { status: 400 } // Bad Request
            );
        }

        // 4. Buscamos la reunión usando el ID numérico
        const meeting = getMeetingById(numericId);

        // 5. Si no se encuentra, respondemos con 404
        if (!meeting) {
            return NextResponse.json(
                { error: 'Sacrament meeting not found.' },
                { status: 404 } // Not Found
            );
        }

        // 6. Si todo está bien, respondemos con los datos de la reunión
        return NextResponse.json(meeting);

    } catch {
        // Manejo de errores genéricos del servidor
        return NextResponse.json(
            { error: 'Internal server error.' },
            { status: 500 }
        );
    }
}