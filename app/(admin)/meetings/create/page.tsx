'use client';

import { useActionState } from 'react';
import { createMeeting, State } from '@/lib/actions';
import Link from 'next/link';

const initialState: State = { message: null, errors: {} };

export default function MeetingForm() {
    const [state, dispatch] = useActionState(createMeeting, initialState);

    return (
        <form action={dispatch} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
            <div className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-800">Create Sacrament Meeting</h2>
                <p className="text-sm text-gray-500">Fill in the details to schedule a new meeting program.</p>
            </div>

            {/* 1. Datos Generales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date *</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        aria-describedby="date-error"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div id="date-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.date?.map((err) => (
                            <p className="mt-1 text-sm text-red-500" key={err}>{err}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700">Meeting Type *</label>
                    <select
                        id="meetingType"
                        name="meetingType"
                        defaultValue="regular"
                        aria-describedby="type-error"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="regular">REGULAR MEETING</option>
                        <option value="testimony">TESTIMONY MEETING</option>
                        <option value="stake">STAKE CONFERENCE</option>
                        <option value="general">GENERAL CONFERENCE</option>
                    </select>
                    <div id="type-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.meetingType?.map((err) => (
                            <p className="mt-1 text-sm text-red-500" key={err}>{err}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Preside y Conduce */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="presiding" className="block text-sm font-medium text-gray-700">Presiding *</label>
                    <input
                        id="presiding"
                        name="presiding"
                        type="text"
                        placeholder="e.g. Josue Sanchez"
                        aria-describedby="presiding-error"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                    />
                    <div id="presiding-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.presiding?.map((err) => (
                            <p className="mt-1 text-sm text-red-500" key={err}>{err}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="conducting" className="block text-sm font-medium text-gray-700">Conducting *</label>
                    <input
                        id="conducting"
                        name="conducting"
                        type="text"
                        placeholder="e.g. Brother Erik Alva"
                        aria-describedby="conducting-error"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                    />
                    <div id="conducting-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.conducting?.map((err) => (
                            <p className="mt-1 text-sm text-red-500" key={err}>{err}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Announcements */}
            <div>
                <label htmlFor="announcements" className="block text-sm font-medium text-gray-700">
                    Announcements (one per line)
                </label>
                <textarea
                    id="announcements"
                    name="announcements"
                    rows={3}
                    placeholder="Ward temple night: September 18 at 7:00 PM&#10;Youth activity on Wednesday at 7:00 PM"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                />
            </div>

            {/* 4. Order of Service - Himno y Oración Inicial */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="openingHymn" className="block text-sm font-medium text-gray-700">Opening Hymn *</label>
                    <input
                        id="openingHymn"
                        name="openingHymn"
                        type="text"
                        placeholder="e.g. #2 - The Spirit of God"
                        aria-describedby="openingHymn-error"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                    />
                    <div id="openingHymn-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.openingHymn?.map((err) => (
                            <p className="mt-1 text-sm text-red-500" key={err}>{err}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="openingPrayer" className="block text-sm font-medium text-gray-700">Invocation (Opening Prayer) *</label>
                    <input
                        id="openingPrayer"
                        name="openingPrayer"
                        type="text"
                        placeholder="e.g. Sister Williams"
                        aria-describedby="openingPrayer-error"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                    />
                    <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.openingPrayer?.map((err) => (
                            <p className="mt-1 text-sm text-red-500" key={err}>{err}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Ward & Stake Business */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md border">
                <div className="md:col-span-2">
                    <label htmlFor="wardBusiness" className="block text-sm font-medium text-gray-700">Ward Business</label>
                    <input
                        id="wardBusiness"
                        name="wardBusiness"
                        type="text"
                        placeholder="e.g. Sustaining of new Primary president"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm bg-white"
                    />
                </div>
                <div className="flex items-center mt-6">
                    <input
                        id="stakeBusiness"
                        name="stakeBusiness"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="stakeBusiness" className="ml-2 block text-sm text-gray-900">
                        Stake Business Included
                    </label>
                </div>
            </div>

            {/* 6. Sacrament Hymn */}
            <div>
                <label htmlFor="sacramentHymn" className="block text-sm font-medium text-gray-700">Sacrament Hymn *</label>
                <input
                    id="sacramentHymn"
                    name="sacramentHymn"
                    type="text"
                    placeholder="e.g. #169 - In Remembrance of Thy Suffering"
                    aria-describedby="sacramentHymn-error"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                />
                <div id="sacramentHymn-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.sacramentHymn?.map((err) => (
                        <p className="mt-1 text-sm text-red-500" key={err}>{err}</p>
                    ))}
                </div>
            </div>

            {/* 7. Speakers & Program Items */}
            <div>
                <label htmlFor="speakers" className="block text-sm font-medium text-gray-700">
                    Speakers & Program Items (Format: Name | Topic | Type)
                </label>
                <p className="text-xs text-gray-500 mb-1">
                    Type options: <code>speaker</code> or <code>musical-number</code> (one per line)
                </p>
                <textarea
                    id="speakers"
                    name="speakers"
                    rows={4}
                    placeholder="Sister Brown | Faith in Jesus Christ | speaker&#10;Ward Youth Choir | I Believe in Christ | musical-number&#10;Brother Taylor | The Covenant Path | speaker"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm font-mono"
                />
            </div>

            {/* 8. Closing Hymn & Prayer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="closingHymn" className="block text-sm font-medium text-gray-700">Closing Hymn *</label>
                    <input
                        id="closingHymn"
                        name="closingHymn"
                        type="text"
                        placeholder="e.g. #31 - O God, Our Help in Ages Past"
                        aria-describedby="closingHymn-error"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                    />
                    <div id="closingHymn-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.closingHymn?.map((err) => (
                            <p className="mt-1 text-sm text-red-500" key={err}>{err}</p>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="closingPrayer" className="block text-sm font-medium text-gray-700">Benediction (Closing Prayer) *</label>
                    <input
                        id="closingPrayer"
                        name="closingPrayer"
                        type="text"
                        placeholder="e.g. Brother Davis"
                        aria-describedby="closingPrayer-error"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm"
                    />
                    <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.closingPrayer?.map((err) => (
                            <p className="mt-1 text-sm text-red-500" key={err}>{err}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* General Error Message */}
            {state.message && (
                <div aria-live="polite" aria-atomic="true">
                    <p className="text-sm font-semibold text-red-600">{state.message}</p>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
                <Link
                    href="/meetings"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 transition-colors"
                >
                    Create Meeting
                </button>
            </div>
        </form>
    );
}