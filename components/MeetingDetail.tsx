'use client';

import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
    meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
    const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-10 max-w-3xl mx-auto print:shadow-none print:border-none print:p-0">
            {/* Action Bar / Print Button */}
            <div className="flex justify-between items-center mb-6 print:hidden">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Program Agenda
                </span>
                <button
                    onClick={() => window.print()}
                    className="bg-slate-800 text-white hover:bg-slate-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                    🖨️ Print Program
                </button>
            </div>

            {/* Program Header */}
            <header className="text-center border-b pb-6 mb-6 border-slate-200">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    Sacrament Meeting
                </h2>
                <p className="text-sm text-slate-600 mt-1 font-medium">{formattedDate}</p>
                <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider bg-slate-100 text-slate-800">
                    {meeting.meetingType} meeting
                </span>
            </header>

            {/* Leadership Section */}
            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100 print:bg-transparent print:p-0 print:border-none">
                <div>
                    <span className="text-slate-500 font-medium block text-xs uppercase">Presiding</span>
                    <span className="text-slate-900 font-semibold">{meeting.presiding}</span>
                </div>
                <div>
                    <span className="text-slate-500 font-medium block text-xs uppercase">Conducting</span>
                    <span className="text-slate-900 font-semibold">{meeting.conducting}</span>
                </div>
            </div>

            {/* Announcements */}
            {meeting.announcements && meeting.announcements.length > 0 && (
                <section className="mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Announcements
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 bg-amber-50/50 p-4 rounded-lg border border-amber-100/50 print:bg-transparent print:p-0 print:border-none">
                        {meeting.announcements.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Order of Service */}
            <section className="space-y-4 text-sm text-slate-800">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b pb-1 border-slate-200">
                    Order of Service
                </h3>

                <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-600">Opening Hymn</span>
                    <span className="font-semibold text-right">#{meeting.openingHymn.number} - {meeting.openingHymn.title}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-600">Invocation</span>
                    <span className="font-semibold text-right">{meeting.openingPrayer}</span>
                </div>

                {/* Ward / Stake Business */}
                {(meeting.wardBusiness.length > 0 || meeting.stakeBusiness) && (
                    <div className="py-2 bg-slate-50 px-3 rounded text-xs space-y-1 my-2 print:p-0 print:bg-transparent">
                        <span className="font-bold text-slate-500 uppercase block">Ward & Stake Business</span>
                        {meeting.stakeBusiness && <p className="italic text-slate-600">• Stake Business Presented</p>}
                        {meeting.wardBusiness.map((item, idx) => (
                            <p key={idx} className="text-slate-700">• {item.description}</p>
                        ))}
                    </div>
                )}

                <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-600">Sacrament Hymn</span>
                    <span className="font-semibold text-right">#{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</span>
                </div>

                {/* Administration of the Sacrament */}
                <div className="py-2 text-center text-xs font-semibold tracking-wider text-slate-400 uppercase my-2">
                    Administration of the Sacrament
                </div>

                {/* Speakers / Musical Numbers */}
                {meeting.speakers.length > 0 && (
                    <div className="space-y-2 py-2">
                        <span className="font-bold text-slate-500 uppercase block text-xs">Speakers & Program Items</span>
                        {meeting.speakers.map((item, index) => (
                            <div key={index} className="flex justify-between py-1.5 border-b border-slate-100 pl-2">
                                <div>
                                    <span className="font-semibold text-slate-900 block">{item.name}</span>
                                    {item.topic && <span className="text-xs text-slate-500 italic">{item.topic}</span>}
                                </div>
                                <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 self-start print:hidden">
                                    {item.type}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-600">Closing Hymn</span>
                    <span className="font-semibold text-right">#{meeting.closingHymn.number} - {meeting.closingHymn.title}</span>
                </div>

                <div className="flex justify-between py-1">
                    <span className="font-medium text-slate-600">Closing Prayer</span>
                    <span className="font-semibold text-right">{meeting.closingPrayer}</span>
                </div>
            </section>
        </article>
    );
}