import NavLinks from './NavLinks';

export default function Header() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <header className="bg-slate-700 text-white shadow-md print:hidden">
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Sacrament Meeting Planner
                    </h1>

                    <p className="text-xs text-white">
                        El Refugio Ward • {currentDate}
                    </p>
                </div>

                <NavLinks />
            </div>
        </header>
    );
}