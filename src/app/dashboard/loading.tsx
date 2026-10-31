const DashboardLoading = () => (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-12">
        <div className="space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 w-72 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-18 animate-pulse rounded-2xl bg-muted" />
            ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-72 animate-pulse rounded-3xl bg-muted" />
            <div className="h-72 animate-pulse rounded-3xl bg-muted" />
        </div>
    </main>
);

export default DashboardLoading;
