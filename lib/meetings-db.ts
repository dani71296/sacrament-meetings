import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-09-13',
        meetingType: 'regular',
        presiding: 'Josue Sanchez',
        conducting: 'Brother Erik Alva',
        announcements: [
            'Ward temple night: September 18 at 7:00 PM',
            'Youth activity on Wednesday at 7:00 PM',
        ],
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Primary president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
        speakers: [
            { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
            { name: 'Ward Youth Choir', topic: 'I Believe in Christ', type: 'musical-number' },
            { name: 'Brother Taylor', topic: 'The Covenant Path', type: 'speaker' },
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Davis',
    },
    {
        id: 2,
        date: '2026-09-06',
        meetingType: 'testimony',
        presiding: 'Josue Sanchez',
        conducting: 'Erik Alva',
        announcements: ['Fast Sunday meal donation drive in the foyer'],
        openingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
        openingPrayer: 'Brother Garcia',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
        speakers: [],
        closingHymn: { number: 304, title: 'Teach Me to Walk in the Light' },
        closingPrayer: 'Sister Martinez',
    },
    {
        id: 3,
        date: '2026-08-30',
        meetingType: 'regular',
        presiding: 'Josue Sanchez',
        conducting: 'Erik Alva',
        announcements: ['Elders Quorum service project Saturday at 8:00 AM'],
        openingHymn: { number: 85, title: 'How Firm a Foundation' },
        openingPrayer: 'Sister Anderson',
        wardBusiness: [{ description: 'Release of Elders Quorum counselor' }],
        stakeBusiness: true,
        sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
        speakers: [
            { name: 'High Councilor Brother White', topic: 'Ministering with Love', type: 'speaker' },
            { name: 'Sister Johnson', topic: 'Daily Scripture Study', type: 'speaker' },
        ],
        closingHymn: { number: 243, title: 'Let Us All Press On' },
        closingPrayer: 'Brother Thomas',
    },
    {
        id: 4,
        date: '2026-08-23',
        meetingType: 'stake',
        presiding: 'President Nelson (Stake President)',
        conducting: 'Bishop Josue Sanchez',
        announcements: ['Stake Conference schedule attached in the bulletin'],
        openingHymn: { number: 1, title: 'The Morning Breaks' },
        openingPrayer: 'Sister Clark',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 191, title: 'Behold the Great Redeemer Die' },
        speakers: [
            { name: 'President Nelson', topic: 'Strengthening Zion in Our Homes', type: 'speaker' },
        ],
        closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
        closingPrayer: 'Brother Roberts',
    },
    {
        id: 5,
        date: '2026-08-16',
        meetingType: 'general',
        presiding: 'Josue Sanchez',
        conducting: 'Brother Miller',
        announcements: ['Primary Activity Day on Thursday at 4:00 PM'],
        openingHymn: { number: 27, title: 'Praise to the Man' },
        openingPrayer: 'Brother Lee',
        wardBusiness: [{ description: 'Sustaining of new Sunday School teacher' }],
        stakeBusiness: false,
        sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
        speakers: [
            { name: 'Sister Adams', topic: 'The Power of Prayer', type: 'speaker' },
            { name: 'Brother Wilson', topic: 'Service and Discipleship', type: 'speaker' },
        ],
        closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
        closingPrayer: 'Sister Evans',
    },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) {
        return meetings.filter((m) => m.date === date);
    }
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find((m) => m.id === id) ?? null;
}