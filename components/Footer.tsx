export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-center text-xs print:hidden">
            <div className="max-w-6xl mx-auto px-4 space-y-2">
                <p>© {year} Sacrament Meeting Planner. All rights reserved.</p>
                <p className="text-slate-500">
                    Designed for Daniel Tudela to organize Sunday worship services.
                </p>
            </div>
        </footer>
    );
}