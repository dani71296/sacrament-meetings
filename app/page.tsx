import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Ward Leadership Tool
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            El Refugio Ward - Arboleda Stake
          </h1>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            A dedicated space to organize our Sunday worship with spirit and order. Easily manage, review, and print worship programs, speakers, hymns, and announcements. Remembering that every good thing comes from God, let us work together to strengthen our ward each week.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/meetings"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-5 py-2.5 rounded-lg shadow-xs transition-colors text-sm"
            >
              Browse All Meetings
            </Link>
            <Link
              href="/meetings/current"
              className="bg-slate-800 hover:bg-slate-900 !text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              View Current Sunday
            </Link>
          </div>
        </div>

        {/* Optimized Image */}
        <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-inner bg-slate-100">
          <Image
            src="/capilla.jpg" 
            alt="Exterior de una capilla de La Iglesia de Jesucristo de los Santos de los Últimos Días" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover" 
            priority
          />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="text-2xl">📋</div>
          <h3 className="font-bold text-slate-900">Agenda Management</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Organize hymns, prayers, ward business, speakers, and special musical numbers effortlessly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="text-2xl">🗓️</div>
          <h3 className="font-bold text-slate-900">Auto-Redirect to Current Sunday</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Quickly navigate to the most recent Sunday agenda with automated date-matching routes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="text-2xl">🖨️</div>
          <h3 className="font-bold text-slate-900">Print Ready Programs</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Clean, print-optimized layouts designed for distribution to ward members and leadership.
          </p>
        </div>
      </section>
    </div>
  );
}
