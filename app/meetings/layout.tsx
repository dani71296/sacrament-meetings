import React from 'react';

export default function MeetingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4 print:hidden">
                <h2 className="text-xl font-bold text-slate-800">Sacrament Meetings Directory</h2>
                <p className="text-xs text-slate-500">
                    Review, manage, and view agendas for ward and branch sacrament services.
                </p>
            </div>
            {children}
        </div>
    );
}