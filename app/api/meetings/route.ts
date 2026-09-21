import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || undefined;
    const page = Number(searchParams.get('page')) || 1;

    const meetings = await getMeetings(query, page);

    return Response.json(meetings, { status: 200 });
}