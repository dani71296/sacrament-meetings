export default function MeetingsLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                            <div className="h-5 bg-slate-200 rounded-full w-1/5"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                            <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                        </div>
                        <div className="h-4 bg-slate-200 rounded w-1/4 pt-3 border-t border-slate-100"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}