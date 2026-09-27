'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeeting, deleteMeeting } from './meetings-db';
import type { MeetingType, Hymn, SpeakerItem, WardBusinessItem } from './types';

export type State = {
    errors?: {
        date?: string[];
        meetingType?: string[];
        presiding?: string[];
        conducting?: string[];
        announcements?: string[];
        openingHymn?: string[];
        openingPrayer?: string[];
        wardBusiness?: string[];
        stakeBusiness?: string[];
        sacramentHymn?: string[];
        closingHymn?: string[];
        closingPrayer?: string[];
        speakers?: string[];
    };
    message?: string | null;
};

// Auxiliares seguros para parsear los datos de entrada
function parseHymn(val: unknown): Hymn {
    if (!val || typeof val !== 'string') return { number: 0, title: '' };
    try {
        return JSON.parse(val);
    } catch {
        const num = parseInt(val, 10);
        return {
            number: isNaN(num) ? 0 : num,
            title: val.replace(/^\d+\s*[-–]?\s*/, '').trim() || val,
        };
    }
}

function parseSpeakers(val: unknown): SpeakerItem[] {
    if (!val || typeof val !== 'string') return [];
    try {
        return JSON.parse(val);
    } catch {
        return val.split('\n').filter(Boolean).map((s) => ({
            name: s.trim(),
            topic: 'Discurso',
            type: 'speaker',
        }));
    }
}

function parseWardBusiness(val: unknown): WardBusinessItem[] {
    if (!val || typeof val !== 'string') return [];
    try {
        return JSON.parse(val);
    } catch {
        return val.split('\n').filter(Boolean).map((b) => ({ description: b.trim() }));
    }
}

function parseAnnouncements(val: unknown): string[] {
    if (!val || typeof val !== 'string') return [];
    try {
        return JSON.parse(val);
    } catch {
        return val.split('\n').filter(Boolean).map((a) => a.trim());
    }
}

// Esquema Zod totalmente compatible
const MeetingFormSchema = z.object({
    date: z.string().min(1, { message: 'Please select a date.' }),
    meetingType: z.enum(['testimony', 'regular', 'stake', 'general'] as const, {
        message: 'Please select a valid meeting type.',
    }),
    presiding: z.string().min(1, { message: 'Please enter who is presiding.' }),
    conducting: z.string().min(1, { message: 'Please enter who is conducting.' }),
    announcements: z.string().optional(),
    openingHymn: z.string().min(1, { message: 'Please enter an opening hymn.' }),
    openingPrayer: z.string().min(1, { message: 'Please enter opening prayer.' }),
    wardBusiness: z.string().optional(),
    stakeBusiness: z.preprocess((val) => val === 'true' || val === 'on' || val === true, z.boolean()),
    sacramentHymn: z.string().min(1, { message: 'Please enter a sacrament hymn.' }),
    closingHymn: z.string().min(1, { message: 'Please enter a closing hymn.' }),
    closingPrayer: z.string().min(1, { message: 'Please enter closing prayer.' }),
    speakers: z.string().optional(),
});

// 1. Action para Crear Reunión
export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
    const rawData = {
        date: formData.get('date'),
        meetingType: formData.get('meetingType'),
        presiding: formData.get('presiding'),
        conducting: formData.get('conducting'),
        announcements: formData.get('announcements') || '',
        openingHymn: formData.get('openingHymn'),
        openingPrayer: formData.get('openingPrayer'),
        wardBusiness: formData.get('wardBusiness') || '',
        stakeBusiness: formData.get('stakeBusiness'),
        sacramentHymn: formData.get('sacramentHymn'),
        closingHymn: formData.get('closingHymn'),
        closingPrayer: formData.get('closingPrayer'),
        speakers: formData.get('speakers') || '',
    };

    const validatedFields = MeetingFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create meeting.',
        };
    }

    const data = validatedFields.data;

    try {
        await addMeeting({
            date: data.date,
            meetingType: data.meetingType as MeetingType,
            presiding: data.presiding,
            conducting: data.conducting,
            announcements: parseAnnouncements(data.announcements),
            openingHymn: parseHymn(data.openingHymn),
            openingPrayer: data.openingPrayer,
            wardBusiness: parseWardBusiness(data.wardBusiness),
            stakeBusiness: data.stakeBusiness,
            sacramentHymn: parseHymn(data.sacramentHymn),
            closingHymn: parseHymn(data.closingHymn),
            closingPrayer: data.closingPrayer,
            speakers: parseSpeakers(data.speakers),
        });
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to create meeting.' };
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

// 2. Action para Actualizar Reunión
export async function updateMeetingAction(
    id: number,
    prevState: State,
    formData: FormData
): Promise<State> {
    const rawData = {
        date: formData.get('date'),
        meetingType: formData.get('meetingType'),
        presiding: formData.get('presiding'),
        conducting: formData.get('conducting'),
        announcements: formData.get('announcements') || '',
        openingHymn: formData.get('openingHymn'),
        openingPrayer: formData.get('openingPrayer'),
        wardBusiness: formData.get('wardBusiness') || '',
        stakeBusiness: formData.get('stakeBusiness'),
        sacramentHymn: formData.get('sacramentHymn'),
        closingHymn: formData.get('closingHymn'),
        closingPrayer: formData.get('closingPrayer'),
        speakers: formData.get('speakers') || '',
    };

    const validatedFields = MeetingFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to update meeting.',
        };
    }

    const data = validatedFields.data;

    try {
        await updateMeeting(id, {
            date: data.date,
            meetingType: data.meetingType as MeetingType,
            presiding: data.presiding,
            conducting: data.conducting,
            announcements: parseAnnouncements(data.announcements),
            openingHymn: parseHymn(data.openingHymn),
            openingPrayer: data.openingPrayer,
            wardBusiness: parseWardBusiness(data.wardBusiness),
            stakeBusiness: data.stakeBusiness,
            sacramentHymn: parseHymn(data.sacramentHymn),
            closingHymn: parseHymn(data.closingHymn),
            closingPrayer: data.closingPrayer,
            speakers: parseSpeakers(data.speakers),
        });
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to update meeting.' };
    }

    revalidatePath('/meetings');
    redirect('/meetings');
}

// 3. Action para Eliminar Reunión
export async function deleteMeetingAction(id: number) {
    try {
        await deleteMeeting(id);
        revalidatePath('/meetings');
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete meeting.');
    }
}