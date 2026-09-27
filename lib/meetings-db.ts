import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL || 'postgres://placeholder:placeholder@localhost/db');
const ITEMS_PER_PAGE = 5;

export async function getMeetings(
    query: string = '',
    currentPage: number = 1
): Promise<SacramentMeeting[]> {
    const searchTerm = `%${query}%`;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
    return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
    query: string = ''
): Promise<number> {
    const searchTerm = `%${query}%`;
    const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
    return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
    id: number
): Promise<SacramentMeeting | null> {
    const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
}

// Mutaciones implementadas para la Semana 04
export async function addMeeting(
    data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
    const rows = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${data.date}, ${data.meetingType}, ${data.presiding}, ${data.conducting}, ${data.announcements || null},
      ${data.openingHymn || null}, ${data.openingPrayer || null}, ${data.wardBusiness || null}, ${data.stakeBusiness || null},
      ${data.sacramentHymn || null}, ${JSON.stringify(data.speakers || [])}, ${data.closingHymn || null}, ${data.closingPrayer || null}
    )
    RETURNING 
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
  `;
    return rows[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
    id: number,
    updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
    const current = await getMeetingById(id);
    if (!current) return null;

    const updatedData = { ...current, ...updates };

    const rows = await sql`
    UPDATE meetings
    SET
      date = ${updatedData.date},
      meeting_type = ${updatedData.meetingType},
      presiding = ${updatedData.presiding},
      conducting = ${updatedData.conducting},
      announcements = ${updatedData.announcements || null},
      opening_hymn = ${updatedData.openingHymn || null},
      opening_prayer = ${updatedData.openingPrayer || null},
      ward_business = ${updatedData.wardBusiness || null},
      stake_business = ${updatedData.stakeBusiness || null},
      sacrament_hymn = ${updatedData.sacramentHymn || null},
      speakers = ${JSON.stringify(updatedData.speakers || [])},
      closing_hymn = ${updatedData.closingHymn || null},
      closing_prayer = ${updatedData.closingPrayer || null}
    WHERE id = ${id}
    RETURNING 
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
  `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
    const result = await sql`
    DELETE FROM meetings WHERE id = ${id} RETURNING id
  `;
    return result.length > 0;
}